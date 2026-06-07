// Resolves the semantic tokens from config.ts into real colors, per platform,
// and keeps them reactive to dark/light changes.
//
// The whole point of this file is to UNIFY one set of names (background, text,
// link, ...) across iOS and Android so the rest of your app never reaches for
// `Color.ios.*` or `Color.android.dynamic.*` directly.

import { Color } from "expo-router";
// Expo SDK 56+. On older SDKs, import these from "@react-navigation/native".
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from "expo-router/react-navigation";
import { type ColorValue, Platform, useColorScheme } from "react-native";

import { type BrandColor, themeConfig } from "./config";

type SystemColorKey = keyof typeof themeConfig.system;
export type SystemColors = { [K in SystemColorKey]: string };

// The native palette per platform. iOS uses system labels/backgrounds; Android
// uses Material You dynamic tokens (they recolor with the user's wallpaper).
// `default` is the web/fallback palette for anything that isn't iOS or Android.
function getNativeDefault(key: SystemColorKey): ColorValue {
  const defaults: Record<SystemColorKey, ColorValue> = Platform.select({
    ios: {
      background: Color.ios.systemBackground,
      secondaryBackground: Color.ios.secondarySystemBackground,
      text: Color.ios.label,
      secondaryText: Color.ios.secondaryLabel,
      separator: Color.ios.separator,
      link: Color.ios.link,
    },
    android: {
      background: Color.android.dynamic.surfaceContainerHighest,
      secondaryBackground: Color.android.dynamic.surfaceContainer,
      text: Color.android.dynamic.onSurface,
      secondaryText: Color.android.dynamic.onSurfaceVariant,
      separator: Color.android.dynamic.outlineVariant,
      link: Color.android.dynamic.primary,
    },
    default: {
      background: "#FFFFFF",
      secondaryBackground: "#F2F2F7",
      text: "#000000",
      secondaryText: "#666666",
      separator: "#E0E0E0",
      link: "#007AFF",
    },
  })!;
  return defaults[key];
}

// Non-hook accessor. Use this outside React (toasts, navigation theme, etc.).
export function getSystemColor(key: SystemColorKey): ColorValue {
  const value = themeConfig.system[key];
  return value === "native" ? getNativeDefault(key) : value;
}

// We accept colorScheme even though we don't read it: passing it makes the
// dark/light value an explicit dependency, so the React Compiler (and plain
// React) recompute these colors when the user flips the theme. Without this,
// a memoized result would hand back stale colors after a toggle.
function resolveSystemColors(
  _colorScheme: string | null | undefined,
): SystemColors {
  return {
    background: getSystemColor("background") as string,
    secondaryBackground: getSystemColor("secondaryBackground") as string,
    text: getSystemColor("text") as string,
    secondaryText: getSystemColor("secondaryText") as string,
    separator: getSystemColor("separator") as string,
    link: getSystemColor("link") as string,
  };
}

// All system colors, reactive to dark/light. Safe with the React Compiler —
// just call it and destructure what you need.
export function useSystemColors(): SystemColors {
  const colorScheme = useColorScheme();
  return resolveSystemColors(colorScheme);
}

// ---------------------------------------------------------------------------
// Brand colors — your accent/primary. On Android, Material You dynamic colors
// can replace your hex brand when `brand.useAndroidDynamic` is true (default).
// ---------------------------------------------------------------------------

export const isAndroidDynamic =
  Platform.OS === "android" && themeConfig.brand.useAndroidDynamic !== false;

export type ResolvedBrand = {
  primary: string;
  onPrimary: string;
  accent: string;
  onAccent: string;
};

function getAndroidDynamicBrand(
  _colorScheme: string | null | undefined,
): ResolvedBrand {
  return {
    primary: Color.android.dynamic.primary as unknown as string,
    onPrimary: Color.android.dynamic.onPrimary as unknown as string,
    accent: Color.android.dynamic.secondary as unknown as string,
    onAccent: Color.android.dynamic.onSecondary as unknown as string,
  };
}

export function resolveBrandColor(value: BrandColor, dark: boolean): string {
  return typeof value === "string" ? value : dark ? value.dark : value.light;
}

export function getBrandColors(dark: boolean): ResolvedBrand {
  if (isAndroidDynamic) return getAndroidDynamicBrand(dark ? "dark" : "light");
  const b = themeConfig.brand;
  return {
    primary: resolveBrandColor(b.primary, dark),
    onPrimary: resolveBrandColor(b.onPrimary, dark),
    accent: resolveBrandColor(b.accent, dark),
    onAccent: resolveBrandColor(b.onAccent, dark),
  };
}

export function useBrandColors(): ResolvedBrand {
  const colorScheme = useColorScheme();
  if (isAndroidDynamic) return getAndroidDynamicBrand(colorScheme);
  return getBrandColors(colorScheme === "dark");
}

// Feeds the unified colors into React Navigation so headers, tab bars, and the
// default screen background match the rest of the app.
export function getNavigationTheme(
  dark: boolean,
  primaryOverride?: string,
): Theme {
  const base = dark ? DarkTheme : DefaultTheme;
  const primary = primaryOverride ?? getBrandColors(dark).primary;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary,
      background: getSystemColor("background") as string,
      card: getSystemColor("secondaryBackground") as string,
      text: getSystemColor("text") as string,
      border: getSystemColor("separator") as string,
      notification: primary,
    },
  };
}
