export const UNKNOWN_GROUP = "$UNKNOWN";

export type GroupQuery = string | RegExp;
export type GroupKey<TPresets extends Presets> =
  | keyof TPresets
  | string
  | typeof UNKNOWN_GROUP;

export type Presets = Record<string, GroupQuery[]>;

export type OrganizedGroup<TValue> = { values: TValue[]; query: GroupQuery };
export type OrganizedResult<TValue> = {
  groups: OrganizedGroup<TValue>[];
  flat: TValue[];
};

export interface BaseOrganizeOptions<TPresets extends Presets> {
  presets?: TPresets;
  groups: GroupKey<TPresets>[];
  sort?: "ASC" | "DESC" | boolean;
}
export interface MapOrganizeOptions<TPresets extends Presets, TValue>
  extends BaseOrganizeOptions<TPresets> {
  map: (value: TValue) => string;
}

export type OrganizeOptions<TPresets extends Presets, TValue> =
  | BaseOrganizeOptions<TPresets>
  | MapOrganizeOptions<TPresets, TValue>;

export function organize<TPresets extends Presets>(
  values: string[],
  options: BaseOrganizeOptions<TPresets>
): OrganizedResult<string>;
export function organize<TPresets extends Presets, TValue>(
  values: TValue[],
  options: MapOrganizeOptions<TPresets, TValue>
): OrganizedResult<TValue>;
export function organize<TValue>(
  values: TValue[],
  options: OrganizeOptions<Presets, TValue>
): OrganizedResult<TValue> {
  const getGroups = (
    query: GroupQuery
  ): {
    regexp?: RegExp;
    unknown: boolean;
    values: TValue[];
    query: GroupQuery;
  }[] => {
    if (query === UNKNOWN_GROUP) {
      return [getUnknownGroup()];
    }

    const preset = typeof query === "string" && options.presets?.[query];
    if (!preset) {
      return [
        {
          regexp: groupQueryToRegExp(query),
          unknown: false,
          values: [],
          query,
        },
      ];
    }

    return preset.flatMap(getGroups);
  };

  const groups = options.groups.flatMap(getGroups);

  let unknownGroup = groups.find((group) => group.unknown);
  if (!unknownGroup) {
    unknownGroup = getUnknownGroup();
    groups.push(unknownGroup);
  }

  values.forEach((value) => {
    let mapped: string;

    if ("map" in options) {
      mapped = options.map(value);
    } else if (typeof value === "string") {
      mapped = value;
    } else {
      throw Error("Neither a map function nor string values were passed!");
    }

    for (let group of groups) {
      if (group.regexp && mapped.match(group.regexp)) {
        group.values.push(value);
        return;
      }
    }

    unknownGroup!.values.push(value);
  });

  return {
    flat: groups.flatMap((group) => group.values),
    groups: groups.map(({ query, values }) => ({ query, values })),
  };
}

function groupQueryToRegExp(query: GroupQuery): RegExp {
  return typeof query === "string" ? new RegExp(query) : query;
}

function getUnknownGroup() {
  return {
    unknown: true,
    values: [],
    query: UNKNOWN_GROUP,
  };
}
