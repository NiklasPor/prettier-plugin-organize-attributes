import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import * as prettier from "prettier";
import * as OrganizeAttributes from "./index";
import { PrettierPluginOrganizeAttributesParserOptions } from "./index";

const testFolder = join(__dirname, "tests");
const tests = readdirSync(testFolder);

tests.forEach((test) =>
  it(test, () => {
    const path = join(testFolder, test);
    const input = readFileSync(join(path, "input.html")).toString();
    const expected = readFileSync(join(path, "expected.html")).toString();
    const { groups, sort } = JSON.parse(
      readFileSync(join(path, "groups.json")).toString()
    );

    const options: Partial<PrettierPluginOrganizeAttributesParserOptions> &
      prettier.Options = {
      parser: "html",
      attributeGroups: groups,
      attributeSort: sort,
      plugins: [OrganizeAttributes],
    };
    const prettify = (code: string) => prettier.format(code, options);

    const format = () => prettify(input);

    const expectedError = expected.match(/Error\("(?<message>.*)"\)/)?.groups
      ?.message;

    if (expectedError) {
      expect(format).toThrow(expectedError);
    } else {
      expect(format()).toEqual(expected);
    }
  })
);
