import { Presets } from "./organize";

const PRESET = {
  // HTML
  $CLASS: /^class$/,
  $ID: /^id$/,
  $NAME: /^name$/,
  $DATA: /^data-/,
  $SRC: /^src$/,
  $FOR: /^for$/,
  $TYPE: /^type$/,
  $HREF: /^href$/,
  $VALUE: /^value$/,
  $TITLE: /^title$/,
  $ALT: /^alt$/,
  $ROLE: /^role$/,
  $ARIA: /^aria-/,

  // Angular
  $ANGULAR_STRUCTURAL_DIRECTIVE: /^\*/,
  $ANGULAR_TWO_WAY_BINDING: /^\[\(/,
  $ANGULAR_ANIMATION: /^\@/,
  $ANGULAR_ANIMATION_INPUT: /^\[@/,
  $ANGULAR_INPUT: /^\[[^(@]/,
  $ANGULAR_OUTPUT: /^\(/,
  $ANGULAR_ELEMENT_REF: /^#/,

  // Vue
  $VUE_ATTRIBUTE: /^v-/,
};

const PRESET_GROUPS = {
  /**
   * Angular
   *
   * https://angular.io/
   */
  $ANGULAR: [
    PRESET.$CLASS,
    PRESET.$ID,
    PRESET.$ANGULAR_ELEMENT_REF,
    PRESET.$ANGULAR_STRUCTURAL_DIRECTIVE,
    PRESET.$ANGULAR_ANIMATION,
    PRESET.$ANGULAR_ANIMATION_INPUT,
    PRESET.$ANGULAR_TWO_WAY_BINDING,
    PRESET.$ANGULAR_INPUT,
    PRESET.$ANGULAR_OUTPUT,
  ],
  /**
   * Code Guide by @mdo
   *
   * https://codeguide.co/#html-attribute-order
   */
  $CODE_GUIDE: [
    PRESET.$CLASS,
    PRESET.$ID,
    PRESET.$NAME,
    PRESET.$DATA,
    PRESET.$SRC,
    PRESET.$FOR,
    PRESET.$TYPE,
    PRESET.$HREF,
    PRESET.$VALUE,
    PRESET.$TITLE,
    PRESET.$ALT,
    PRESET.$ROLE,
    PRESET.$ARIA,
  ],
  $HTML: [PRESET.$CLASS, PRESET.$ID],
  $VUE: [PRESET.$CLASS, PRESET.$ID, PRESET.$VUE_ATTRIBUTE],
};

const presets = {
  ...PRESET,
  ...PRESET_GROUPS,
};

const presetKeys: Record<string, string> = {};
Object.keys(presets).forEach((key) => (presetKeys[key] = key));

export const PRESETS: Presets = presets;
export const PRESET_KEYS = presetKeys as {
  [K in keyof typeof presets]: K;
};
