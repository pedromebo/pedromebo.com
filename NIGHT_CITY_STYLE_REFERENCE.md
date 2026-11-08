# Night City Synthwave — Style Reference
> A high-voltage developer and AI engineering design language built on a deep cyber-indigo midnight canvas (`#111638`), laser cyan accents (`#00f5d4`), and hot magenta synthwave highlights (`#ff2e93`). The system pairs a bold geometric display sans with the open Rubik/Inter family for UI copy and Monaco for code, combining deep nocturnal hero and telemetry surfaces with crisp dark-on-light editorial sections and a single-color CTA hierarchy where deep midnight-indigo buttons anchor actions across both polarities.

**Theme:** dual-polarity (cyber-indigo dark canvas + high-contrast light surfaces)

**Reference website:** [https://pedromebo.com/](https://pedromebo.com/)  
Use the live website to validate responsive rhythm, polarity transitions, and interactive telemetry states.

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| primary | `#0a0d24` | `--color-primary` | primary interaction treatment and deepest brand anchor |
| ink deep | `#111638` | `--color-ink-deep` | deep cyber-indigo ink for dark feature cards and primary text on light |
| on primary | `#ffffff` | `--color-on-primary` | high-contrast white text and icons on primary and dark surfaces |
| accent cyan | `#00f5d4` | `--color-accent-cyan` | primary high-luminance laser cyan for keyword chips and active states |
| accent magenta | `#ff2e93` | `--color-accent-magenta` | secondary hot-magenta neon accent for badges, traces, and alerts |
| accent indigo | `#596dff` | `--color-accent-indigo` | vibrant electric indigo for brand icons, links, and active borders |
| accent indigo deep | `#24208f` | `--color-accent-indigo-deep` | deep ultraviolet-indigo spotlight surface and custom select fill |
| accent indigo mid | `#586094` | `--color-accent-indigo-mid` | smoky steel-indigo surface for secondary token buttons |
| surface canvas dark | `#111638` | `--color-surface-canvas-dark` | primary nocturnal page canvas and hero background (`S=53%, L=14%`) |
| surface canvas light | `#ffffff` | `--color-surface-canvas-light` | crisp white surface for top navigation, inputs, light cards, and footer |
| surface night | `#0a0d24` | `--color-surface-night` | deepest abyssal night surface for code blocks, pills, and featured cards |
| surface press light | `#eff0f7` | `--color-surface-press-light` | pressed state background for inverted buttons and light badges |
| surface press stronger | `#e6e8f2` | `--color-surface-press-stronger` | pressed state background for primary buttons |
| hairline indigo | `#262f6e` | `--color-hairline-indigo` | carved structural HUD border on dark surfaces (`+14%` lightness over canvas) |
| hairline cool | `#cbcfe0` | `--color-hairline-cool` | indigo-tinted mid-tone border for inputs and cards on light surfaces |
| hairline cloud | `#e5e7eb` | `--color-hairline-cloud` | soft structural divider and disabled button fill |
| ink | `#111638` | `--color-ink` | standard body ink on light surfaces |
| ink press | `#0e122e` | `--color-ink-press` | active and pressed state ink color |
| on dark muted | `#b6bddb` | `--color-on-dark-muted` | cool-tinted secondary copy on dark surfaces and disabled text |
| on dark faint | `#282f59` | `--color-on-dark-faint` | ghost button fill on dark and subtle surface elevation |
| ring focus | `#00f5d4` | `--color-ring-focus` | high-visibility laser cyan focus ring for keyboard navigation |

## Tokens — Typography

### Space Grotesk, Rubik, Inter, system-ui, sans-serif · `--font-primary`
- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 700, 500
- **Sizes:** 88px, 60px
- **Line height:** 1.2, 1.1
- **Letter spacing:** 0
- **Role:** Primary display typography family for hero headlines and high-impact callouts.

### Rubik, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif · `--font-family-2`
- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 500
- **Sizes:** 30px
- **Line height:** 1.2
- **Letter spacing:** 0
- **Role:** Section and card title typography family across the documented type scale.

### Rubik, -apple-system, system-ui, sans-serif · `--font-family-3`
- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 500, 600, 400, 700
- **Sizes:** 27px, 24px, 20px, 16px, 15px, 14px, 10px
- **Line height:** 1.25, 2, 1.5, 1.4, 1.14, 1.29, 1.43, 1.8
- **Letter spacing:** 0, 0.2px, 0.25px
- **Role:** Core UI, article body, button label, and micro-caption typography family.

### Monaco, Menlo, Ubuntu Mono, monospace · `--font-family-4`
- **Substitute:** JetBrains Mono, Fira Code, monospace
- **Weights:** 400, 700
- **Sizes:** 16px
- **Line height:** 1.5
- **Letter spacing:** 0
- **Role:** Technical telemetry, code snippets, terminal traces, and HUD badges.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|
| display-hero | 88px | 1.2 | 0 | `--text-display-hero` |
| display-large | 60px | 1.1 | 0 | `--text-display-large` |
| heading-xl | 30px | 1.2 | 0 | `--text-heading-xl` |
| heading-lg | 27px | 1.25 | 0 | `--text-heading-lg` |
| heading-md | 24px | 1.25 | 0 | `--text-heading-md` |
| heading-sm | 20px | 1.25 | 0 | `--text-heading-sm` |
| body-lg | 16px | 2 | 0 | `--text-body-lg` |
| body-strong | 16px | 1.5 | 0 | `--text-body-strong` |
| body-md | 16px | 1.5 | 0 | `--text-body-md` |
| eyebrow | 15px | 1.4 | 0 | `--text-eyebrow` |
| button-cap | 14px | 1.14 | 0.2px | `--text-button-cap` |
| button-cap-light | 14px | 1.29 | 0.2px | `--text-button-cap-light` |
| caption | 14px | 1.43 | 0 | `--text-caption` |
| micro-cap | 10px | 1.8 | 0.25px | `--text-micro-cap` |
| code | 16px | 1.5 | 0 | `--text-code` |
| code-strong | 16px | 1.5 | 0 | `--text-code-strong` |

## Tokens — Spacing & Shapes

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| xxs | 2px | `--spacing-xxs` |
| xs | 4px | `--spacing-xs` |
| sm | 8px | `--spacing-sm` |
| md | 12px | `--spacing-md` |
| lg | 16px | `--spacing-lg` |
| xl | 24px | `--spacing-xl` |
| xxl | 32px | `--spacing-xxl` |
| section | 96px | `--spacing-section` |

### Border Radius

| Name | Value | Token |
|---|---|---|
| xs | 4px | `--radius-xs` |
| sm | 6px | `--radius-sm` |
| md | 8px | `--radius-md` |
| lg | 10px | `--radius-lg` |
| xl | 12px | `--radius-xl` |
| xxl | 18px | `--radius-xxl` |
| full | 9999px | `--radius-full` |

### Layout

- **Section gap:** 96px
- **Card padding:** 16px (compact) / 32px (feature & spotlight cards)
- **Element gap:** 12px
- **Max content width:** 1200px

## Components

### button primary
**Role:** primary action button on light surfaces

- **backgroundColor:** `{colors.primary}` (`#0a0d24`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `12px 16px`

### button primary pressed
**Role:** active/pressed state for primary button

- **backgroundColor:** `{colors.surface-press-stronger}` (`#e6e8f2`)
- **textColor:** `{colors.ink-press}` (`#0e122e`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `12px 16px`

### button inverted
**Role:** primary high-contrast action button on dark surfaces

- **backgroundColor:** `{colors.on-primary}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `12px 16px`

### button inverted pressed
**Role:** active/pressed state for inverted button

- **backgroundColor:** `{colors.surface-press-light}` (`#eff0f7`)
- **textColor:** `{colors.ink-press}` (`#0e122e`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `12px 16px`

### button ghost on dark
**Role:** low-emphasis utility action on dark surfaces

- **backgroundColor:** `{colors.on-dark-faint}` (`#282f59`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.xl}` (`12px`)
- **padding:** `8px`

### button indigo token
**Role:** secondary mid-tone action button on dark surfaces

- **backgroundColor:** `{colors.accent-indigo-mid}` (`#586094`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.button-cap-light}`
- **rounded:** `{rounded.xl}` (`12px`)
- **padding:** `8px 16px`

### button disabled
**Role:** non-interactive disabled button state

- **backgroundColor:** `{colors.hairline-cloud}` (`#e5e7eb`)
- **textColor:** `{colors.on-dark-muted}` (`#b6bddb`)
- **typography:** `{typography.button-cap}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `12px 16px`

### pill neutral dark
**Role:** eyebrow status badge and metadata tag on dark surfaces

- **backgroundColor:** `{colors.surface-night}` (`#0a0d24`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.caption}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `4px 8px`

### chip cyan keyword
**Role:** inline display-scale neon highlight chip for hero keywords (`13.2:1` AAA contrast)

- **backgroundColor:** `{colors.accent-cyan}` (`#00f5d4`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.display-hero}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `0 12px`

### text input
**Role:** standard text input control

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.sm}` (`6px`)
- **padding:** `8px 12px`

### text input focused
**Role:** focused text input control with laser-cyan ring (`--color-ring-focus`)

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.sm}` (`6px`)
- **padding:** `8px 12px`

### select indigo
**Role:** dark-mode custom select dropdown on spotlight surface

- **backgroundColor:** `{colors.accent-indigo-deep}` (`#24208f`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `8px 16px`

### card pricing
**Role:** standard editorial or project card on light canvas

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.xl}` (`12px`)
- **padding:** `32px`

### card pricing featured
**Role:** high-contrast nocturnal card anchored inside a light canvas section

- **backgroundColor:** `{colors.surface-night}` (`#0a0d24`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.xl}` (`12px`)
- **padding:** `32px`

### card feature dark
**Role:** standard bento and content card on dark surfaces

- **backgroundColor:** `{colors.ink-deep}` (`#111638`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.body-lg}`
- **rounded:** `{rounded.xxl}` (`18px`)
- **padding:** `32px`

### card spotlight indigo
**Role:** saturated electric-indigo bento card for primary highlights and callouts

- **backgroundColor:** `{colors.accent-indigo-deep}` (`#24208f`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.body-lg}`
- **rounded:** `{rounded.xxl}` (`18px`)
- **padding:** `32px`

### code block
**Role:** terminal, telemetry, and syntax container

- **backgroundColor:** `{colors.surface-night}` (`#0a0d24`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.code}`
- **rounded:** `{rounded.md}` (`8px`)
- **padding:** `16px`

### link on dark
**Role:** inline text link on nocturnal surfaces

- **backgroundColor:** `{colors.surface-canvas-dark}` (`#111638`)
- **textColor:** `{colors.on-primary}` (`#ffffff`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `0px`

### link on light
**Role:** inline text link on white surfaces

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `0px`

### nav bar light
**Role:** top global navigation bar

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.body-md}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `16px 24px`

### footer light
**Role:** global footer surface

- **backgroundColor:** `{colors.surface-canvas-light}` (`#ffffff`)
- **textColor:** `{colors.ink-deep}` (`#111638`)
- **typography:** `{typography.caption}`
- **rounded:** `{rounded.xs}` (`4px`)
- **padding:** `32px 24px`

## Do's and Don'ts

### Do

- Use `--color-primary` (`#0a0d24`) for primary button interactions on light surfaces and deep terminal containers.
- Keep main dark sections anchored to `--color-surface-canvas-dark` (`#111638`), preserving its 53% indigo saturation so neon accents pop against rich midnight ink rather than flat gray.
- Use `--color-accent-cyan` (`#00f5d4`) for hero keyword chips (`chip cyan keyword`) with `--color-ink-deep` (`#111638`) text to maintain `13.2:1` AAA contrast.
- Pair `--color-accent-cyan` (`#00f5d4`) with `--color-accent-magenta` (`#ff2e93`) for telemetry spans, status badges, and synthwave dual-neon highlights.
- Preserve every documented typography style's size, line height, and letter spacing.

### Don't

- Do not introduce arbitrary un-tinted grays (`#111111`, `#222222`) that break the unified `232°` cyber-indigo hue family.
- Do not use `--color-accent-magenta` (`#ff2e93`) as a background for long body text; reserve it for badges, telemetry bars, and micro-accents.
- Do not replace `--color-ink-deep` (`#111638`) with pure black on light surfaces.
- Do not flatten the saturation contrast between `--color-accent-indigo-deep` (`#24208f`, high-saturation spotlight) and `--color-accent-indigo-mid` (`#586094`, muted token button).

## Layout

Use the documented spacing scale (`--spacing-section: 96px`, `--max-width: 1200px`) and component geometry as the implementation baseline. Alternate rhythmically between `--color-surface-canvas-dark` (`#111638`), `--color-surface-night` (`#0a0d24`), and `--color-surface-canvas-light` (`#ffffff`) to maintain high visual tension across the page.

