<div style="display: flex; align-items: center">
<h3 style="margin-right: 1rem">prettier-plugin-organize-attributes</h3>
<img alt="npm" src="https://img.shields.io/npm/v/prettier-plugin-organize-attributes">
</div>

## Organize your HTML attributes autmatically with Prettier 🧼

```
npm i prettier-plugin-organize-attributes -D
```

- Groups are matched from top to bottom.
- Attributes which are not matched are put into `$DEFAULT`.
- If `$DEFAULT` is not specified they are appended at the end.
- Order inside groups remains the same if `attributeSort` is **not** used.
- Attributes in each group can be ordered `ASC` and `DESC` by specifing `attributeSort`.
- A list of additional presets can be found [here](src/presets.ts).

---

- [Usage](#usage)
  - [Groups](#groups)
  - [Sort](#sort)
- [Presets](#presets)
  - [Angular](#angular)
  - [Angular Custom](#angular-custom)
  - [Code-Guide by @mdo](#code-guide-by-mdo)

## Usage

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
  aria-disabled="true"
  name="myname"
  id="myid"
  class="myclass"
  src="other"
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

### Angular

```json
// .prettierrc
{
  "attributeGroups": ["$ANGULAR"]
}
```

```html
<!-- input -->
<div
  (output)="output"
  [input]="input"
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
  class="style"
  id="id"
  *ngIf="ngIf"
  [(ngModel)]="binding"
  [input]="input"
  (output)="output"
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
  (output)="output"
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
  (output)="output"
  [(ngModel)]="binding"
  [input]="input"
  *ngIf="ngIf"
  class="style"
  id="id"
  other="other"
></div>
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
