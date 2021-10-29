### prettier-plugin-organize-attributes [![npm](https://img.shields.io/npm/v/prettier-plugin-organize-attributes)](https://www.npmjs.com/package/prettier-plugin-organize-attributes)

## Organize your HTML attributes autmatically with Prettier 🧼

```
npm i prettier prettier-plugin-organize-attributes -D
```

- Supports Angular, Vue & HTML with **0** configuration
- Groups are matched from top to bottom.
- Attributes are matched against RegExps or presets.
  - A list of additional presets can be found [here](src/presets.ts).
  - Attributes which are not matched are put into `$DEFAULT`.
  - If `$DEFAULT` is not specified they are appended at the end.
- Attributes in each group can be ordered `ASC` and `DESC` by specifing `attributeSort`.
  - Order inside groups remains the same if `attributeSort` is **not** used.

---

- [Usage](#usage)
  - [Groups](#groups)
  - [Sort](#sort)
- [Presets](#presets)
  - [HTML](#html)
  - [Angular](#angular)
  - [Vue](#vue)
  - [Angular Custom](#angular-custom)
  - [Code-Guide by @mdo](#code-guide-by-mdo)

## Usage

The following files also work out of the box **without** any configuration needed:

- `.html` – [HTML Example](#html)
- `.component.html` – [Angular Example](#angular)
- `.vue` – [Vue Example](#vue)

Read below for writing custom attribute orders and configurations ⤵️

### Groups

```json
// .prettierrc
{
  "attributeGroups": ["^class$", "^(id|name)$", "$DEFAULT", "^aria-"]
}
```

```html
<!-- input -->
<div
  aria-disabled="true"
  name="myname"
  id="myid"
  class="myclass"
  src="other"
></div>
```

```html
<!-- output -->
<div
  class="myclass"
  name="myname"
  id="myid"
  src="other"
  aria-disabled="true"
></div>
```

---

### Sort

```json
// .prettierrc
{
  "attributeGroups": ["$DEFAULT", "^data-"],
  "attributeSort": "ASC"
}
```

```html
<!-- input -->
<div a="a" c="c" b="b" data-c="c" data-a="a" data-b="b"></div>
```

```html
<!-- output -->
<div a="a" b="b" c="c" data-a="a" data-b="b" data-c="c"></div>
```

## Presets

### HTML

```json
// .prettierrc
{}
```

```html
<!-- input.html -->
<div id="id" other="other" class="style"></div>
```

```html
<!-- output.html -->
<div class="style" id="id" other="other"></div>
```

### Angular

```json
// .prettierrc
{}
```

```html
<!-- input.component.html -->
<div
  (output)="output()"
  [input]="input"
  *ngIf="ngIf"
  class="style"
  [(ngModel)]="binding"
  id="id"
  other="other"
  [@inputAnimation]="value"
  @simpleAnimation
></div>
```

```html
<!-- output.component.html -->
<div
  class="style"
  id="id"
  *ngIf="ngIf"
  @simpleAnimation
  [@inputAnimation]="value"
  [(ngModel)]="binding"
  [input]="input"
  (output)="output()"
  other="other"
></div>
```

---

### Angular Custom

```json
// .prettierrc
{
  "attributeGroups": [
    "$ANGULAR_OUTPUT",
    "$ANGULAR_TWO_WAY_BINDING",
    "$ANGULAR_INPUT",
    "$ANGULAR_STRUCTURAL_DIRECTIVE"
  ]
}
```

```html
<!-- input -->
<div
  [input]="input"
  (output)="output()"
  *ngIf="ngIf"
  other="other"
  class="style"
  [(ngModel)]="binding"
  id="id"
></div>
```

```html
<!-- output -->
<div
  (output)="output()"
  [(ngModel)]="binding"
  [input]="input"
  *ngIf="ngIf"
  class="style"
  id="id"
  other="other"
></div>
```

---

### Vue

```json
// .prettierrc
{}
```

```vue
<!-- input.vue -->
<template>
  <div other="other" class="class" v-on="whatever" v-bind="bound" id="id"></div>
</template>
```

```vue
<!-- output.vue -->
<template>
  <div class="class" id="id" v-on="whatever" v-bind="bound" other="other"></div>
</template>
```

---

### [Code-Guide by @mdo](https://codeguide.co/#html-attribute-order)

```json
// .prettierrc
{
  "attributeGroups": ["$CODE_GUIDE"]
}
```

```html
<!-- input -->
<div
  other="other"
  value="value"
  type="type"
  title="title"
  src="src"
  role="role"
  name="name"
  id="id"
  href="href"
  for="for"
  data-test="test"
  class="class"
  aria-test="test"
  alt="alt"
></div>
```

```html
<!-- output -->
<div
  class="class"
  id="id"
  name="name"
  data-test="test"
  src="src"
  for="for"
  type="type"
  href="href"
  value="value"
  title="title"
  alt="alt"
  role="role"
  aria-test="test"
  other="other"
></div>
```
