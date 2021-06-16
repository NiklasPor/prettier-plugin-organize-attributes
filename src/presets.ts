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
  $ANGULAR_INPUT: /^\[(?!\()/,
  $ANGULAR_OUTPUT: /^\(/,
};

const PRESET_GROUPS: Presets = {
  /**
   * Angular
   *
   * https://angular.io/
   */
  $ANGULAR: [
    PRESET.$CLASS,
    PRESET.$ID,
    PRESET.$ANGULAR_STRUCTURAL_DIRECTIVE,
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
};

export const presets: Presets = {
  ...PRESET,
  ...PRESET_GROUPS,
};
