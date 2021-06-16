import * as posthtml from "posthtml";
import { FastPath, Parser, ParserOptions } from "prettier";
import { parsers as htmlParsers } from "prettier/parser-html";
import { miniorganize, OrganizeOptions, OrganizeOptionsSort } from "./organize";
import { PRESETS, PRESET_KEYS } from "./presets";

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
    description:
      "attributeSort HTML attribute grousp internally. ASC, DESC or NONE.",
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
    transformRootNode(
      parse(text, parsers, options),
      options as ParserOptions & PrettierPluginOrganizeAttributesParserOptions
    );
}

function transformRootNode(
  node: HTMLNode,
  options: ParserOptions & PrettierPluginOrganizeAttributesParserOptions
) {
  const sort: OrganizeOptionsSort =
    options.attributeSort === "NONE" ? false : options.attributeSort;
  const groups = [...options.attributeGroups];

  if (groups.length === 0) {
    switch (options.parser.toString().toLowerCase()) {
      case "angular":
        groups.push(PRESET_KEYS.$ANGULAR);
        break;
      case "vue":
        groups.push(PRESET_KEYS.$VUE);
        break;
      case "html":
      default:
        groups.push(PRESET_KEYS.$HTML);
    }
  }

  transformNode(node, groups, sort);
  return node;
}

function transformNode(
  node: HTMLNode,
  groups: string[],
  sort: OrganizeOptionsSort
): void {
  if (node.attrs) {
    node.attrs = miniorganize(node.attrs, {
      ignoreCase: true,
      presets: PRESETS,
      groups,
      sort,
      map: ({ name }) => name,
    }).flat;
  }

  node.children?.forEach((child) => transformNode(child, groups, sort));
}

export type PrettierPluginOrganizeAttributesParserOptions = {
  attributeGroups: string[];
  attributeSort: "ASC" | "DESC" | "NONE";
};
