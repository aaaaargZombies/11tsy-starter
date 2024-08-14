import { Window } from "happy-dom";
import * as fs from "fs";
import { getHashedName } from "asset-hash";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const val = func(...args);
      cache[key] = val;
      return val;
    }
  };
};

const dom = (content) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

// reverse the DOM wrapping above before writing the file
const content = (dom: Document) => dom.body.innerHTML;

const getHash = async (filePath) =>
  await getHashedName(filePath).catch((err) => console.log(err));

export const hashAssets = (eleventyConfig: any, pluginOptions = {}) => {
  const SELECTOR = pluginOptions.selector || "[data-asset-hash]";
  const DIRNAME = pluginOptions.dirname || __dirname;

  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
      // return early if we're not writing to the filesystem as this doesn't cover JSON yet
      if (outputMode !== "fs") return;
      const getHashedName = memoize(getHash);

      /**
        assuming that assets are relative paths referncing the root dir
        eg
           /assets/css/styles.css
        if they are absolute paths this will break
        eg
           https://dome.tld/assets/css/styles.css
        if they are relative paths not referencing the root this will break
        eg
           on page https://dome.tld/posts/post-one.html
           assets/css/styles.css
			 */
      const fullPath = (link) => DIRNAME + "/" + dir.output + link;

      const hashedFileLink = (hashName, noneHashedPath) => {
        const link = noneHashedPath
          .split("/")
          .slice(0, -1)
          .concat(hashName)
          .join("/");
        fs.copyFileSync(fullPath(noneHashedPath), fullPath(link));
        return link;
      };

      const getHashedFileLink = memoize(hashedFileLink);

      const updateElement = async (element, attribute) => {
        const noneHashedPath = element[attribute];
        const name = await getHashedName(fullPath(noneHashedPath));
        if (name) {
          element[attribute] = getHashedFileLink(name, noneHashedPath);
        }
      };

      const pagesWithAssets = results.reduce((acc, resultObj) => {
        if (resultObj.outputPath.includes("html")) {
          const hdom = dom(resultObj.content);
          const assetLinks = hdom.querySelectorAll(SELECTOR);
          return assetLinks.length > 0
            ? [...acc, { ...resultObj, dom: hdom, assetLinks }]
            : acc;
        } else {
          return acc;
        }
      }, []);

      for (let page of pagesWithAssets) {
        for (let el of page.assetLinks) {
          switch (el.tagName) {
            case "LINK":
              await updateElement(el, "href");
              break;

            case "SCRIPT":
              await updateElement(el, "src");
              break;
            default:
              break;
          }
        }

        fs.writeFileSync(DIRNAME + "/" + page.outputPath, content(page.dom));
      }
    },
  );
};
