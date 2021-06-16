import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import * as prettier from "prettier";
import * as OrganizeAttributes from "./index";
import { PrettierPluginOrganizeAttributesParserOptions } from "./index";

const testFolder = join(__dirname, "tests");
const languages = readdirSync(testFolder);

languages.forEach((language) => {
  describe(language, () => {
    const languagePath = join(testFolder, language);
    const tests = readdirSync(languagePath);
    const extension = readFileSync(join(languagePath, "extension")).toString();

    tests
      .filter((file) => file !== "extension")
      .forEach((test) =>
        it(test, () => {
          const path = join(testFolder, language, test);
          const inputPath = join(path, `input.${extension}`);
          const expectedPath = join(path, `expected.${extension}`);

          const input = readFileSync(inputPath).toString();
          const expected = readFileSync(expectedPath).toString();
          const testConfig = JSON.parse(
            readFileSync(join(path, "config.json")).toString()
          );

          const options: Partial<PrettierPluginOrganizeAttributesParserOptions> &
            prettier.Options = {
            filepath: inputPath,
            ...testConfig,
            plugins: [OrganizeAttributes],
          };
          const prettify = (code: string) => prettier.format(code, options);

          const format = () => prettify(input);

          const expectedError = expected.match(/Error\("(?<message>.*)"\)/)
            ?.groups?.message;

          if (expectedError) {
            expect(format).toThrow(expectedError);
          } else {
            expect(format()).toEqual(expected);
          }
        })
      );
  });
});
