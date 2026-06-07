// A context + hook so any component can read the resolved theme without each
// one calling useColorScheme() and the resolvers itself.
//
// The provider sits near the root. It reads useColorScheme() once, so when the
// OS theme flips, the provider re-renders and every consumer of useColors() /
// useTheme() gets fresh values automatically.

import { createContext, type ReactNode, use } from "react";
import { useColorScheme } from "react-native";

import {
  getBrandColors,
  type ResolvedBrand,
  type SystemColors,
  useSystemColors,
} from "./colors";

type ThemeValue = {
  colors: SystemColors;
  brand: ResolvedBrand;
  dark: boolean;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function ColorsProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  const colors = useSystemColors(); // reactive to dark/light
  const brand = getBrandColors(dark);

  return (
    <ThemeContext.Provider value={{ colors, brand, dark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Full theme: colors + brand + the dark flag.
export function useTheme(): ThemeValue {
  const value = use(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within a <ColorsProvider>");
  }
  return value;
}

// Convenience for the common case. Destructure what you need:
//   const { background, text } = useColors();
export function useColors(): SystemColors {
  return useTheme().colors;
}

// Convenience for brand/accent:
//   const { primary, onPrimary } = useBrand();
export function useBrand(): ResolvedBrand {
  return useTheme().brand;
}
