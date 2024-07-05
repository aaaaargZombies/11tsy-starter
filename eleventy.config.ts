export default function (eleventyConfig: any) {
  console.log("this works");
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
