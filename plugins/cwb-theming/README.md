# Expo Unified Theming Plugin

One color system for iOS and Android in an Expo Router app. Semantic tokens that
resolve to native iOS colors and Android Material You dynamic colors, flip with
dark/light automatically, and are read through a single `useColors()` hook.

This is the theming pattern from the [Platano](https://cwb.sh/platano) template,
packaged to drop into any Expo Router project.

## What This Plugin Does

- **Unifies colors across platforms** — semantic tokens (`background`, `text`,
  `secondaryText`, `separator`, `link`, ...) resolve to iOS system labels and
  Android Material You dynamic colors, or to hex values you pin.
- **Handles dark/light re-rendering** — wires `useColorScheme()` so the whole
  tree recomputes colors when the user toggles the theme.
- **Brand colors** — primary/accent with optional Android Material You dynamic.
- **React Navigation theming** — sets `getNavigationTheme(dark)` so headers, tab
  bars, and the default background match your tokens.
- **A `useColors()` / `useTheme()` context hook** — built on React's `use`, so
  components read the theme directly instead of resolving it themselves.
- **Adds a theme context if you don't have one**, and edits your root
  `_layout.tsx` surgically without clobbering existing providers.

## When to Use

- You're setting up theming or dark mode in an Expo / React Native app
- You want native iOS + Android Material You (dynamic) colors from one set of names
- You're tired of branching on `Platform.OS` for colors all over the app
- You want a `useColors()` / `useTheme()` hook backed by a context
- You're following the "Expo UI on Android" lesson and want Platano-style theming

## What Gets Created

```
theme/
  config.ts         # single source of truth: system tokens + brand colors
  colors.ts         # resolvers + hooks + getNavigationTheme
  ThemeContext.tsx  # ColorsProvider + useColors() / useTheme() / useBrand()
```

Plus a wiring edit to `app/_layout.tsx` (or `src/app/_layout.tsx`).

## Usage

```tsx
import { useColors, useBrand } from "@/theme/ThemeContext";

const { background, text } = useColors();
const { primary } = useBrand();
```

Change any color in `theme/config.ts`. Set a token to `"native"` to follow the
OS, or to a hex to pin it everywhere.

## Requirements

- An Expo Router app (TypeScript)
- **Expo SDK 56+** for the `Color` API and the `expo-router/react-navigation`
  re-exports. On older SDKs, import the navigation theme from
  `@react-navigation/native` and use hex tokens instead of `"native"`.

## License

MIT
