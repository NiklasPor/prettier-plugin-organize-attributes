import { Parser, ParserOptions } from "prettier";
import { parsers as htmlParsers } from "prettier/parser-html";
import { GroupKey, organize, Presets, UNKNOWN_GROUP } from "./organize";
import * as posthtml from "posthtml";
import { type } from "os";

const presets: Presets = {
  ANGULAR: [/^\*/],
};

export interface OrganizeAttributesOptions {
  groups: GroupKey<typeof presets>[];
  shouldSkip?: (node: posthtml.Node | string) => boolean;
}

export function posthtmlOrganizeAttributes(
  options: OrganizeAttributesOptions
): posthtml.Plugin<unknown> {
  return (tree) =>
    tree.walk((node) => {
      if (options.shouldSkip?.(node)) {
        return node;
      }

      if (!node.attrs) {
        return node;
      }

      const attributes: typeof node.attrs = {};
      organize(Object.entries(node.attrs), {
        groups: options.groups,
        map: ([key]) => key,
      }).flat.forEach(([key, value]) => (attributes[key] = value));

      return {
        ...node,
        attrs: attributes,
      };
    });
}
