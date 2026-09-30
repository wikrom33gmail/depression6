# The Complete Guide to Our App's Styling: A Snail-Paced Journey

Welcome, dear friend! Today we're going on a very gentle journey through all the styling of our PHQ-9 depression screening app. We'll go so slowly that even if you've never seen CSS before in your life, you'll understand every single piece by the end.

Think of this like building a house: first we lay the foundation (global styles), then we build the rooms (component layouts), and finally we decorate each room with furniture (individual UI elements). Let's begin!

---

## Step 1: The Big Picture — What Are We Styling?

Before we write any code, let's understand what our app looks like. It has several parts:

```
┌───────────────────────────────────────────────┐
│                  Fixed Header                 │
│   PHQ-9 Depression Screener    [EN | ES]      │
├───────────────────────────────────────────────┤
│                                               │
│         Progress Bar (0% ─────────► 100%)     │
│                                               │
├───────────────────────────────────────────────┤
│   Question Card #1                            │
│   "Over the last two weeks, how often have    │
│    you been bothered by little interest..."   │
│   ○ Not at all                                │
│   ○ Several days                              │
│   ○ More than half the days                   │
│   ○ Nearly every day                          │
├───────────────────────────────────────────────┤
│   Question Card #2                            │
│   (same pattern)                              │
├───────────────────────────────────────────────┤
│              ... 9 questions total ...        │
├───────────────────────────────────────────────┤
│                  Fixed Footer                 │
│   [ Submit ]          [ Clear ]               │
└───────────────────────────────────────────────┘
```

To make this look nice, we need **seven different CSS files**. Let me show you where each one lives:
src/
├── index.css                    ← Global foundation (Step 2)
├── App.module.css               ← Main layout & question cards (Step 3)
└── components/
    ├── language-switcher.module.css  ← Language buttons (Step 4)
    └── ui/
        ├── button.module.css    ← Submit/Clear buttons (Step 5)
        ├── card.module.css      ← The white container box (Step 6)
        ├── progress.module.css  ← The completion bar (Step 7)
        ├── radio-group.module.css ← Answer selection circles (Step 8)
        └── label.module.css     ← Text next to radio buttons (Step 9)

---

## Step 2: The Foundation — Global Styles (`index.css`)

**Where we are:** This is the very first layer. It sets rules that apply to EVERYTHING on the page. Think of it like painting the walls and installing the floor before you put any furniture in.

Let's look at each rule, one at a time:

### Rule 1: The Box-Sizing Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

**What this means:** Every single element on the page (`*` means "all elements") will calculate its size including its padding and border. 

**Why we need it:** Without this rule, if you set a button to be 100 pixels wide and add 10 pixels of padding on each side, the actual width becomes 120 pixels! That's confusing. With `border-box`, the total stays at 100 pixels — the padding eats into that space instead of adding to it.

**Analogy:** Imagine a pizza box labeled "12 inch." You expect the entire box to be 12 inches, not 12 inches plus extra for the walls. That's `border-box`.

### Rule 2: The HTML Base Styles

```css
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

Let's break this into three separate ideas:

**Idea A — `line-height: 1.5`:** This makes text lines spaced out comfortably. Instead of lines touching each other (which is hard to read), there's breathing room between them. Think of it like the space between rows in a notebook.

**Idea B — `-webkit-text-size-adjust: 100%`:** This stops phones from automatically making text bigger when you tilt the phone sideways. We want our app to look consistent no matter how someone holds their device.

**Idea C — `font-family`:** This is a list of fonts, in order of preference. The browser tries each one until it finds one installed on your computer:
- First try: `system-ui` (whatever font your operating system uses for buttons and menus)
- If not available: `-apple-system` (Apple's default font)
- Then: `BlinkMacSystemFont`, `'Segoe UI'` (Windows), `Roboto` (Android)
- Last resort: any generic `sans-serif` font

This ensures the app always looks native to whatever device you're using.

### Rule 3: The Body Styles

```css
body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  color: #1e293b;
}
```

**`margin: 0`:** Removes the default white space around the entire page. We want our app to touch all edges of the screen.

**`padding: 0`:** Removes any internal spacing inside the body element. (Margin is outside, padding is inside.)

**`background-color: #f8fafc`:** Sets a very light gray-blue background for the whole page. This isn't pure white — it's slightly softer on the eyes. The `#f8fafc` is a color code called "hexadecimal." Each pair of characters represents red, green, and blue values.

**`color: #1e293b`:** Sets the default text color to a dark slate gray (almost black). This applies to all text unless we override it elsewhere.

### Rule 4: Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}
```

This rule applies to all heading tags (from big `h1` to small `h6`). 

**`font-weight: 600`:** Makes headings bold. The scale goes from 100 (thinnest) to 900 (boldest). 600 is "semi-bold" — noticeable but not overwhelming.

**`line-height: 1.2`:** Headings have tighter line spacing than body text because they're usually only one or two lines long. We don't need as much breathing room.

### Rule 5: Button Reset

```css
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
```

Browsers give buttons ugly default styles (gray backgrounds, thick borders). We want to start fresh and design our own buttons. This rule removes all the defaults:

- **`cursor: pointer`:** When you hover over a button, your mouse cursor changes to a hand icon, signaling "click me!"
- **`border: none`:** Removes the default border around buttons.
- **`background: none`:** Makes the background transparent (we'll add our own colors later).
- **`font-family: inherit`:** Buttons should use the same font as everything else on the page, not some special button font.

### Rule 6: Radio Button Reset

```css
input[type="radio"] {
  margin: 0;
}
```

Radio buttons (the circles you click to select an answer) have default spacing around them. We remove that so we can control the layout ourselves with our custom radio group styles later.

---

## Step 3: The Main Layout — `App.module.css`

**Where we are:** Now that we've set up the foundation, let's build the main structure of our app. This file controls how everything is positioned on the screen.

### Understanding CSS Modules

Before we dive in, you need to know what a "CSS Module" is. When we write:

```jsx
import styles from "./App.module.css";
<div className={styles.app}>Hello!</div>
```

The browser turns `app` into something unique like `app_x7k2m`. This prevents style conflicts — if two components both have a class called `.button`, they won't accidentally share styles. Each module is isolated, like separate rooms in a hotel.

### The App Container

```css
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
```

This is the outermost wrapper of our entire app. Let's understand each property:

**`min-height: 100vh`:** The app will be at least as tall as your entire screen (`vh` = viewport height). Even if there's not much content, it fills the screen.

**`display: flex`:** This is a powerful layout tool called "Flexbox." It lets us arrange items in a row or column and control how they're spaced. Think of it like a magic shelf that can push things around automatically.

**`align-items: center`:** Vertically centers everything inside the app container. If our content is short, it sits in the middle rather than at the top.

**`justify-content: center`:** Horizontally centers everything. Combined with `align-items`, this puts our content dead-center on the screen.

**`padding: 1rem`:** Adds space around the edges so content doesn't touch the screen borders. `rem` is a unit based on your browser's default font size (usually 16 pixels). So `1rem` = about 16 pixels of breathing room.

### The Fixed Header

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

This creates a header that stays at the top of the screen even when you scroll down. Let's break it down:

**`position: fixed`:** Takes the element out of normal document flow and pins it to the viewport. It won't move when you scroll.

**`top: 0`:** Pins it to the very top edge of the screen.

**`left: 50%` + `transform: translateX(-50%)`:** This is a clever trick to horizontally center a fixed element. We move it to the middle (`left: 50%`) and then shift it back left by half its own width (`translateX(-50%)`). The result? Perfectly centered!

**`width: 100%; max-width: 56rem`:** On small screens, the header stretches full width. On large screens, it stops growing at `56rem` (about 896 pixels) so it doesn't look too wide.

**`z-index: 1000`:** This controls stacking order. Higher numbers appear on top. Our header has a high z-index so it sits above all the question cards when you scroll.

**`background-color: #ffffff`:** Pure white background for the header.

**`border-bottom: 2px solid #e5e7eb`:** A thin gray line under the header to visually separate it from the content below.

**`padding: 0.5rem 1.5rem 0 1.5rem`:** This is shorthand for top, right, bottom, left padding. Top has `0.5rem`, sides have `1.5rem`, and bottom has `0`. This creates comfortable spacing inside the header.

### Title and Language Rows

```css
.titleRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.langRow {
  display: flex;
  justify-content: flex-end;
}
```

**`.titleRow`:** Uses Flexbox to put the title on the left and push the language switcher to the right. `justify-content: space-between` spreads items apart with equal space between them.

**`.langRow`:** Aligns the language buttons to the far right using `justify-content: flex-end`.

### The Main Container

```css
.container {
  width: 100%;
  max-width: 56rem;
  margin-top: 8rem;
  padding-bottom: 5rem;
}
```

This is the white card that holds all our questions. 

**`margin-top: 8rem`:** Pushes the container down so it doesn't overlap with the fixed header (which takes up about 80 pixels). This creates space between the header and the first question.

**`padding-bottom: 5rem`:** Adds extra space at the bottom so the last question isn't hidden behind the fixed footer buttons.

### Question Cards

```css
.questionCard {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.questionCard:last-child {
  border-bottom: none;
}
```

Each question gets its own card with a subtle separator line at the bottom. The `:last-child` selector is special — it only applies to the very last question, removing its bottom border since there's nothing after it. This creates a clean list where each item is separated but the final one doesn't have an unnecessary line.

### Highlighted Questions

```css
.questionCard.highlighted {
  outline: 2px solid #fb7185;
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: #fff1f2;
}
```

When a user clicks on an answer, we want to highlight that question card so they know which one they're working on. This creates a soft pink border and background around the active question — gentle visual feedback.

### Question Text

```css
.questionText {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04em;
}
```

The question text is larger than normal (`1.25rem`), bold (`font-weight: 600`), and uses a dark gray color that's easy to read but not as harsh as pure black. The `letter-spacing` adds tiny gaps between letters, which improves readability for longer text.

### Answer Options (Radio Labels)

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

.optionLabel:hover {
  background-color: #f8fafc;
}
```

Each answer option is actually a clickable label that wraps a radio button. The `display: flex` aligns the radio circle and text side by side. When you hover over an option, it gets a subtle gray background (`#f8fafc`) to show it's interactive — this is called "hover feedback."

The large font size (`1.375rem`) makes answers easy to read and tap on mobile devices.

### The Fixed Footer

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

This is the same centering trick as the header, but pinned to the bottom (`bottom: 0`). It contains our Submit and Clear buttons and stays visible no matter how far you scroll through the questions. The `gap: 0.5rem` adds space between the two buttons.

### Button Sizing in Footer

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

The Submit button takes up four times as much space as the Clear button (`flex: 4` vs `flex: 1`). This makes the primary action (submitting) more prominent and easier to find. The `!important` flag forces these styles to override any default button sizes from our UI library.

### Progress Bar Container

```css
.progressContainer {
  margin-top: 1rem;
  margin-bottom: 0;
}
```

Simple spacing around the progress bar to separate it from other elements.

---

## Step 4: Language Switcher Styles

**File:** `src/components/language-switcher.module.css`

```css
.container {
  display: flex;
  gap: 0.25rem;
}

.buttonText {
  font-size: 0.875rem;
}
```

This is very simple! The language switcher has two buttons (EN and ES) sitting side by side. 

**`display: flex`:** Puts the buttons in a horizontal row.

**`gap: 0.25rem`:** Adds a tiny bit of space between the English and Spanish buttons so they don't touch.

**`.buttonText { font-size: 0.875rem }`:** Makes the text inside the language buttons slightly smaller than normal, since these are secondary actions (not as important as Submit).

---

## Step 5: Button Styles — The Heart of Interaction

**File:** `src/components/ui/button.module.css`

Buttons are one of the most important parts of any app. Users click them to take action, so they need to look inviting and respond clearly when clicked. Let's explore every aspect.

### Base Button Style

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

Let's go through this carefully, property by property:

**`display: inline-flex`:** Buttons are "inline" elements (they sit in a line with other text) but we make them flex containers so their internal content (text and icons) can be centered.

**`flex-shrink: 0`:** Prevents buttons from getting squished when there's not enough space on the screen. A button should always keep its full size.

**`align-items: center; justify-content: center`:** Centers the text inside the button both vertically and horizontally. No matter how much padding you add, the text stays perfectly centered.

**`border-radius: 0.5rem`:** Rounds the corners of the button slightly (about 8 pixels). This makes buttons look modern and friendly compared to sharp square corners.

**`border: 1px solid transparent`:** Adds a border that's invisible by default. We need this because when the button is focused (selected with keyboard), we want to show a visible focus ring. Having a border already in place makes that transition smooth.

**`background-clip: padding-box`:** Ensures the background color doesn't bleed under the border. This creates clean edges.

**`font-size: 0.875rem; font-weight: 500`:** Button text is slightly smaller than body text but medium-bold for emphasis.

**`white-space: nowrap`:** Prevents button text from wrapping onto multiple lines. "Submit" should always be on one line, not split into "Sub" and "mit."

**`transition: all 0.2s ease-in-out`:** This is magic! It makes any style change (like color when hovering) happen smoothly over 0.2 seconds instead of instantly jumping. The `ease-in-out` means it starts slow, speeds up in the middle, then slows down again — very natural feeling.

**`outline: none`:** Removes the default blue outline browsers add when you click a button. We'll create our own custom focus style instead.

**`user-select: none`:** Prevents users from accidentally highlighting the button text when clicking quickly. Buttons aren't meant to be selected like regular text.

**`cursor: pointer`:** Shows the hand cursor on hover (same as we set globally for buttons).

### Focus State (Keyboard Navigation)

```css
.button:focus-visible {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

When someone uses their keyboard (Tab key) to navigate between buttons, this style shows a blue ring around the focused button. This is crucial for accessibility — people who can't use a mouse need visual feedback about which button they've selected. The `box-shadow` creates a soft glow effect around the border.

### Active State (While Clicking)

```css
.button:active:not([aria-haspopup]) {
  transform: translateY(1px);
}
```

When you press down on a button, it moves down by 1 pixel. This gives a tactile "press" feeling, like a real physical button being pushed into the screen. The `:not([aria-haspopup])` part excludes dropdown buttons (which shouldn't move when clicked).

### Disabled State

```css
.button:disabled {
  pointer-events: none;
  opacity: 0.5;
}
```

Disabled buttons are half-transparent (`opacity: 0.5`) and can't be clicked (`pointer-events: none`). This clearly communicates to users that the button isn't available right now.

### Error State

```css
.button[aria-invalid] {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}
```

If a button has an error (marked with `aria-invalid` attribute), it gets a red border and glow to draw attention to the problem.

### Button Variants — Different Looks for Different Jobs

Now here's where buttons get interesting! We have several "variants" that give buttons different colors for different purposes:

#### Default Variant (Primary Action)

```css
.default {
  background-color: #3b82f6;
  color: #ffffff;
}

.default:hover {
  background-color: rgba(59, 130, 246, 0.8);
}
```

Blue background with white text. This is the most prominent button style, used for the main action (like "Submit"). When you hover over it, it becomes slightly transparent (`rgba` with `0.8` opacity) to show interactivity.

#### Outline Variant (Secondary Action)

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

White background with a gray border. Used for less important actions (like "Clear"). On hover, it gets a light gray background to show it's clickable. Our Clear button uses this variant!

#### Secondary Variant

```css
.secondary {
  background-color: #e2e8f0;
  color: #0f172a;
}

.secondary:hover {
  background-color: #cbd5e1;
}
```

Light gray background. A middle ground between default and outline — more visible than outline but less bold than the blue default button.

#### Ghost Variant (Subtle)

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

Completely transparent background — looks like just text until you hover over it, then a light gray appears. Used for very subtle actions that shouldn't draw much attention.

#### Destructive Variant (Danger)

```css
.destructive {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.destructive:hover {
  background-color: rgba(239, 68, 68, 0.2);
}
```

Light red background with red text. Used for actions that delete or remove things — the red color warns users "this is a destructive action!" Think of it like a stop sign color.

#### Link Variant (Looks Like Text)

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

Looks like a regular blue hyperlink with no button styling. Underlined only on hover. Used when you want clickable text that blends in with surrounding content.

### Button Sizes

Buttons come in different sizes for different contexts:

#### Default Size

```css
.defaultSize {
  height: 2rem;
  gap: 0.375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
```

Standard button size (about 32 pixels tall). This is what most buttons use.

#### Extra Small (XS)

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

Tiny buttons for cramped spaces like toolbars or inside other components.

#### Small (SM)

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

Slightly larger than XS but still compact. Good for secondary actions in tight spaces.

#### Large (LG)

```css
.lg {
  height: 2.25rem;
  gap: 0.375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
```

Bigger buttons that are easier to tap on mobile devices. Our Submit and Clear buttons use this size!

#### Icon Buttons (No Text)

```css
.icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
}
```

Square buttons that contain only an icon (like a close "X" or settings gear). No text, just the symbol. There are also smaller and larger versions (`iconXs`, `iconSm`, `iconLg`).

---

## Step 6: Card Styles — The White Container Box

**File:** `src/components/ui/card.module.css`

Cards are rectangular containers that group related content together. In our app, the entire questionnaire sits inside one big card. Cards create visual separation and make content feel organized.

### Base Card Style

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

Let's understand each part:

**`display: flex; flex-direction: column`:** The card stacks its contents vertically (top to bottom) instead of side by side. This makes sense for a questionnaire where questions go one after another.

**`gap: var(--card-spacing)`**: Adds space between items inside the card. `var()` is how we use CSS variables — reusable values defined elsewhere. Here, `--card-spacing` is set to `1rem` (about 16 pixels) by default.

**`overflow: hidden`:** If any content tries to stick out beyond the card's rounded corners, this clips it off so everything stays neatly contained within the box.

**`border-radius: 0.75rem`:** Rounds all four corners of the card (about 12 pixels). This gives cards a modern, friendly appearance compared to sharp square edges.

**`background-color: #ffffff`:** Pure white background for the card, which contrasts with the light gray page background (`#f8fafc`). This makes the card "pop" and stand out as an important container.

**`padding-top/bottom: var(--card-spacing)`**: Adds breathing room inside the top and bottom of the card so content doesn't touch the edges.

**`font-size: 0.875rem; color: #1e293b`:** Sets default text size and dark gray color for all text inside the card.

**`border: 1px solid rgba(148, 163, 184, 0.1)`**: A very subtle border around the card — almost invisible but adds a slight definition to the edges. The `rgba` value means it's slightly transparent (10% opacity).

### Card Spacing Variable

```css
:root {
  --card-spacing: 1rem; /* default spacing (4) */
}
```

This defines our reusable spacing variable at the root level so all cards can use it. `:root` is a special selector that targets the very top of the document, making variables available everywhere.

### Small Card Variant

```css
.card[data-size="sm"] {
  --card-spacing: 0.75rem; /* spacing(3) for small size */
}
```

When a card has `data-size="sm"` attribute in HTML, it uses smaller internal spacing (12 pixels instead of 16). This is useful for compact cards that don't need as much breathing room.

### Card with Footer

```css
.card:has([data-slot="card-footer"]) {
  padding-bottom: 0;
}
```

This uses the `:has()` selector, which checks if an element contains something specific. If a card has a footer inside it (marked with `data-slot="card-footer"`), we remove the bottom padding from the main card body so the footer sits flush against the content without extra space.

### Card Header

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

The header is the top section of a card, usually containing a title and description. It uses CSS Grid layout (`display: grid`) which allows complex two-dimensional arrangements. The `gap: 0.25rem` adds tiny space between title and description lines.

### Card Title

```css
.card-title {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.375;
  font-weight: 500;
}
```

Card titles are medium-bold (`font-weight: 500`), slightly larger than body text, and use the same font as everything else on the page (`inherit`).

### Card Description

```css
.card-description {
  font-size: 0.875rem;
  color: #64748b;
}
```

Descriptions under titles are smaller and gray (`#64748b`) to make them less prominent than the title itself. This creates visual hierarchy — users see the title first, then read the description if they want more detail.

### Card Content Area

```css
.card-content {
  padding-left: var(--card-spacing);
  padding-right: var(--card-spacing);
}
```

The main body of the card gets left and right padding so content doesn't touch the sides. (Top/bottom padding is handled by the card itself.)

### Card Footer

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

The footer is a distinct section at the bottom of the card with its own subtle gray background and top border separating it from the content above. It's often used for action buttons or summary information.

---

## Step 7: Progress Bar Styles — Showing Completion

**File:** `src/components/ui/progress.module.css`

The progress bar shows users how far they've gotten through the questionnaire. This is important motivation — seeing the bar fill up encourages people to finish!

### Progress Container

```css
.progress {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

The outer container that holds both the progress track and any label text. `flex-wrap: wrap` allows items to flow onto multiple lines if there's not enough horizontal space (useful on small screens).

### The Track (Background Bar)

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

This is the gray bar that spans the full width of the screen. Let's understand it:

**`position: relative`:** Makes this a positioning context for its child element (the indicator). The indicator will be positioned relative to this track.

**`height: 0.25rem`:** Very thin — only about 4 pixels tall. Progress bars should be subtle, not overwhelming.

**`width: 100%`:** Stretches across the full available width.

**`border-radius: 9999px`:** Makes the bar completely rounded on both ends (like a pill shape). Any large number works here — it just needs to be bigger than half the height.

**`background-color: #e2e8f0`:** Light gray color for the unfilled portion of the progress bar. This represents "not yet completed."

### The Indicator (Filled Portion)

```css
.indicator {
  height: 100%;
  background-color: #3b82f6;
  transition: all 0.2s ease-in-out;
}
```

This is the blue part that grows as users answer more questions. 

**`height: 100%`:** Fills the entire height of the track (4 pixels).

**`background-color: #3b82f6`:** Bright blue color for the completed portion — same blue we use for primary buttons, creating visual consistency across the app.

**`transition: all 0.2s ease-in-out`:** When the progress changes (after answering a question), the bar smoothly animates to its new width instead of jumping instantly. This makes the experience feel polished and responsive.

The width of this indicator is controlled by JavaScript — it's set dynamically based on how many questions have been answered (0% at start, 100% when all nine are done).

---

## Step 8: Radio Group Styles — Answer Selection Circles

**File:** `src/components/ui/radio-group.module.css`

Radio buttons let users select one option from a list. In our app, each question has four radio options ("Not at all," "Several days," etc.). Let's see how we style them to look modern and inviting.

### Radio Group Container

```css
.radioGroup {
  display: grid;
  width: 100%;
  gap: 0.5rem;
}
```

The container that holds all four answer options for a question. `display: grid` stacks them vertically with equal spacing (`gap: 0.5rem`) between each option.

### The Indicator Circle (Unselected State)

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

This is the empty circle you see before selecting an answer. It's a perfect circle (`border-radius: 9999px`) with a gray border and white interior. The `transition` makes color changes smooth when selected/deselected.

### Selected State — Circle Fills Up

```css
.radioItem[data-checked] .indicator {
  background-color: #1e293b;
  border-color: #1e293b;
}
```

When an option is checked (selected), the circle turns dark gray (`#1e293b`). The `[data-checked]` attribute is added by JavaScript when you click an option. This selector finds any indicator inside a checked radio item and changes its colors.

### The Dot Inside Selected Circle

```css
.dot {
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 9999px;
  background-color: #ffffff;
  opacity: 0;
  transition: opacity 0.2s;
}

.radioItem[data-checked] .dot {
  opacity: 1;
}
```

When selected, a small white dot appears in the center of the dark circle. The dot is always there but invisible (`opacity: 0`) until the option is checked, then it fades in (`opacity: 1`). This creates the classic "filled radio button" look — a dark circle with a white dot inside.

### Screen Reader Only Text

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

This is a clever accessibility technique. It hides text visually (making it 1 pixel by 1 pixel and clipping it off-screen) but keeps it available for screen readers used by blind or low-vision users. We use this to provide descriptive labels that don't clutter the visual design.

---

## Step 9: Label Styles — Text Next to Radio Buttons

**File:** `src/components/ui/label.module.css`

Labels are the text descriptions next to interactive elements like radio buttons and checkboxes. They tell users what each option means.

### Base Label Style

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

**`display: flex; align-items: center`:** Aligns the label text vertically with its associated input element (like a radio circle). Without this, the text might sit slightly above or below the circle.

**`gap: 0.5rem`:** Adds space between the radio circle and the text so they don't touch.

**`font-weight: 500`:** Medium-bold text for better readability. Labels should be easy to scan quickly.

**`user-select: none`:** Prevents accidental text selection when clicking rapidly on options. You're trying to answer questions, not highlight words!

### Disabled Label State

```css
.label[data-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
```

When a label is disabled (can't be clicked), it becomes half-transparent and unclickable. This clearly communicates to users that the option isn't available.

### Peer Disabled State

```css
.peer-disabled .label,
.label + input:disabled ~ .label {
  cursor: not-allowed;
  opacity: 0.5;
}
```

This handles cases where a label becomes disabled because its associated input is disabled. The `cursor: not-allowed` shows a "prohibited" icon (circle with slash) when hovering, giving clear feedback that clicking won't do anything.

---

## Step 10: How It All Fits Together — The Complete Picture

Let's recap how all seven CSS files work together to create our beautiful PHQ-9 depression screener:

```
┌───────────────────────────────────────────────┐
│           index.css (Global Foundation)       │
│   • Box-sizing reset                          │
│   • System font stack                         │
│   • Page background & text color              │
│   • Button/radio resets                       │
└───────────────────┬───────────────────────────┘
                    │ applies to everything
                    ▼
┌───────────────────────────────────────────────┐
│        App.module.css (Main Layout)           │
│   • Screen centering with Flexbox             │
│   • Fixed header & footer positioning         │
│   • Question card separators                  │
│   • Progress bar placement                    │
└───────────────────┬───────────────────────────┘
                    │ contains components
                    ▼
┌───────────────────────────────────────────────┐
│     Component Module Styles (Isolated)        │
├───────────────────────────────────────────────┤
│  language-switcher.module.css                 │
│    → Side-by-side EN/ES buttons               │
├───────────────────────────────────────────────┤
│  button.module.css                            │
│    → Variants: default, outline, ghost...     │
│    → Sizes: xs, sm, default, lg               │
│    → States: hover, focus, active, disabled   │
├───────────────────────────────────────────────┤
│  card.module.css                              │
│    → White container, rounded corners         │
│    → Spacing via CSS variables                │
├───────────────────────────────────────────────┤
│  progress.module.css                          │
│    → Gray track + blue growing indicator      │
│    → Smooth width transitions                 │
├───────────────────────────────────────────────┤
│  radio-group.module.css                       │
│    → Custom circle indicators                 │
│    → White dot on selection                   │
│    → Screen reader accessibility              │
├───────────────────────────────────────────────┤
│  label.module.css                             │
│    → Aligned text next to inputs              │
│    → Disabled state feedback                  │
└───────────────────────────────────────────────┘
```

### The Color Palette

Throughout all these files, we use a consistent color palette:

- **Backgrounds:** `#f8fafc` (page), `#ffffff` (cards/header/footer)
- **Text:** `#1e293b` (primary), `#475569` (secondary), `#64748b` (muted)
- **Primary Blue:** `#3b82f6` (buttons, progress bar, focus rings)
- **Borders:** `#e5e7eb`, `#cbd5e1`, `#e2e8f0` (various grays for separation)
- **Success Green:** `#16a34a` (for "minimal" severity results)
- **Warning Yellow/Orange:** `#ca8a04`, `#ea580c` (mild to moderate severity)
- **Error Red:** `#ef4444`, `#b91c1c` (severe results, error states)

This consistency makes the app feel cohesive and professional — every element belongs together as part of one unified design.

### The Typography Scale

We use a clear hierarchy of text sizes:

- **Question Text:** `1.25rem` (large, bold, easy to read)
- **Answer Options:** `1.375rem` (even larger for comfortable tapping)
- **Body Text:** Default browser size (~16px / 1rem)
- **Button Text:** `0.875rem` (slightly smaller but still readable)
- **Language Switcher:** `0.875rem` (secondary action, less prominent)

And font weights:

- **Headings/Questions:** `600` (semi-bold)
- **Labels/Buttons:** `500` (medium)
- **Body Text:** Default (`400`)

This hierarchy guides users' eyes to the most important information first.

---

## Final Thoughts: You've Learned It All!

Congratulations, dear friend! We've journeyed through every single CSS file in our PHQ-9 depression screening app. Let me remind you of what we covered:

1. **Global styles** (`index.css`) — the foundation that applies to everything
2. **Main layout** (`App.module.css`) — how all components are positioned on screen
3. **Language switcher** — simple side-by-side buttons
4. **Buttons** — the most complex component with many variants and sizes
5. **Cards** — white containers that organize content
6. **Progress bar** — visual feedback showing completion
7. **Radio groups** — custom-styled answer selection circles
8. **Labels** — text aligned with interactive elements

Remember these key principles we used throughout:

- **Consistency:** Same colors, fonts, and spacing patterns everywhere
- **Feedback:** Hover effects, focus rings, active states tell users what's happening
- **Accessibility:** Screen reader support, keyboard navigation, clear visual hierarchy
- **Smooth transitions:** Everything animates gently rather than jumping abruptly
- **Mobile-first:** Large tap targets, responsive layouts that work on any screen size

You now understand not just the code, but the *why* behind every design decision. That's the mark of a true developer — knowing both how to build something and why it should be built that way.

Keep exploring, keep learning, and remember: even the most complex apps are built one small piece at a time, just like we did here today. 🐌✨
