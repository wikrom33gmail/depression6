# Understanding Every Line of CSS in This Project

*A gentle, step-by-step guide for someone who has never seen CSS before.*

---

## Part 1: The Big Picture — What Is CSS?

Imagine you have a plain white sheet of paper with black text typed on it. That's like an HTML page without any styling — just words and structure.

**CSS (Cascading Style Sheets)** is like having a whole box of colored pens, highlighters, rulers, and sticky notes. It lets you:
- Make some text **bold** or *italic*
- Change colors
- Add spacing between things
- Put things side by side instead of stacked on top of each other
- Create boxes with borders around them

Think of HTML as the **skeleton** (the bones that give structure) and CSS as the **skin, muscles, and clothes** (what makes it look good).

In this project, we have a depression screening quiz. The HTML gives us the questions and answer buttons. The CSS makes it look like a clean, professional app instead of plain text on white paper.

---

## Part 2: How This Project Organizes Its CSS

This project uses **two different ways** to write CSS. Let me explain both with a simple analogy.

### Analogy: Global Rules vs. Personal Rules

Imagine you're in an office building:
- **Global rules** apply to everyone in the whole building (like "wear shoes indoors")
- **Personal rules** apply only to your specific desk area (like "keep my stapler on the left side")

In our project:
- `src/index.css` = **global rules** that affect everything
- All the `.module.css` files = **personal rules** for specific parts of the app

Here's a map of all the CSS files in this project:

```
depression6/
├── src/
│   ├── index.css                    ← GLOBAL styles (affects entire app)
│   ├── App.module.css               ← Personal styles for main app layout
│   └── components/
│       ├── language-switcher.module.css  ← Personal styles for language buttons
│       └── ui/
│           ├── button.module.css    ← Personal styles for all buttons
│           ├── card.module.css      ← Personal styles for cards/boxes
│           ├── label.module.css     ← Personal styles for text labels
│           ├── radio-group.module.css   ← Personal styles for answer circles
│           └── progress.module.css  ← Personal styles for progress bar
```

### What Does "Module" Mean?

A CSS **module** is like a private room. The rules written inside it only apply to that specific part of the app. They don't accidentally affect other parts.

For example, if I write `.button { color: red; }` in `App.module.css`, it won't make buttons in the language switcher turn red — because those are in a different "private room."

---

## Part 3: The Global Styles (index.css)
```
depression6/
└── src/
    └── index.css          ← We are here (global styles)
        ├── App.module.css
        └── components/...
```
Let's start with the global file. This is like setting up the foundation of a house before building any rooms.

### Step 1: The Box-Sizing Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

**What this means:** Every single element on the page (`*` means "everything") should calculate its size in a predictable way.

**Analogy:** Imagine you're buying a suitcase. Some stores tell you the outside dimensions (including the handle and wheels). Others tell you only the inside space where your clothes go. This rule says: "Always measure from the outside, including everything." It makes sizing much easier to understand.

Without this rule, if you set an element to be 100 pixels wide and then add a 5-pixel border, it becomes 110 pixels wide. With `border-box`, it stays exactly 100 pixels wide (the border takes up space inside the 100 pixels).

### Step 2: Setting Up the HTML Element

```css
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

Let's break this down piece by piece:

**`line-height: 1.5;`** — This controls the space between lines of text. A value of 1.5 means there's 50% extra space between each line. It makes text easier to read, like having comfortable breathing room in a paragraph.

**`-webkit-text-size-adjust: 100%;`** — This stops phones from automatically making text bigger when you tilt the phone sideways. The "100%" means "keep it exactly as I set it."

**`font-family:`** — This is like giving the browser a shopping list of fonts to try, in order:
1. Try `system-ui` (whatever font your computer uses for its interface)
2. If that doesn't exist, try `-apple-system` (Apple's system font)
3. Then `BlinkMacSystemFont`, then `'Segoe UI'` (Windows), then `Roboto` (Android)
4. Finally, if none of those work, use any generic `sans-serif` font (one without the little decorative feet on letters)

This way, your app looks good on Macs, Windows PCs, iPhones, and Android phones — using whatever font each device is designed to display clearly.

### Step 3: Resetting the Body Element

```css
body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  color: #1e293b;
}
```

**`margin: 0;`** and **`padding: 0;`** — By default, browsers add a little bit of space around the edges of every page. This removes that extra space so our app can start right at the edge of the screen. Think of it like removing the white border from a printed photograph.

**`background-color: #f8fafc;`** — This sets the background color to a very light gray (almost white). The `#f8fafc` is called a **hex color code**. It's like a recipe for mixing colors using red, green, and blue amounts.

Let me explain hex codes simply:
- Each pair of digits represents one color amount (red, then green, then blue)
- `00` means none of that color
- `ff` means the maximum of that color
- So `#f8fafc` is: lots of red (`f8`), lots of green (`fa`), and almost all blue (`fc`) — which makes a very light, cool-toned gray

**`color: #1e293b;`** — This sets the default text color to a dark slate gray (almost black). Instead of pure black (`#000000`), this is slightly softer on the eyes.

### Step 4: Styling Headings

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}
```

This rule applies to **all** heading levels (from the biggest `h1` to the smallest `h6`).

**`font-weight: 600;`** — This makes headings bold. Font weight is measured on a scale from 100 (very thin) to 900 (very thick). The number 400 is normal, and 700 is "bold." We're using 600, which is between those — semi-bold. It's strong but not overwhelming.

**`line-height: 1.2;`** — Headings have less space between lines than regular text (remember we set 1.5 for normal text?). This makes headings look more compact and authoritative.

### Step 5: Resetting Buttons

```css
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
```

Browsers give buttons their own default appearance (usually a gray box with a 3D effect). We want to design our own buttons, so we strip away the defaults.

**`cursor: pointer;`** — When you hover your mouse over a button, the cursor changes from an arrow to a pointing hand. This tells users "you can click this."

**`border: none;`** and **`background: none;`** — Remove the default border and background color so we can add our own later in the component-specific CSS files.

**`font-family: inherit;`** — Make buttons use the same font as everything else on the page, instead of their own special browser-default font.

### Step 6: Resetting Radio Buttons

```css
input[type="radio"] {
  margin: 0;
}
```

This removes any default spacing around radio buttons (the little circles users click to select answers). We'll add our own custom styling for these later in the `radio-group.module.css` file.

---
## Part 4: The Main App Layout (App.module.css)
```
depression6/
└── src/
    ├── index.css
    └── App.module.css     ← We are here (main app layout)
        └── components/...
```

### Step 1: The Full-Screen Container

```css
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
```

This is the outermost container that wraps everything on the page. Let's understand each property:

**`min-height: 100vh;`** — "vh" stands for "viewport height." One viewport height equals the full height of your browser window. So `100vh` means "at least as tall as the entire screen." This ensures our app always fills the whole vertical space, even if there isn't much content yet.

**`display: flex;`** — This is one of the most important layout tools in modern CSS! Flexbox (short for Flexible Box) lets us arrange items either horizontally or vertically and control how they distribute space. Think of it like a magic shelf that can automatically spread things out evenly.

When you set `display: flex`, two new properties become available:
- `justify-content` — controls horizontal distribution
- `align-items` — controls vertical alignment

**`align-items: center;`** — Vertically center everything inside this container. If the content is shorter than the screen, it sits in the middle instead of at the top.

**`justify-content: center;`** — Horizontally center everything inside this container. The quiz will be centered left-to-right on the page.

Together, `align-items: center` and `justify-content: center` put our quiz exactly in the middle of the screen, like a poster hanging perfectly centered on a wall.

**`padding: 1rem;`** — Add some breathing room around the edges so content doesn't touch the very edge of the screen. "rem" is a unit that scales with the user's font size preference (it stands for "root em"). One rem equals whatever the base font size is, usually 16 pixels.

### Step 2: The Fixed Header

```css
.fixedHeader {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 56rem;
  z-index: 1000;
  background-color: #ffffff;
  border-bottom: 2px solid #e5e7eb;
  padding: 0.5rem 1.5rem 0 1.5rem;
}
```

This creates the header bar that stays at the top of the screen even when you scroll down. Let me explain each part:

**`position: fixed;`** — This takes the element out of normal document flow and pins it to a specific spot on the screen. It won't move when you scroll, like a sticker glued to your monitor.

**`top: 0;`** — Position it at the very top edge of the viewport.

**`left: 50%;`** combined with **`transform: translateX(-50%);`** — This is a clever trick for centering fixed elements! Here's how it works:
1. `left: 50%` moves the left edge of the header to the horizontal middle of the screen
2. But that puts the *center* of our header at the right side, not centered on the page
3. So `translateX(-50%)` slides it back to the left by half its own width
4. The result: perfectly centered horizontally

Think of it like this: you walk halfway across a room (50% of the way), then step back half your body length — now you're standing in the exact center.

**`width: 100%;`** and **`max-width: 56rem;`** — The header should be as wide as possible, but no wider than 56rem (about 896 pixels). On small phones it's full width; on large desktop monitors it stops growing at a reasonable size. This prevents the quiz from becoming too wide and hard to read.

**`z-index: 1000;`** — Elements can overlap each other, like layers of paper stacked up. The z-index controls which layer is on top. Higher numbers are closer to the viewer. By giving our header a z-index of 1000, we ensure it sits above all the quiz content when you scroll.

**`background-color: #ffffff;`** — Pure white background (`#ffffff` = maximum red + green + blue).

**`border-bottom: 2px solid #e5e7eb;`** — Add a thin gray line at the bottom of the header to visually separate it from the content below. The three values mean:
- `2px` — how thick the border is
- `solid` — a continuous line (not dashed or dotted)
- `#e5e7eb` — light gray color

**`padding: 0.5rem 1.5rem 0 1.5rem;`** — This shorthand sets padding on all four sides in this order: top, right, bottom, left. So we have some space at the top and sides, but none at the bottom (the header sits flush against its content).

### Step 3: The Title Row Layout

```css
.titleRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

This arranges the app title on the left and the language switcher on the right.

**`display: flex;`** — Again, we're using flexbox to arrange items in a row.

**`justify-content: space-between;`** — This pushes the first item all the way to the left edge and the last item all the way to the right edge, with any middle items evenly spaced between them. It's like putting one book at the far left of a shelf and another at the far right.

**`align-items: center;`** — Vertically align everything in this row so they're all at the same height (not some higher than others).

### Step 4: The Language Row

```css
.langRow {
  display: flex;
  justify-content: flex-end;
}
```

This container holds the language selection buttons. `justify-content: flex-end` pushes everything to the right side, which works together with the title row's layout to keep the language switcher on the far right of the header.

### Step 5: The Submit Button Row

```css
.submitRow {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
```

This row contains the "Submit" and "Clear" buttons at the bottom of the quiz.

**`gap: 0.5rem;`** — This is a modern CSS property that adds space between flex items. Instead of adding margin to individual buttons, we tell the container "put half a rem of space between each child." It's cleaner and more consistent.

### Step 6: Button Sizing Overrides

```css
.submitButton {
  flex: 4;
  font-size: 1.25rem !important;
  letter-spacing: 0.1em;
}

.clearButton {
  flex: 1;
  font-size: 1.25rem !important;
  letter-spacing: 0.1em;
}
```

These rules make the Submit button much wider than the Clear button.

**`flex: 4;`** vs **`flex: 1;`** — The flex property controls how much space an item takes up relative to its siblings. With `flex: 4`, the submit button gets four times as much horizontal space as the clear button (`flex: 1`). Think of it like dividing a pie into five slices — the submit button gets four slices and the clear button gets one slice.

**`font-size: 1.25rem !important;`** — Make the text larger than default (1.25 times the base size). The `!important` flag is used here to override font sizes set elsewhere in the component library's CSS. It says "this rule is more important than any other conflicting rules."

**`letter-spacing: 0.1em;`** — Add a tiny bit of extra space between each letter. This makes large text look more elegant and easier to read, especially for button labels. The unit "em" scales with the font size itself.

### Step 7: The Fixed Footer

```css
.fixedFooter {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 56rem;
  z-index: 1000;
  background-color: #ffffff;
  border-top: 2px solid #e5e7eb;
  padding: 0.5rem 1.5rem;
  display: flex;
  gap: 0.5rem;
}
```

This is almost identical to the fixed header, but positioned at the bottom of the screen instead of the top. Notice:
- `bottom: 0` instead of `top: 0`
- `border-top` instead of `border-bottom` (the separator line is on top)
- It also uses flexbox with gap to arrange its buttons side by side

The same centering trick (`left: 50%` + `translateX(-50%)`) is used here too.

### Step 8: Progress Bar Container

```css
.progressContainer {
  margin-top: 1rem;
  margin-bottom: 0;
}
```

This adds space above the progress bar (so it doesn't touch the header) and removes any default bottom margin.

Later in the file, there's another rule for this class:

```css
.progressContainer {
  margin-bottom: 2rem;
}
```

CSS rules that appear later override earlier ones when they conflict. So the final effective style has `margin-top: 1rem` and `margin-bottom: 2rem`. This gives the progress bar breathing room on both sides.

### Step 9: The Main Content Container

```css
.container {
  width: 100%;
  max-width: 56rem;
  margin-top: 8rem;
  padding-bottom: 5rem;
}
```

This wraps all the quiz questions.

**`margin-top: 8rem;`** — Push the content down so it doesn't overlap with the fixed header (which is always visible at the top). We need enough space for the header plus some breathing room.

**`padding-bottom: 5rem;`** — Add extra space at the bottom so the last question isn't hidden behind the fixed footer when you scroll to the end.

### Step 10: Question Card Styling

```css
.questionCard {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
```

Each question is wrapped in a "card" — a box-like container that visually groups the question with its answer options.

**`border-bottom: 1px solid #f1f5f9;`** — A very subtle light gray line at the bottom of each card separates it from the next question. It's almost invisible but helps users distinguish where one question ends and another begins.

```css
.questionCard:last-child {
  border-bottom: none;
}
```

The `:last-child` selector targets only the very last question card. We remove its bottom border because there's no next question below it — a separator line at the very end would look odd, like an unfinished sentence.

### Step 11: Highlighted Question State

```css
.questionCard.highlighted {
  outline: 2px solid #fb7185;
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: #fff1f2;
}
```

When a user clicks on a question (perhaps to jump back and change their answer), it gets highlighted. This style makes that happen:

**`outline: 2px solid #fb7185;`** — Draw a pinkish-red outline around the card. An outline is different from a border — it doesn't take up space or push other elements away; it's drawn on top of the element like a highlighter pen circle.

**`border-radius: 0.5rem;`** — Round the corners slightly (half a rem). Sharp square corners can look harsh; rounded corners feel friendlier and more modern.

**`background-color: #fff1f2;`** — A very light pink background reinforces that this question is currently selected or being focused on.

### Step 12: Question Text Typography

```css
.questionText {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04em;
}
```

This makes the question text stand out from regular body text.

**`font-size: 1.25rem;`** — Larger than normal text (25% bigger).
**`font-weight: 600;`** — Semi-bold, like we used for headings.
**`color: #334155;`** — A dark slate color that's slightly softer than pure black.
**`margin-bottom: 0.75rem;`** — Space between the question and its answer options.

### Step 13: Answer Option Labels

```css
.optionLabel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  font-size: 1.375rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  letter-spacing: 0.01em;
}
```

Each answer option (like "Not at all," "Several days," etc.) is styled this way.

**`display: flex;`** and **`align-items: center;`** — The radio button circle and the text should be aligned vertically in the middle of each other, not offset up or down.

**`gap: 0.75rem;`** — Space between the radio circle and the text label.

**`width: 100%;`** — Make the entire row clickable, not just the tiny radio button itself. This is a usability improvement — users can click anywhere on the answer row to select it.

**`font-size: 1.375rem;`** — Even larger than the question text! The answers are the most important thing for users to read and interact with.

**`cursor: pointer;`** — Show the hand cursor when hovering, indicating this is clickable.

**`padding: 0.25rem 0.5rem;`** — A little bit of padding makes each option feel like a button you can press. It also gives more room to click.

```css
.optionLabel:hover {
  background-color: #f8fafc;
}
```

When the user hovers their mouse over an answer option, it gets a very subtle light gray background. This visual feedback tells users "yes, your mouse is over this clickable thing." It's like the button lighting up slightly when you approach it.

### Step 14: Results Display

```css
.resultContainer {
  text-align: center;
  padding: 2rem;
}
```

When the user submits their answers, they see a results screen. This container centers all the result information both horizontally and vertically with generous padding around it.

```css
.scoreDisplay {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
```

The numerical score (like "14") is displayed very large and bold so it's immediately visible. This is the most important piece of information on the results page.

```css
.severityLabel {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
```

The severity label (like "Moderate Depression") is also large and bold, but slightly smaller than the score itself.

### Step 15: Color-Coded Severity Levels

```css
.severityMinimal { color: #16a34a; }
.severityMild { color: #ca8a04; }
.severityModerate { color: #ea580c; }
.severityModeratelySevere { color: #ef4444; }
.severitySevere { color: #b91c1c; }
```

These five classes use colors to communicate severity at a glance, following the universal traffic-light system:

- **Minimal** (`#16a34a`) — Green. Everything is fine!
- **Mild** (`#ca8a04`) — Yellow/Goldenrod. A little caution needed.
- **Moderate** (`#ea580c`) — Orange. Pay attention now.
- **Moderately Severe** (`#ef4444`) — Red. This is serious.
- **Severe** (`#b91c1c`) — Dark red. Very serious, needs immediate attention.

This color progression from green → yellow → orange → red → dark red helps users intuitively understand how severe their score indicates without even reading the text label. It's the same logic used in weather warnings, traffic lights, and dashboard warning indicators.

```css
.resultActions {
  display: flex;
  justify-content: center;
}
```

The buttons on the results page (like "Retake Quiz") are centered horizontally using flexbox with `justify-content: center`.

---

## Part 5: Component Library Styles

Now let's look at the reusable UI components. These are like pre-built Lego pieces that can be used anywhere in the app. Each has its own private CSS module file.
// omp-edit: button-component-diagram

### The Button Component (button.module.css)
```
depression6/
└── src/
    └── components/
        └── ui/
            └── button.module.css  ← We are here (button styles)
```

#### Base Button Style

```css
.button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background-clip: padding-box;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  outline: none;
  user-select: none;
  cursor: pointer;
}
```

Let's go through this carefully because it has many important properties:

**`display: inline-flex;`** — Like `flex`, but the button sits inline with text (like a word in a sentence) rather than taking up a full line. The content inside is still arranged using flexbox rules.

**`flex-shrink: 0;`** — Don't let this button get squished smaller if there's not enough space. It should keep its natural size.

**`align-items: center;`** and **`justify-content: center;`** — Center the text (or icon) both horizontally and vertically inside the button. The label should be perfectly in the middle, not off to one side.

**`border-radius: 0.5rem;`** — Rounded corners for a modern, friendly look.

**`border: 1px solid transparent;`** — A border that's invisible! Why add an invisible border? Because when we show focus or error states later, the border becomes visible (changes color). Having it already there at 1 pixel means the button doesn't jump in size when the border appears.

**`background-clip: padding-box;`** — Make sure the background color doesn't bleed under the border area. It keeps things visually clean.

**`font-size: 0.875rem;`** — Slightly smaller than default text (about 14 pixels). Button text is usually a bit smaller than body text.

**`font-weight: 500;`** — Medium weight, between normal (400) and bold (600). It gives the button label presence without being too heavy.

**`white-space: nowrap;`** — Don't wrap long button text onto multiple lines. If the text is too long, it should overflow or be truncated rather than breaking into two rows. This keeps buttons looking neat.

**`transition: all 0.2s ease-in-out;`** — This creates smooth animations! When any property of the button changes (like its background color on hover), don't snap instantly to the new value. Instead, smoothly transition over 0.2 seconds (one-fifth of a second). "Ease-in-out" means it starts slow, speeds up in the middle, then slows down again — like a car accelerating and then braking gently.

**`outline: none;`** — Remove the default browser outline that appears when you tab to a button with your keyboard. We'll add our own custom focus style instead (see below).

**`user-select: none;`** — Prevent users from accidentally highlighting/selection the button text when they click it quickly. Buttons should feel like physical buttons, not selectable text.

**`cursor: pointer;`** — Show the hand cursor on hover.

#### Focus State (Keyboard Navigation)

```css
.button:focus-visible {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

When a user tabs to a button using their keyboard (instead of clicking with a mouse), we need to show them which button is currently focused. The `:focus-visible` selector triggers only for keyboard navigation, not mouse clicks.

**`border-color: #3b82f6;`** — Change the previously-invisible border to blue so it's visible.
**`box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);`** — Add a glowing blue halo around the button. The four numbers mean: horizontal offset (0), vertical offset (0), blur amount (0 = sharp edge), and spread distance (3 pixels). The color is semi-transparent blue (`rgba` means red-green-blue with alpha/transparency; 0.5 = 50% opaque).

#### Active/Pressed State

```css
.button:active:not([aria-haspopup]) {
  transform: translateY(1px);
}
```

When the user clicks and holds down on a button, it should look pressed in, like a real physical button being pushed. `translateY(1px)` moves it down by 1 pixel, creating that "pressed" illusion. The `:not([aria-haspopup])` part excludes buttons that open dropdown menus — those shouldn't appear to press down because they're opening something else.

#### Disabled State

```css
.button:disabled {
  pointer-events: none;
  opacity: 0.5;
}
```

When a button is disabled (can't be clicked), make it look faded out (`opacity: 0.5` = half transparent) and prevent mouse events from reaching it (`pointer-events: none`). This tells users "this button isn't available right now."

#### Error/Invalid State

```css
.button[aria-invalid] {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}
```

If a button is marked as invalid (using the HTML attribute `aria-invalid`), show it with a red border and red glow, similar to the focus state but in red to indicate an error or problem.

#### SVG Icons Inside Buttons

```css
.button svg {
  pointer-events: none;
  flex-shrink: 0;
}

.button svg:not([class*="size-"]) {
  width: 1rem;
  height: 1rem;
}
```

Buttons often contain icons (little pictures). These rules ensure icons behave well inside buttons: they don't shrink, they don't intercept mouse clicks (the whole button should be clickable), and if no explicit size class is given, default to 1 rem by 1 rem.

#### Button Variants (Different Looks)

The button component supports several visual variants. Each variant is a separate CSS class that you add alongside the base `.button` class.

**Default Variant (Primary Blue):**
```css
.default {
  background-color: #3b82f6;
  color: #ffffff;
}

.default:hover {
  background-color: rgba(59, 130, 246, 0.8);
}
```
Blue background with white text. On hover, it becomes slightly transparent (80% opaque), which makes it look lighter and more interactive. This is the main action button style — used for "Submit" type buttons.

**Outline Variant:**
```css
.outline {
  border-color: #cbd5e1;
  background-color: #ffffff;
  color: #1e293b;
}

.outline:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}
```
White background with a gray border and dark text. On hover, the background turns very light gray. This is used for secondary actions that shouldn't draw as much attention as the primary button.

**Secondary Variant:**
```css
.secondary {
  background-color: #e2e8f0;
  color: #0f172a;
}

.secondary:hover {
  background-color: #cbd5e1;
}
```
Light gray background with dark text. Similar to outline but without the border — just a solid light gray button. Used for less important actions.

**Ghost Variant:**
```css
.ghost {
  background-color: transparent;
  color: #475569;
}

.ghost:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}
```
Completely transparent background — it looks like plain text until you hover over it, then a light gray background appears. Used for very subtle actions that shouldn't be noticed unless the user is looking for them.

**Destructive Variant:**
```css
.destructive {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.destructive:hover {
  background-color: rgba(239, 68, 68, 0.2);
}
```
Red text on a very light red background (10% opacity). On hover, the background becomes slightly more opaque (20%). Used for "danger" actions like deleting something or clearing all answers — the red color warns users this action might be hard to undo.

**Link Variant:**
```css
.link {
  background-color: transparent;
  color: #3b82f6;
  text-decoration: none;
  text-underline-offset: 4px;
}

.link:hover {
  text-decoration: underline;
}
```
Looks like a regular hyperlink — blue text, no underline by default, underlined on hover. Used when you want button behavior but link appearance.

#### Button Sizes

Buttons come in different sizes too! Each size is another CSS class you add.

**Default Size:**
```css
.defaultSize {
  height: 2rem;
  gap: 0.375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
```
Standard button size — 2 rem tall with comfortable horizontal padding.

**Extra Small (XS):**
```css
.xs {
  height: 1.5rem;
  gap: 0.25rem;
  border-radius: min(0.375rem, 10px);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
}
```
Tiny button for cramped spaces like toolbars or mobile interfaces. Smaller height, smaller font, tighter padding.

**Small (SM):**
```css
.sm {
  height: 1.75rem;
  gap: 0.25rem;
  border-radius: min(0.375rem, 12px);
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  font-size: 0.8rem;
}
```
Between default and extra small — a compact but still comfortable size.

**Large (LG):**
```css
.lg {
  height: 2.25rem;
  gap: 0.375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
```
Taller than default for emphasis or easier tapping on touch screens.

**Icon-Only Sizes:**
```css
.icon { width: 2rem; height: 2rem; padding: 0; }
.iconXs { width: 1.5rem; height: 1.5rem; border-radius: min(0.375rem, 10px); padding: 0; }
.iconSm { width: 1.75rem; height: 1.75rem; border-radius: min(0.375rem, 12px); padding: 0; }
.iconLg { width: 2.25rem; height: 2.25rem; padding: 0; }
```
Square buttons that contain only an icon (no text). Perfectly square with no horizontal padding — just enough room for the icon itself.

---

```
depression6/
└── src/
    └── components/
        └── ui/
// omp-edit: card-component-diagram
            └── card.module.css  ← We are here (card styles)
```
### The Card Component (card.module.css)
```
depression6/
└── src/
    └── components/
        └── ui/
            └── card.module.css  ← We are here (card styles)
```

#### CSS Custom Properties (Variables)

```css
:root {
  --card-spacing: 1rem; /* default spacing (4) */
}
```

This introduces **CSS custom properties**, also called CSS variables. They work like variables in programming — you store a value once and reuse it everywhere. The `--` prefix is how you name them. Here, `--card-spacing` stores the default internal spacing amount for cards. If we want to change all card spacing later, we only need to update this one line!

#### Base Card Style

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--card-spacing);
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: #ffffff;
  padding-top: var(--card-spacing);
  padding-bottom: var(--card-spacing);
  font-size: 0.875rem;
  color: #1e293b;
  border: 1px solid rgba(148, 163, 184, 0.1);
}
```

**`display: flex;`** and **`flex-direction: column;`** — Card content stacks vertically (header on top, then body, then footer if present). The `column` direction means children are arranged from top to bottom instead of left to right.

**`gap: var(--card-spacing);`** — Use our custom property for spacing between card sections. This creates consistent breathing room inside the card.

**`overflow: hidden;`** — If any child element tries to extend beyond the card's borders, clip it off (don't let it spill out). This works together with `border-radius` to ensure rounded corners don't get messed up by overflowing content.

**`border-radius: 0.75rem;`** — Noticeably rounded corners, giving the card a soft, modern appearance.

**`background-color: #ffffff;`** — Pure white background so cards stand out against the light gray page background.

**`font-size: 0.875rem;`** and **`color: #1e293b;`** — Slightly smaller, dark text for card content.

**`border: 1px solid rgba(148, 163, 184, 0.1);`** — A very subtle border using a semi-transparent gray color. The `rgba()` function lets us specify transparency (the last value, 0.1 = 10% opaque). This creates a delicate edge that defines the card without being harsh or heavy.

#### Small Card Variant

```css
.card[data-size="sm"] {
  --card-spacing: 0.75rem; /* spacing(3) for small size */
}
```

When a card has the HTML attribute `data-size="sm"`, it overrides our custom property with a smaller value (0.75rem instead of 1rem). This makes the internal spacing tighter for compact cards. It's elegant because we only change one variable and everything adjusts automatically!

#### Smart Footer Handling

```css
.card:has([data-slot="card-footer"]) {
  padding-bottom: 0;
}
```

This uses the modern `:has()` selector, which lets us check if an element contains something. If a card has a footer (identified by `data-slot="card-footer"`), remove the bottom padding from the main card body. Why? Because the footer will provide its own padding — we don't want double spacing between the content and the footer.

#### Image Handling in Cards

```css
.card > img:first-child {
  border-radius: 0.75rem 0.75rem 0 0; /* rounded-t-xl */
}

.card:has(> img:first-child) {
  padding-top: 0;
}

.card > img:last-child {
  border-radius: 0 0 0.75rem 0.75rem; /* rounded-b-xl */
}
```

If a card starts with an image, round only the top corners of that image (matching the card's rounded top) and remove the card's top padding so the image touches the edge. Similarly for images at the bottom — round only the bottom corners. This creates beautiful full-width header or footer images in cards.

#### Card Header Layout

```css
.card-header {
  display: grid;
  auto-rows: min-content;
  align-items: start;
  gap: 0.25rem;
  border-radius: 0.75rem 0.75rem 0 0;
  padding-left: var(--card-spacing);
  padding-right: var(--card-spacing);
}
```

The card header uses **CSS Grid** instead of Flexbox. Grid is another powerful layout system that's great for two-dimensional layouts (rows AND columns). Here it's used to handle complex arrangements like having a title on the left and an action button on the right, with optional description text below.

**`auto-rows: min-content;`** — Each row should be only as tall as its content needs to be (no extra space).
**`align-items: start;`** — Align items to the top of their grid cells.

```css
.card-header:has([data-slot="card-action"]) {
  grid-template-columns: 1fr auto;
}
```

If the header has an action button, create a two-column layout: the first column (`1fr`) takes up all available space (for the title), and the second column (`auto`) is just wide enough for its content (the action button). This pushes the action button to the far right.

#### Card Title and Description

```css
.card-title {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.375;
  font-weight: 500;
}

.card[data-size="sm"] .card-title {
  font-size: 0.875rem;
}

.card-description {
  font-size: 0.875rem;
  color: #64748b;
}
```

The title is medium-weight, slightly larger than body text. In small cards, it shrinks down. The description uses a muted gray color (`#64748b`) to make it less prominent than the title — it's secondary information.

#### Card Footer

```css
.card-footer {
  display: flex;
  align-items: center;
  border-radius: 0 0 0.75rem 0.75rem;
  border-top: 1px solid #e2e8f0;
  background-color: rgba(241, 245, 249, 0.5);
  padding: var(--card-spacing);
}
```

The footer sits at the bottom of the card with a subtle top border separating it from the main content. It has a very light gray background (half-transparent) to visually distinguish it as a different section. The rounded corners match only the bottom of the card.

---
### The Label Component (label.module.css)
```
depression6/
└── src/
    └── components/
        └── ui/
            └── label.module.css  ← We are here (label styles)
```

```css
.label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
  font-weight: 500;
  user-select: none;
}
```

Labels are laid out horizontally with the input on one side and text on the other (`display: flex`). They're vertically centered, have medium weight for readability, and aren't selectable (clicking should toggle the input, not highlight the text).

```css
.label[data-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
```

Disabled labels appear faded out and can't be clicked — same pattern we saw with disabled buttons.

### The Radio Group Component (radio-group.module.css)
```
depression6/
└── src/
    └── components/
        └── ui/
            └── radio-group.module.css  ← We are here (radio button styles)
```

#### Grid Layout for Options

```css
.radioGroup {
  display: grid;
  width: 100%;
  gap: 0.5rem;
}
```

All radio options are stacked vertically in a grid with half-rem spacing between them. Full width ensures each option takes up the entire available horizontal space (making it easier to tap on mobile).

#### Custom Radio Button Appearance

The component replaces the default radio button with two custom elements: an outer circle (`.indicator`) and an inner dot (`.dot`).

```css
.indicator {
  display: flex;
  height: 1.25rem;
  width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #94a3b8;
  background-color: #ffffff;
  transition: background-color 0.2s, border-color 0.2s;
}
```

The indicator is a perfect circle (`border-radius: 9999px` — any large value makes it round) with a gray border and white background. It's 1.25rem in size, which is noticeably larger than default radio buttons for better usability. The `transition` property animates color changes smoothly when the button is selected or deselected.

```css
.dot {
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 9999px;
  background-color: #ffffff;
  opacity: 0;
  transition: opacity 0.2s;
}
```

The dot is a smaller white circle inside the indicator. It starts invisible (`opacity: 0`) and appears when selected.

#### Checked State Styling

```css
.radioItem[data-checked] .indicator {
  background-color: #1e293b;
  border-color: #1e293b;
}

.radioItem[data-checked] .dot {
  opacity: 1;
}
```

When a radio option is checked (selected), the indicator turns dark slate (`#1e293b`) and the white dot becomes visible (`opacity: 1`). This creates the classic "filled circle" look of a selected radio button, but with our custom colors and larger size. The transitions make this change animate smoothly over 0.2 seconds.

#### Screen Reader Accessibility

```css
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

This is a clever accessibility technique. The actual HTML radio input (which screen readers need to understand the form) is made invisible but still present in the page structure. It's positioned off-screen at just 1 pixel wide and tall, clipped so it can't be seen or clicked by sighted users. But assistive technologies like screen readers can still find it and announce it properly. This gives us the best of both worlds: custom visual appearance AND proper accessibility.
---
</parameter>
</function>
</tool_call>
<tool_call>
<function=read>
<parameter=path>
/srv/.live/Desktop/depression6/snail.css-depression6.md:1175-1230
### The Progress Bar Component (progress.module.css)
```
depression6/
└── src/
    └── components/
        └── ui/
            └── progress.module.css  ← We are here (progress bar styles)
```

#### Layout Wrapper

```css
.progress {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

This container holds both the track and any label text. `flex-wrap: wrap` allows items to flow onto multiple lines if there isn't enough horizontal space (useful on small screens).

#### The Track (Background)

```css
.track {
  position: relative;
  display: flex;
  height: 0.25rem;
  width: 100%;
  align-items: center;
  overflow-x: hidden;
  border-radius: 9999px;
  background-color: #e2e8f0;
}
```

The track is the gray background bar that spans the full width. It's very thin (only 0.25rem tall) with fully rounded ends (`border-radius: 9999px`). The light gray color (`#e2e8f0`) provides a subtle background against which the blue progress indicator will stand out. `overflow-x: hidden` ensures the indicator doesn't visually extend past the track's rounded edges.

#### The Indicator (Filled Portion)

```css
.indicator {
  height: 100%;
  background-color: #3b82f6;
  transition: all 0.2s ease-in-out;
}
```

The indicator is the blue portion that grows as the user answers more questions. It fills the full height of the track (`height: 100%`) and uses the same blue color (`#3b82f6`) as our primary buttons for visual consistency throughout the app. The width of this element is controlled by JavaScript — it changes from 0% to 100% as questions are answered. The `transition` property makes the growth smooth and animated rather than jumping instantly between values.

```
depression6/
// omp-edit: language-switcher-component-diagram
└── src/
    └── components/
        └── language-switcher.module.css  ← We are here (language switcher styles)
```
---

### The Language Switcher Component (language-switcher.module.css)
// omp-edit: language-switcher-component-diagram
```
depression6/
└── src/
    └── components/
        └── language-switcher.module.css  ← We are here (language switcher styles)
```

This small component handles the language selection buttons in the header.
```
depression6/
└── src/
    └── components/
        └── language-switcher.module.css  ← We are here (language switcher styles)
```

```css
.container {
  display: flex;
  gap: 0.25rem;
}
```

The language buttons are arranged horizontally with a tiny quarter-rem gap between them — just enough to distinguish separate buttons without wasting space.

```css
.buttonText {
  font-size: 0.875rem;
}
```

The text inside the language buttons uses a slightly smaller font size (14 pixels) to fit nicely in compact header space.

---

## Part 6: Putting It All Together — How Everything Works as One System

Now that we've examined every CSS file individually, let's understand how they work together as one cohesive system.

### The Layering Concept

Think of the styling like layers of paint on a canvas:

1. **Bottom layer:** `index.css` (global resets and base styles)
2. **Middle layer:** Component library modules (`button.module.css`, `card.module.css`, etc.)
3. **Top layer:** `App.module.css` (app-specific overrides and layout)

Each layer builds on the one below it. The global styles set up defaults, the component libraries provide reusable styled pieces, and the app module customizes things for this specific depression screening quiz.

### How CSS Modules Prevent Conflicts

Remember how I said modules are like "private rooms"? Here's why that matters:

If `App.module.css` defines a class called `.button`, it doesn't conflict with `button.module.css`'s `.button` class because they're in different files/modules. When you import them into your JavaScript, the build tool (Vite) automatically renames them to be unique behind the scenes. So both can exist without stepping on each other's toes!

### The Design System at Work

This project uses a consistent design language throughout:

- **Colors:** Blue (`#3b82f6`) for primary actions, red (`#ef4444`) for errors/danger, green (`#16a34a`) for success/minimal severity, with grays for neutral elements
- **Spacing:** Uses rem units consistently (0.25rem, 0.5rem, 1rem, etc.) creating a rhythmic spacing scale
- **Typography:** System fonts for native feel, semi-bold weights (600) for emphasis, larger sizes for important text
- **Rounded corners:** Used everywhere — buttons (0.5rem), cards (0.75rem), radio indicators (9999px = perfect circles)
- **Transitions:** 0.2-second ease-in-out animations on interactive elements create a polished, responsive feel

### Accessibility Considerations Built Into the CSS

Several accessibility features are baked into the styling:

1. **Focus-visible states** — Keyboard users see clear blue outlines when navigating with Tab
2. **High contrast colors** — Dark text on light backgrounds meets WCAG contrast requirements
3. **Large touch targets** — Radio options and buttons have generous padding for easy tapping
4. **Screen reader support** — The `.srOnly` class hides visual elements while keeping them accessible to assistive technology
5. **Color + text for severity** — Depression severity uses both color AND text labels, so colorblind users aren't left out

---

## Part 7: Summary of Key CSS Concepts Learned

Let's review the major concepts we encountered in this project:

1. **Box-sizing reset** — Makes element sizing predictable
2. **Flexbox layout** — `display: flex` with `justify-content` and `align-items` for arranging elements
3. **CSS Grid** — Used in card headers for complex two-dimensional layouts
4. **Fixed positioning** — `position: fixed` for header/footer that stay on screen while scrolling
5. **Centering techniques** — The `left: 50%` + `translateX(-50%)` trick for horizontal centering
6. **Z-index layering** — Controlling which elements appear in front when they overlap
7. **Pseudo-classes** — `:hover`, `:focus-visible`, `:active`, `:disabled`, `:last-child`, `:has()`
8. **CSS custom properties (variables)** — Storing reusable values like spacing amounts
9. **Transitions and animations** — Smooth visual changes over time
10. **Color systems** — Hex codes, RGBA with transparency, semantic color choices
11. **Typography scale** — Using rem units for scalable, accessible text sizing
12. **Component-based styling** — Private CSS modules that prevent style conflicts

---

## Part 8: Where to Go From Here

Now that you understand every line of CSS in this project, here are some ideas for experimenting and learning more:

- **Change colors:** Try different hex codes for button backgrounds or severity labels
- **Adjust spacing:** Modify the `--card-spacing` variable to see how it affects all cards at once
- **Experiment with transitions:** Change the duration from 0.2s to 1s to see slower animations
- **Try different border radii:** Make buttons more square (smaller radius) or pill-shaped (larger radius)
- **Add your own variants:** Create a new button variant class, like `.success` with green colors

The best way to learn CSS is by playing with it — change values, see what happens, and gradually build intuition for how different properties affect the visual result. This project gives you a complete, working example of modern CSS techniques that you can study and modify at your own pace.

Happy styling! 🎨