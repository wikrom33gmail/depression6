# Understanding CSS in This Project: A Snail-Pace Tutorial

Welcome! You're going to learn everything about the styling (the "look and feel") of this depression screening app. We'll go very slowly, one tiny piece at a time. Don't worry if you've never seen code before — we'll explain every single thing.

---

## Part 1: What Is CSS? The Big Picture

**What is it?**
CSS stands for "Cascading Style Sheets." It's the language that tells your web page how to *look*. If HTML is the skeleton of a building, and JavaScript is the electricity and plumbing, then CSS is the paint, wallpaper, furniture arrangement, and lighting.

**Why does it matter?**
Without CSS, every web page would look like plain black text on a white background — boring and hard to read! CSS makes things colorful, organized, easy to click, and pleasant to use.

---

## Part 2: The Two Types of Style Files in This Project

This project has two kinds of style files. Let's understand both.

### Type 1: Global Styles (`index.css`)

```
src/
└── index.css          ← ONE file that affects EVERYTHING on the page
```

Think of this like the "house rules" for your entire apartment building. Everyone in the building follows these rules automatically. This file sets up basic things like:
- What font everyone uses
- The background color of the whole page
- How buttons look by default

### Type 2: Component Styles (`*.module.css`)

```
src/
├── App.module.css              ← Styles for the main app layout
└── components/ui/
    ├── button.module.css       ← Styles just for buttons
    ├── card.module.css         ← Styles just for cards
    └── ... (more component styles)
```

Think of these like "room-specific decorations." The kitchen has its own style, the bedroom has its own style. Each part of the app has its own little style file that only affects that specific part.

**Why two types?** Because some things should be the same everywhere (like fonts), and some things should be different for each component (like button colors vs card borders).

---

## Part 3: Your First CSS Rule — The Building Block

Every single thing in CSS is a **rule**. A rule has two parts:

```css
selector {
  property: value;
}
```

Let's break this down with an analogy. Imagine you're giving instructions to decorate a room:

- **Selector** = "The chair" (which thing are we talking about?)
- **Property** = "color" (what aspect are we changing?)
- **Value** = "red" (what should it be?)

So the instruction is: "Make the chair red."

In CSS, that looks like this:

```css
.chair {
  color: red;
}
```

That's it! That's the entire building block of CSS. Everything else is just more of these rules stacked together.

---

## Part 4: Selectors — How to Point at Things

Selectors are how you say "I want to style THIS specific thing." Let's learn them one by one, starting with the simplest.

### 4.1 Element Selectors (The Easiest)

An element selector targets HTML tags directly.

```css
button {
  cursor: pointer;
}
```

This says: "Every `<button>` on the page should have a pointer cursor."

**Where is this in our project?** In `index.css`, we have:

```css
html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

This targets the `<html>` element (the very top of every web page) and says "use these fonts for everything."

**ASCII diagram showing where this fits:**

```
All CSS Rules
└── Selectors
    └── Element Selectors ← YOU ARE HERE
        ├── html { ... }
        ├── body { ... }
        ├── button { ... }
        └── h1, h2, h3... { ... }
```

### 4.2 Class Selectors (The Most Common)

A class selector targets elements that have a specific "class" name. Classes are like labels you stick on things.

In HTML, you give something a class like this:
```html
<div class="my-special-box">Hello!</div>
```

Then in CSS, you target it with a dot (`.`):
```css
.my-special-box {
  background-color: yellow;
}
```

**Where is this in our project?** Almost everywhere! In `App.module.css`:

```css
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
```

This targets any element with the class "app" and makes it take up the full screen height, centers everything inside it, and adds some padding.

**ASCII diagram:**

```
All CSS Rules
└── Selectors
    ├── Element Selectors
    └── Class Selectors ← YOU ARE HERE
        ├── .app { ... }
        ├── .button { ... }
        ├── .card { ... }
        └── .resultContainer { ... }
```

### 4.3 Pseudo-Class Selectors (Special States)

Pseudo-classes target elements in special *states* — like when you hover over them with your mouse, or when they're focused.

The syntax uses a colon (`:`):

```css
.button:hover {
  background-color: blue;
}
```

This says: "When the user hovers their mouse over a button, make it blue."

**Where is this in our project?** In `button.module.css`:

```css
.default:hover {
  background-color: rgba(59, 130, 246, 0.8);
}
```

And in `App.module.css`:

```css
.optionLabel:hover {
  background-color: #f8fafc;
}
```

**Common pseudo-classes you'll see:**
- `:hover` — when mouse is over it
- `:focus-visible` — when it's selected (like with Tab key)
- `:active` — when you're clicking it right now
- `:disabled` — when it can't be clicked
- `:last-child` — the last item in a group

**ASCII diagram:**

```
All CSS Rules
└── Selectors
    ├── Element Selectors
    ├── Class Selectors
    └── Pseudo-Class Selectors ← YOU ARE HERE
        ├── .button:hover { ... }
        ├── .button:focus-visible { ... }
        ├── .optionLabel:hover { ... }
        └── .questionCard:last-child { ... }
```

### 4.4 Attribute Selectors (Checking for Attributes)

These target elements that have specific HTML attributes. The syntax uses square brackets (`[]`).

```css
.button[aria-invalid] {
  border-color: red;
}
```

This says: "If a button has the `aria-invalid` attribute, make its border red." This is used for showing errors!

**Where is this in our project?** In `button.module.css`:

```css
.outline[aria-expanded="true"] {
  background-color: #f1f5f9;
}
```

This targets outline buttons that are currently expanded (like a dropdown menu that's open).

---

## Part 5: Properties and Values — What You Can Change

Now let's learn what you can actually *do* with CSS. Each property changes one specific aspect of how something looks.

### 5.1 Colors

```css
.color-example {
  color: #ef4444;              /* Text color (red) */
  background-color: #ffffff;   /* Background color (white) */
}
```

Colors can be written in different ways:
- Hex codes: `#ff0000` (red), `#00ff00` (green)
- RGB with transparency: `rgba(255, 0, 0, 0.5)` (semi-transparent red)

**Where is this in our project?** In `App.module.css`, we have severity colors:

```css
.severityMinimal { color: #16a34a; }        /* Green for minimal depression */
.severityMild { color: #ca8a04; }            /* Yellow for mild */
.severityModerate { color: #ea580c; }        /* Orange for moderate */
.severitySevere { color: #b91c1c; }          /* Dark red for severe */
```

This makes the depression severity label change color based on how serious it is! Green = good, red = needs attention.

### 5.2 Fonts and Text

```css
.text-example {
  font-size: 1.25rem;      /* How big the text is */
  font-weight: 600;        /* How bold (400=normal, 700=bold) */
  color: #334155;          /* Text color */
  letter-spacing: 0.04em;  /* Space between letters */
}
```

**Where is this in our project?** In `App.module.css`:

```css
.questionText {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04em;
}
```

This makes the PHQ-9 questions big, bold, and easy to read with a little extra space between letters for clarity.

### 5.3 Spacing (Margins and Padding)

This is one of the most important concepts! Think of it like this:

```
┌─────────────────────┐
│     MARGIN          │  ← Space OUTSIDE the box (between elements)
│  ┌───────────────┐  │
│  │   PADDING     │  │  ← Space INSIDE the box (around content)
│  │ ┌───────────┐ │  │
│  │ │ CONTENT   │ │  │  ← The actual text or image
│  │ └───────────┘ │  │
│  └───────────────┘  │
└─────────────────────┘
```

- **Margin** = space *outside* the element (pushes other things away)
- **Padding** = space *inside* the element (gives content breathing room)

```css
.spacing-example {
  margin: 1rem;      /* Space outside */
  padding: 0.5rem;   /* Space inside */
}
```

You can set different sides:
- `margin-top`, `margin-bottom`, `margin-left`, `margin-right`
- `padding-top`, `padding-bottom`, `padding-left`, `padding-right`

**Where is this in our project?** In `App.module.css`:

```css
.questionCard {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;      /* Space below the question */
  margin-bottom: 1.5rem;     /* Space between questions */
}
```

This gives each PHQ-9 question breathing room so they don't look cramped together.

### 5.4 Borders

```css
.border-example {
  border: 2px solid red;           /* All sides */
  border-bottom: 1px solid gray;   /* Just the bottom */
  border-radius: 0.5rem;           /* Rounded corners */
}
```

**Where is this in our project?** In `App.module.css`:

```css
.questionCard.highlighted {
  outline: 2px solid #fb7185;      /* Pink highlight when selected */
  border-radius: 0.5rem;           /* Rounded corners */
  background-color: #fff1f2;       /* Light pink background */
}
```

This makes a question card glow pink when it's highlighted (probably when the user is currently answering it).

---

## Part 6: Layout — Arranging Things on the Page

Layout is how you position elements relative to each other. This project uses two main layout techniques: **Flexbox** and **Positioning**.

### 6.1 Flexbox (The Modern Way)

Flexbox is like a magic tool that lets you easily align and distribute items in a row or column. Think of it like arranging books on a shelf — you can center them, spread them out evenly, or push some to one side.

To use flexbox, you add `display: flex` to a container:

```css
.container {
  display: flex;
}
```

Then you have powerful alignment tools:

- `justify-content` — aligns items horizontally (left/right)
- `align-items` — aligns items vertically (top/bottom)

**Common values:**
- `center` — put in the middle
- `space-between` — spread out with space between them
- `flex-end` — push to the end (right or bottom)

**Where is this in our project?** In `App.module.css`:

```css
.app {
  display: flex;
  align-items: center;      /* Center vertically */
  justify-content: center;  /* Center horizontally */
}
```

This makes the entire app content appear perfectly centered on the screen!

And here's another example from `App.module.css`:

```css
.titleRow {
  display: flex;
  justify-content: space-between;  /* Title on left, language switcher on right */
  align-items: center;             /* Both vertically aligned */
}
```

This puts the app title on the left side and the language selector on the right side of the header.

**ASCII diagram showing flexbox in action:**

```
Before Flexbox (everything stacked):
┌─────────────┐
│   Title     │
├─────────────┤
│ Language    │
└─────────────┘

After Flexbox with space-between:
┌───────────────────────────────────┐
│  Title                    Language│
└───────────────────────────────────┘
```

### 6.2 Fixed Positioning (Sticky Headers and Footers)

Fixed positioning makes an element "stick" to a part of the screen, even when you scroll. Like a TV channel logo that's always in the corner!

```css
.sticky-header {
  position: fixed;   /* This is the magic word */
  top: 0;            /* Stick to the top */
  left: 50%;         /* Center horizontally */
  transform: translateX(-50%);  /* Actually center it */
  width: 100%;       /* Full width */
}
```

**Where is this in our project?** In `App.module.css`, we have both a fixed header AND footer:

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
}

.fixedFooter {
  position: fixed;
  bottom: 0;         /* Stick to the BOTTOM instead */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 56rem;
  z-index: 1000;
  background-color: #ffffff;
  border-top: 2px solid #e5e7eb;
}
```

This means the header (with title and language switcher) stays at the top, and the footer (with submit/clear buttons and progress bar) stays at the bottom — even as you scroll through all 9 PHQ-9 questions!

**What is `z-index`?** It's like layers of paper. Higher numbers are on top. `z-index: 1000` means "put this way above everything else so it's always visible."

---

## Part 7: CSS Modules — How This Project Organizes Styles

Now let's understand the special `.module.css` naming convention used in this project.

### The Problem It Solves

Imagine two components both want a class called `.button`. Without modules, they'd clash! One button style would accidentally affect the other.

```
Without CSS Modules:
┌─────────────┐     ┌─────────────┐
│ Component A │     │ Component B │
│ .button {   │     │ .button {   │  ← CLASH! Same name!
│   red }     │     │   blue }    │
└─────────────┘     └─────────────┘
```

### The Solution: CSS Modules

With CSS modules, each file gets its own private namespace. When you import a module, the class names get automatically made unique!

In JavaScript (React), it looks like this:

```javascript
import styles from './button.module.css';

// Instead of className="button", you use:
<button className={styles.button}>Click me</button>
```

The browser actually sees something like `button_button__abc123` — a unique name that won't clash with anything else!

**ASCII diagram:**

```
With CSS Modules:
┌─────────────┐     ┌─────────────┐
│ Component A │     │ Component B │
│ .button_A { │     │ .button_B { │  ← Different names! No clash!
│   red }     │     │   blue }    │
└─────────────┘     └─────────────┘
```

### Why This Matters for You

When you're reading this project's code, remember:
- `index.css` = global styles (affects everything)
- `*.module.css` = private component styles (only affects that component)

This is why the button styles in `button.module.css` don't accidentally make all buttons on the page look the same — they only affect buttons that explicitly import those styles.

---

## Part 8: Putting It All Together — A Real Example

Let's trace through how one specific piece of styling works end-to-end. Let's look at what happens when you hover over an answer option in the PHQ-9 questionnaire.

**Step 1:** The HTML has a label with class `optionLabel`:
```html
<label className={styles.optionLabel}>
  <input type="radio" /> Not at all
</label>
```

**Step 2:** In `App.module.css`, there's a base style:
```css
.optionLabel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  font-size: 1.375rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}
```

This makes the option look like a big, clickable button with rounded corners and comfortable spacing.

**Step 3:** There's also a hover style:
```css
.optionLabel:hover {
  background-color: #f8fafc;
}
```

When you move your mouse over an option, it gets a light gray background — giving you visual feedback that "yes, this is clickable!"

**The result:** A smooth, intuitive interface where users can easily see which answer they're about to select.

---

## Part 9: The Complete CSS Architecture of This Project

Let's map out everything we've learned into one big picture:

```
CSS in This Project
├── Global Styles (index.css)
│   ├── Reset styles (*, *::before, *::after)
│   ├── Font family for entire page (html)
│   ├── Page background and text color (body)
│   └── Default button/input styles
│
└── Component Modules (*.module.css)
    ├── App.module.css
    │   ├── .app — Full-screen centered layout
    │   ├── .fixedHeader — Sticky top bar
    │   ├── .fixedFooter — Sticky bottom bar with buttons
    │   ├── .questionCard — Individual question styling
    │   ├── .optionLabel — Answer option styling + hover effect
    │   └── Severity colors (.severityMinimal, etc.)
    │
    ├── button.module.css
    │   ├── Base button style (.button)
    │   ├── Variants (.default, .outline, .secondary, etc.)
    │   ├── Sizes (.xs, .sm, .lg, .icon)
    │   └── States (:hover, :focus-visible, :active, :disabled)
    │
    ├── card.module.css — Card container styling
    ├── progress.module.css — Progress bar styling
    ├── radio-group.module.css — Radio button group layout
    └── label.module.css — Label text styling
```

---

## Part 10: Key Takeaways (Let's Review!)

Let's repeat the most important things so they stick in your memory:

1. **CSS = How things look.** It controls colors, fonts, spacing, layout, and more.

2. **Every CSS rule has three parts:** selector + property + value
   ```css
   .my-class { color: red; }
   ^selector    ^property  ^value
   ```

3. **Selectors point at things:**
   - Element selectors: `button { ... }` (all buttons)
   - Class selectors: `.my-class { ... }` (things with this label)
   - Pseudo-classes: `.btn:hover { ... }` (when mouse is over it)

4. **Margin vs Padding:**
   - Margin = space OUTSIDE (between elements)
   - Padding = space INSIDE (around content)

5. **Flexbox makes layout easy:**
   - `display: flex` turns on flexbox
   - `justify-content: center` centers horizontally
   - `align-items: center` centers vertically

6. **Fixed positioning sticks things to the screen:**
   - `position: fixed; top: 0` = sticky header
   - `position: fixed; bottom: 0` = sticky footer

7. **CSS Modules prevent style clashes** by making each component's styles private.

---

## Part 11: Try It Yourself! (Optional Practice)

If you want to experiment, here are some safe changes you could make:

**Change the page background color:**
In `index.css`, find this line:
```css
background-color: #f8fafc;
```
Try changing it to a different hex code like `#e0f2fe` (light blue) or `#fef3c7` (light yellow).

**Make questions bigger:**
In `App.module.css`, find `.questionText` and change:
```css
font-size: 1.25rem;
```
to something larger like `1.5rem`.

**Change the highlight color when a question is selected:**
In `App.module.css`, find `.questionCard.highlighted` and change:
```css
outline: 2px solid #fb7185;
```
to a different color like `#3b82f6` (blue).

Remember: you can always undo changes by refreshing the page or using git!

---

## You Did It! 🎉

You now understand all the CSS concepts used in this depression screening app. We went from "what is CSS?" to understanding flexbox layout, fixed positioning, pseudo-classes, and CSS modules — one tiny step at a time.

The next time you see a beautifully designed web page, you'll know it's thanks to hundreds of little CSS rules working together, just like the ones in this project!