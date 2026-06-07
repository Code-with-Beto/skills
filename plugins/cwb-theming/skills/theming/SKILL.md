---
name: theming
description: Scaffold a unified, cross-platform color theme system into an Expo Router app. Sets up semantic system colors (resolved from native iOS labels and Android Material You dynamic colors), brand colors, automatic dark/light re-rendering, the React Navigation ThemeProvider, and a useColors() / useTheme() context hook. Use whenever a user wants to set up theming, dark mode, dynamic or Material You colors, a unified color system, or a useColors/useTheme hook in an Expo / React Native app, even if they do not name a specific approach.
---

# Expo Unified Theming

Set up one color system that works on iOS and Android at once. Instead of
sprinkling `Color.ios.*` and `Color.android.dynamic.*` (or hardcoded hex) all
over the app, the user gets semantic tokens (`background`, `text`, `link`, ...)
that resolve to the right native color per platform, flip with dark/light
automatically, and are read through a single `useColors()` hook.

This is the pattern from the **Platano** template, packaged so it drops into any
Expo Router app.

## What gets installed

Three files (bundled in `assets/`, adapt them to the project):

- `config.ts` — the single source of truth. Semantic system tokens set to
  `"native"` or a hex, plus brand colors. This is the only file the user edits
  day to day.
- `colors.ts` — resolves tokens to real colors per platform, exposes
  `getSystemColor`, `useSystemColors`, the brand helpers, and
  `getNavigationTheme`.
- `ThemeContext.tsx` — `ColorsProvider` + the `useColors()` / `useTheme()` /
  `useBrand()` hooks built on React's `use`.

Plus a small edit to the root `_layout.tsx` to wire the providers.

## The two ideas that make this work

Explain these to the user, because they are the whole point and the two things
people get wrong:

1. **Re-render on theme change.** Native and Material You colors are platform
   color objects, not strings React can diff. The signal that the theme changed
   is `useColorScheme()`. So the resolvers take the color scheme as an argument
   even when they do not read it: that makes dark/light an explicit dependency,
   and the value recomputes when the user toggles. The `ColorsProvider` reads
   `useColorScheme()` once near the root, so a toggle re-renders every consumer.

2. **Two ThemeProviders, different jobs.** `ColorsProvider` (this skill) feeds
   `useColors()` to your components. The navigation `ThemeProvider` themes the
   navigation chrome (headers, tab bars, default background). Both live at the
   root. Wire navigation's with `getNavigationTheme(dark)` so the chrome matches
   your tokens. Do not confuse them or drop one. On **Expo SDK 56+** the
   navigation theme bits (`ThemeProvider`, `DarkTheme`, `DefaultTheme`, `Theme`)
   import from `expo-router/react-navigation`; on **older SDKs** they come from
   `@react-navigation/native` instead (see Step 1).

## Step 1: Confirm the project, SDK, and the native Color API

This skill targets **Expo Router** apps on **Expo SDK 56 or newer**. SDK 56 is
where the `Color` API (iOS system colors + Android Material You) and the
`expo-router/react-navigation` re-exports the templates use both ship. Check the
SDK and the `Color` API before relying on `"native"` tokens.

```bash
# Find the project's app dir and root layout (root-level or under src/)
ls app/_layout.tsx src/app/_layout.tsx 2>/dev/null

# Check the installed Expo SDK major version
node -e "console.log('expo', require('expo/package.json').version)" 2>/dev/null

# Confirm expo-router exports the Color API
node -e "console.log('Color export:', !!require('expo-router').Color)" 2>/dev/null
grep -rl "android.dynamic\|ios.systemBackground" node_modules/expo-router/build 2>/dev/null | head -1
```

Branch on what you find:

- **SDK 56+ (target):** use the templates as written. Navigation theme bits
  import from `expo-router/react-navigation`.
- **Older than SDK 56:** two adjustments are needed.
  1. Import `ThemeProvider`, `DarkTheme`, `DefaultTheme`, and `type Theme` from
     `@react-navigation/native` instead of `expo-router/react-navigation` — in
     both `colors.ts` and `_layout.tsx`. (Older Expo Router did not re-export
     them, so you go to React Navigation directly.)
  2. The `Color` API likely is not present. Either recommend upgrading to SDK 56,
     or use the **hex fallback**: keep the files but set the `system` tokens in
     `config.ts` to hex values instead of `"native"` (no Material You, but
     everything else works). `getBrandColors` still works; `isAndroidDynamic`
     resolves to false without `Color`.

Also detect the project's import alias from `tsconfig.json` (commonly `@/*` →
`src/*` or the project root). Match that alias when you write imports. If there
is no alias, use relative paths.

## Step 2: Decide where the files live

Put the three files together in one folder so their relative imports
(`./config`, `./colors`) just work. Mirror the project's layout:

- App under `src/app/` → create `src/theme/`.
- App at the root `app/` → create `theme/` at the root.

Check for an existing theme/colors module or a `ThemeProvider` first. If the app
already has theming, do **not** clobber it. Read what is there, explain the
overlap to the user, and either merge into their setup or place these files
under a clearly named folder and let them migrate. Never blindly overwrite.

## Step 3: Create the files

Copy the three bundled templates into the chosen folder, adapting:

- import aliases / relative paths to match the project,
- the `system` tokens and `brand` colors in `config.ts` to the user's brand (ask
  for their brand primary/accent, or keep the sensible defaults and tell them
  where to change them).

Read each asset and write it into the project (do not just symlink — these are
the user's files now):

- `assets/config.ts` → `<theme>/config.ts`
- `assets/colors.ts` → `<theme>/colors.ts`
- `assets/ThemeContext.tsx` → `<theme>/ThemeContext.tsx`

Keep the comments. They explain the re-render trick and the brand/dynamic
behavior, which is exactly what a learner needs in their own codebase.

## Step 4: Wire the root layout

Edit the existing `_layout.tsx` **surgically** — keep every provider, screen,
and option already there. The target shape wraps the tree in `ColorsProvider`
and themes navigation from an inner component that reads the color scheme:

```tsx
// SDK 56+: from "expo-router/react-navigation". Older SDKs: "@react-navigation/native".
import { ThemeProvider } from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { getBrandColors, getNavigationTheme } from "@/theme/colors";
import { ColorsProvider } from "@/theme/ThemeContext";

export default function RootLayout() {
  return (
    <ColorsProvider>
      {/* keep any existing providers (QueryClient, RevenueCat, gestures...) here */}
      <RootLayoutInner />
    </ColorsProvider>
  );
}

function RootLayoutInner() {
  const dark = useColorScheme() === "dark";
  const { primary } = getBrandColors(dark);

  return (
    <>
      <ThemeProvider value={getNavigationTheme(dark, primary)}>
        {/* keep the project's existing <Stack> / screens exactly as they were */}
        <Stack />
      </ThemeProvider>
      <StatusBar style={dark ? "light" : "dark"} />
    </>
  );
}
```

Integration rules:

- `ColorsProvider` must sit **above** anything that calls `useColors()`. Putting
  it at or near the top of `RootLayout` is safest.
- If the file is already split into `RootLayout` + an inner component, add the
  `ThemeProvider` and `useColorScheme()` there instead of creating a new inner
  component.
- If `expo-status-bar` is not installed and the project does not already manage
  the status bar, you can skip the `StatusBar` line.

## Step 5: Verify

- Typecheck if available: `npx tsc --noEmit` (expect no new errors from the
  three files; the most common issue is a wrong import alias).
- Tell the user to run the app, then toggle the OS appearance (or the simulator
  dark/light) and confirm colors and the navigation chrome update live. On a
  physical Android device, changing the wallpaper should shift the Material You
  palette.

## Step 6: Show how to use it

Give the user a short usage snippet (and offer to drop a themed example into one
screen if they want to see it immediately):

```tsx
import { View, Text } from "react-native";
import { useColors, useBrand } from "@/theme/ThemeContext";

export function Example() {
  const { background, text, secondaryText, separator } = useColors();
  const { primary } = useBrand();

  return (
    <View style={{ flex: 1, backgroundColor: background, padding: 16 }}>
      <Text style={{ color: text, fontSize: 20, fontWeight: "600" }}>
        Unified theming
      </Text>
      <Text style={{ color: secondaryText }}>
        Same tokens on iOS and Android.
      </Text>
      <View style={{ height: 1, backgroundColor: separator, marginVertical: 12 }} />
      <Text style={{ color: primary }}>Brand accent</Text>
    </View>
  );
}
```

Outside React (a toast, a one-off style), use the non-hook accessor:

```ts
import { getSystemColor } from "@/theme/colors";
const card = getSystemColor("secondaryBackground") as string;
```

## Customizing

- **Change a color everywhere:** edit `config.ts`. Set a token to a hex to pin
  it, or back to `"native"` to follow the OS.
- **Turn off Material You** for brand on Android: set
  `brand.useAndroidDynamic: false` and the hex brand applies on all platforms.
- **Add a token:** add it to `system` in `config.ts`, then add its iOS / Android
  / default entries in `getNativeDefault` and a line in `resolveSystemColors`
  inside `colors.ts`. TypeScript will point out anything you miss.

## Notes

- This installs colors and brand only. It deliberately does not add spacing or
  radius presets or persistence; keep it focused unless the user asks.
- The files become the user's code. Encourage them to read the comments and tweak
  rather than treat it as a black box. That is the teaching goal of the lesson
  this skill ships with.
