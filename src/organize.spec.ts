import { organize, OrganizedGroup, UNKNOWN_GROUP } from "./organize";

describe("organize", () => {
  it("should organize", () => {
    const input = ["c", "a1", "b1", "a2", "b2"];
    const expected = ["a1", "a2", "b1", "b2", "c"];

    const result = organize(input, { groups: ["^a", "^b"] }).flat;

    expect(result).toStrictEqual(expected);
  });

  it("should manually place not matches", () => {
    const input = ["a", "b", "c", "other"];
    const expected = ["other", "a", "b", "c"];

    const result = organize(input, {
      groups: [UNKNOWN_GROUP, "^a", "^b", "^c"],
    }).flat;

    expect(result).toStrictEqual(expected);
  });

  it("should keep groups", () => {
    const input = ["c", "a1", "b1", "a2", "b2"];
    const expected: OrganizedGroup<string>[] = [
      { query: "^a", values: ["a1", "a2"] },
      { query: "^b", values: ["b1", "b2"] },
      { query: "$UNKNOWN", values: ["c"] },
    ];

    const result = organize(input, { groups: ["^a", "^b"] }).groups;

    expect(result).toEqual(expected);
  });
});
