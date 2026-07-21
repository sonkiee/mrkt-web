---
name: Lumina Precision
colors:
  surface: '#effcf8'
  surface-dim: '#cfddd9'
  surface-bright: '#effcf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f7f3'
  surface-container: '#e3f1ed'
  surface-container-high: '#ddebe7'
  surface-container-highest: '#d8e5e2'
  on-surface: '#121e1c'
  on-surface-variant: '#3e4947'
  inverse-surface: '#273330'
  inverse-on-surface: '#e6f4f0'
  outline: '#6e7977'
  outline-variant: '#bec9c6'
  surface-tint: '#066a61'
  primary: '#004e47'
  on-primary: '#ffffff'
  primary-container: '#00685f'
  on-primary-container: '#93e4d8'
  inverse-primary: '#85d5c9'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#d7dff9'
  on-secondary-container: '#5a6278'
  tertiary: '#742f13'
  on-tertiary: '#ffffff'
  tertiary-container: '#924628'
  on-tertiary-container: '#ffc9b6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1f1e5'
  primary-fixed-dim: '#85d5c9'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dae2fc'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3e465b'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#773215'
  background: '#effcf8'
  on-background: '#121e1c'
  surface-variant: '#d8e5e2'
  surface-background: '#F8FAFC'
  status-success: '#10B981'
  status-warning: '#F59E0B'
  status-error: '#DC2626'
  outline-subtle: rgba(109, 122, 119, 0.1)
  glass-fill: rgba(255, 255, 255, 0.8)
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-page: 1rem
  section-gap: 2rem
  gutter-grid: 1.5rem
  stack-lg: 1.5rem
  stack-md: 1rem
  stack-sm: 0.5rem
---

## Brand & Style
Lumina Precision embodies a "High-Tech Professional" aesthetic, blending the reliability of a premium hardware brand with the fluid, accessible interface of modern SaaS. The brand personality is trustworthy, efficient, and sophisticated.

The design style is **Corporate / Modern** with subtle **Glassmorphism** influences. It utilizes a "Clean-Room" aesthetic—characterized by ample whitespace, a crisp teal-centric palette, and high-quality product photography. The UI should evoke a sense of calm control, providing users with real-time clarity through systematic layouts and professional iconography.

## Colors
The palette is anchored by a deep **Deep Teal primary**, used for core actions and brand identification. This is supported by a sophisticated **Slate secondary** and a **Rust tertiary** used sparingly for warmth or specific alerts. 

The background system uses a very light cool gray (#F8FAFC) to differentiate from pure white (#FFFFFF) card surfaces. Interactive states should utilize the primary color, while status indicators (Success, Warning, Error) follow industry-standard semantic hues but are refined to match the brand's saturation levels. Use transparency (e.g., `primary/10`) for soft backgrounds on highlighted components like active info boxes or icon containers.

## Typography
The system relies exclusively on **Inter** to maintain a neutral, systematic, and utilitarian feel. Hierarchy is established through aggressive weight changes and tight letter spacing on larger headlines. 

- **Headlines:** Bold and impactful. `headline-xl` is reserved for page titles and high-level summaries.
- **Body:** Designed for readability. `body-md` is the primary workhorse for descriptions and metadata.
- **Labels:** Used for buttons, navigation, and overlines. `label-sm` frequently uses uppercase styling with increased letter spacing to denote section categories or metadata labels.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (max-width 1280px) and transitions to a fluid single-column stack on mobile. 

- **Grid System:** A 12-column grid is used for the main content area. On desktop, the layout typically splits into an 8-column primary work area and a 4-column sidebar.
- **Spacing Logic:** Vertical rhythm is maintained using a base-4 system. `section-gap` (32px) separates major modules, while `stack-md` (16px) is the standard spacing for elements within a card.
- **Responsive Behavior:** At the 1024px breakpoint, the sidebar moves below the primary content. Padding at the page edge (`margin-page`) scales from 16px on mobile to 24px on larger screens.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Soft Shadows**. 

1.  **Level 0 (Background):** #F8FAFC (Surface-background).
2.  **Level 1 (Cards/Containers):** Pure white (#FFFFFF) with a `shadow-soft` (0 4px 12px rgba(0, 0, 0, 0.04)) and a very thin 1px border using `outline-subtle`.
3.  **Level 2 (Overlays/Floating):** Use **Glassmorphism**. Components like map controls or sticky headers use a white fill at 80% opacity with a 12px backdrop blur.
4.  **Interaction Depth:** Buttons and active cards use a slightly more pronounced shadow or a 2px border when focused to indicate "lift."

## Shapes
The shape language is **Rounded**, favoring organic but structured corners that feel modern and approachable.

- **Standard Containers:** Cards and large sections use `rounded-xl` (0.75rem / 12px).
- **Interactive Elements:** Buttons and Input fields use `rounded-lg` (0.5rem / 8px).
- **Small Components:** Icons and status chips use `rounded-md` (0.25rem / 4px).
- **Full Rounded:** Progress indicators and pill-style badges use `rounded-full`.

## Components
- **Buttons:** 
  - *Primary:* Filled with `#00685f`, white text, `label-md` font. High-visibility.
  - *Secondary:* White background, `#00685f` border or text, used for less critical actions.
- **Input Fields:** 12px vertical padding, 1px `#bcc9c6` border. Focus state uses a 1px primary color ring and border.
- **Progress Stepper:** Uses a thick 4px line. Active segments in primary teal, inactive in light gray. Icons within nodes should be centered and use white for "completed" states.
- **Cards:** White background, 24px internal padding, `rounded-xl` corners. Borders should be extremely subtle (`rgba(0,0,0,0.05)`).
- **Chips/Badges:** Small, uppercase text using `label-sm`. Success states should use `#10B981` text with a 10% opacity background of the same color.
- **Iconography:** Use **Material Symbols Outlined**. Standardize on a 20px-24px size for primary interface icons, with a 'wght' of 400.