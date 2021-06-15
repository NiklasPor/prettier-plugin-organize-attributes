import { type } from "os";
import * as posthtml from "posthtml";
import { Parser, ParserOptions } from "prettier";
import { parsers as htmlParsers } from "prettier/parser-html";
import {
  OrganizeAttributesOptions,
  posthtmlOrganizeAttributes,
} from "./posthtml-organize-attributes";

const htmlParser = htmlParsers.html;

export const parsers = {
  html: <Parser>{
    ...htmlParser,
    preprocess: htmlParser.preprocess
      ? (text, options) =>
          organizeAttributesPreproccess(
            htmlParser.preprocess!(text, options),
            options as ParserOptions &
              PrettierPluginOrganizeAttributesParserOptions
          )
      : organizeAttributesPreproccess,
  },
};

export const options: {
  [K in keyof PrettierPluginOrganizeAttributesParserOptions]: any;
} = {
  htmlAttributeGroups: {
    type: "string",
    category: "Global",
    array: true,
    description: "Provide an order to sort HTML attributes.",
  },
};

export type PrettierPluginOrganizeAttributesParserOptions = {
  htmlAttributeGroups: string[];
};

function organizeAttributesPreproccess(
  text: string,
  options: ParserOptions & PrettierPluginOrganizeAttributesParserOptions
): string {
  let isLastNodeComment = false;

  const result = posthtml([
    posthtmlOrganizeAttributes({
      groups: options.htmlAttributeGroups,
      shouldSkip: (node) => {
        if (isLastNodeComment && typeof node === "string") {
          return false;
        }

        let result = isLastNodeComment;
        isLastNodeComment =
          typeof node === "string" && node.includes("prettier-ignore");

        return result;
      },
    }),
  ]).process(text, {
    sync: true,
  }) as unknown as posthtml.Result<unknown>;

  return result.html;
}
