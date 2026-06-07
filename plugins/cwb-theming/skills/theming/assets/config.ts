// Central theme configuration — the single source of truth for your colors.
//
// `system` tokens are semantic (what a color is FOR, not what it looks like).
// Each one is either:
//   "native"  -> resolved from the OS: iOS system labels/backgrounds and
//                Android Material You dynamic colors (see colors.ts).
//   "#RRGGBB" -> a fixed hex value you control on every platform.
//
// Start with "native" everywhere: you get correct light/dark + Material You for
// free, and you only override the tokens you actually want to brand.

export type HexColor = `#${string}`;

// A brand color is either one hex (same in light and dark) or a per-mode pair.
export type BrandColor = HexColor | { light: HexColor; dark: HexColor };

type SystemColorKey =
  | "background"
  | "secondaryBackground"
  | "text"
  | "secondaryText"
  | "separator"
  | "link";

type ThemeConfig = {
  system: Record<SystemColorKey, "native" | HexColor>;
  brand: {
    primary: BrandColor;
    onPrimary: BrandColor;
    accent: BrandColor;
    onAccent: BrandColor;
    /**
     * On Android, resolve brand tokens from Material You dynamic colors instead
     * of the hex values above. Set to false to always use your hex brand.
     */
    useAndroidDynamic: boolean;
  };
};

export const themeConfig: ThemeConfig = {
  system: {
    background: "native",
    secondaryBackground: "native",
    text: "native",
    secondaryText: "native",
    separator: "native",
    link: "native",
  },
  brand: {
    primary: { light: "#0A7EA4", dark: "#4FC3F7" },
    onPrimary: "#FFFFFF",
    accent: { light: "#0A7EA4", dark: "#4FC3F7" },
    onAccent: "#FFFFFF",
    useAndroidDynamic: true,
  },
};
