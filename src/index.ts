import * as posthtml from "posthtml";
import { FastPath, Parser, ParserOptions } from "prettier";
import { parsers as htmlParsers } from "prettier/parser-html";
import { miniorganize, OrganizeOptions, OrganizeOptionsSort } from "./organize";
import { presets } from "./presets";

export const parsers = {
  html: wrapParser(htmlParsers.html),
  vue: wrapParser(htmlParsers.vue),
  angular: wrapParser(htmlParsers.angular),
};

export const options: {
  [K in keyof PrettierPluginOrganizeAttributesParserOptions]: any;
} = {
  attributeGroups: {
    type: "string",
    category: "Global",
    array: true,
    description: "Provide an order to organize HTML attributes into groups.",
    default: [{ value: [] }],
  },
  attributeSort: {
    type: "string",
    category: "Global",
    description: "Sort HTML attribute grousp internally. ASC, DESC or NONE.",
  },
};

interface HTMLNode {
  children?: HTMLNode[];
  attrMap?: { [key: string]: any };
  attrs?: { name: string; value: any }[];
  value?: string;
  type: string;
}

function wrapParser(parser: Parser<any>): Parser<any> {
  return {
    ...parser,
    parse: transformPostParse(parser.parse),
  };
}

function transformPostParse(parse: Parser<any>["parse"]): Parser<any>["parse"] {
  return (text, parsers, options) =>
    transformNode(
      parse(text, parsers, options),
      options as ParserOptions & PrettierPluginOrganizeAttributesParserOptions
    );
}

function transformNode(
  node: HTMLNode,
  options: ParserOptions & PrettierPluginOrganizeAttributesParserOptions
): HTMLNode {
  const sort: OrganizeOptionsSort =
    options.attributeSort === "NONE" ? false : options.attributeSort;
  const groups = options.attributeGroups;

  if (node.attrs) {
    node.attrs = miniorganize(node.attrs, {
      ignoreCase: true,
      presets,
      groups,
      sort,
      map: ({ name }) => name,
    }).flat;
  }

  node.children?.forEach((child) => transformNode(child, options));
  return node;
}

export type PrettierPluginOrganizeAttributesParserOptions = {
  attributeGroups: string[];
  attributeSort: "ASC" | "DESC" | "NONE";
};
