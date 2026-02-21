import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from "contentlayer2/source-files";
import readingTime from "reading-time";
import path from "path";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from "pliny/mdx-plugins/index.js";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

// Use the current working directory as-is
// Avoid path resolution that might cause issues with contentlayer2
const root = process.cwd();

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true },
);

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

export const Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    scholar: { type: "string" },
    layout: { type: "string" },
  },
  computedFields,
}));

export const Publications = defineDocumentType(() => ({
  name: "Publications",
  filePathPattern: "publications/**/*.mdx",
  contentType: "mdx", // MDX files for metadata
  fields: {
    title: { type: "string", required: true },
    authors: { type: "string", required: true },
    conference: { type: "string", required: true },
    conferenceShort: { type: "string", required: true },
    year: { type: "string", required: true },
    date: { type: "date" }, // Optional date field for sorting, defaults to Jan 1 of the year
    publicationType: { type: "string", required: true }, // conference-proceedings, posters-and-extended-abstracts, etc.
    sortOrder: { type: "number" }, // Optional field for custom sorting (lower numbers appear first)
    links: { type: "json" }, // Array of {type: string, url: string}
    draft: { type: "boolean" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    },
    path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath,
    },
    // Compute date from year if not provided
    computedDate: {
      type: "date",
      resolve: (doc) => doc.date || `${doc.year}-01-01`,
    },
  },
}));

export const Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx", // MDX files for metadata
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    href: { type: "string" }, // Optional external link
    imgSrc: { type: "string" }, // Optional image source
    date: { type: "date" }, // Optional date for sorting
    technologies: { type: "list", of: { type: "string" }, default: [] }, // Tech stack
    category: { type: "string" }, // Project category
    draft: { type: "boolean" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    },
    path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}));

export const News = defineDocumentType(() => ({
  name: "News",
  filePathPattern: "news/**/*.mdx",
  contentType: "mdx",
  fields: {
    date: { type: "date", required: true }, // Date of the news
    content: { type: "string", required: true }, // One sentence news content
    draft: { type: "boolean" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    },
    path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Authors, Publications, Projects, News],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});
