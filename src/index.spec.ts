import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { Options } from "prettier";
import * as OrganizeAttributes from "./index";
import { PrettierPluginOrganizeAttributesParserOptions } from "./index";
const prettier = require('prettier')

const testFolder = join(__dirname, "tests");
const languages = readdirSync(testFolder);

describe('format', () => {
  languages.forEach((language) => {
    describe(language, () => {
      const languagePath = join(testFolder, language);
      const tests = readdirSync(languagePath);
      const extension = readFileSync(join(languagePath, "extension")).toString();
  
      tests
        .filter((file) => file !== "extension")
        .forEach((test) =>
          it(test, async () => {
            const path = join(testFolder, language, test);
            const inputPath = join(path, `input.${extension}`);
            const expectedPath = join(path, `expected.${extension}`);
  
            const input = readFileSync(inputPath).toString();
            const expected = readFileSync(expectedPath).toString();
            const testConfig = JSON.parse(
              readFileSync(join(path, "config.json")).toString()
            );
  
            const options: Partial<PrettierPluginOrganizeAttributesParserOptions> &
              Options = {
              filepath: inputPath,
              ...testConfig,
              plugins: [OrganizeAttributes],
            };
  
            const result = prettier.format(input, options);
  
            const expectedError = expected.match(/Error\("(?<message>.*)"\)/)
              ?.groups?.message;
  
            if (expectedError) {
              expect(result).rejects.toEqual(expectedError);
            } else {
              expect(await result).toEqual(expected);
            }
          })
        );
    });
  });
})
