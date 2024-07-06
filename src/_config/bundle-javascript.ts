import { build } from "esbuild";

export type PluginOpts = {
  entryPoint?: string;
  ts?: boolean;
};

const defaults = {
  entryPoint: "./src/js/index.js",
  ts: false,
};

export const bundleJavascript = (
  eleventyConfig: any,
  pluginOptions: PluginOpts = {},
) => {
  const opts = { ...defaults, ...pluginOptions };
  const ft = opts.ts ? "ts" : "js";

  eleventyConfig.addTemplateFormats(ft);

  eleventyConfig.addExtension(ft, {
    outputFileExtension: "js",
    compile: async (_, path: string) => {
      if (path !== opts.entryPoint) {
        return;
      }

      return async () => {
        let { outputFiles } = await build({
          target: "es2020",
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false,
        });

        return outputFiles[0].text;
      };
    },
  });
};
