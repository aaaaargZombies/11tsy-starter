import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import { jsxToString } from "jsx-async-runtime";
import { bundleJavascript } from "./src/_config/bundle-javascript";

export default function (eleventyConfig: any) {
  eleventyConfig.addPlugin(eleventySass);

  // eleventy typescript / TSX support
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  eleventyConfig.addTransform("tsx", async (content: JSX.Element) => {
    if (content && content.tag === "html") {
      const result = await jsxToString(content);
      return `<!doctype html>\n${result}`;
    } else {
      return content;
    }
  });

  // client TS support
  eleventyConfig.addPlugin(bundleJavascript, {
    entryPoint: "./src/js/index.ts",
    ts: true,
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
