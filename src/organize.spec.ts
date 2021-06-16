import { miniorganize, OrganizedGroup, DEFAULT_GROUP } from "./organize";

describe("miniorganize", () => {
  it("should miniorganize", () => {
    const input = ["c", "a1", "b1", "a2", "b2"];
    const expected = ["a1", "a2", "b1", "b2", "c"];

    const result = miniorganize(input, { groups: ["^a", "^b"] }).flat;

    expect(result).toStrictEqual(expected);
  });

  it("should manually place not matches", () => {
    const input = ["a", "b", "c", "other"];
    const expected = ["other", "a", "b", "c"];

    const result = miniorganize(input, {
      groups: [DEFAULT_GROUP, "^a", "^b", "^c"],
    }).flat;

    expect(result).toStrictEqual(expected);
  });

  it("should keep groups", () => {
    const input = ["c", "a1", "b1", "a2", "b2"];
    const expected: OrganizedGroup<string>[] = [
      { query: "^a", values: ["a1", "a2"] },
      { query: "^b", values: ["b1", "b2"] },
      { query: DEFAULT_GROUP, values: ["c"] },
    ];

    const result = miniorganize(input, { groups: ["^a", "^b"] }).groups;

    expect(result).toEqual(expected);
  });

  it("should sort groups ASC internally", () => {
    const input = ["ab", "aa", "ac", "bc", "bb", "ba"];
    const expected = ["aa", "ab", "ac", "ba", "bb", "bc"];

    const result = miniorganize(input, {
      groups: ["^a", "^b"],
      sort: true,
    }).flat;

    expect(result).toEqual(expected);
  });

  it("should sort groups DESC internally", () => {
    const input = ["ab", "aa", "ac", "bc", "bb", "ba"];
    const expected = ["ac", "ab", "aa", "bc", "bb", "ba"];

    const result = miniorganize(input, {
      groups: ["^a", "^b"],
      sort: "DESC",
    }).flat;

    expect(result).toEqual(expected);
  });

  it("should NOT sort groups internally", () => {
    const input = ["ab", "aa", "ac", "bc", "bb", "ba"];
    const expected = ["ab", "aa", "ac", "bc", "bb", "ba"];

    const result = miniorganize(input, {
      groups: ["^a", "^b"],
      sort: false,
    }).flat;

    expect(result).toEqual(expected);
  });
});
