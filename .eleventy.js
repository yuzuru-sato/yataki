import { HtmlBasePlugin } from "@11ty/eleventy";

const pathPrefix = "/" + (process.env.PATH_PREFIX || "").replace(/^\/+|\/+$/g, "");

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("byCategory", (arr, cat) => arr.filter((p) => p.data.categorySlug === cat));

  eleventyConfig.addFilter("dateja", (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  });

  eleventyConfig.addCollection("camplog", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date);
  });

  return {
    pathPrefix: pathPrefix === "/" ? "/" : pathPrefix + "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
