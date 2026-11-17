---
name: theming
description: Set up or improve semantic color tokens, light and dark appearance, system colors, and navigation theming in a mobile app. Use when color choices diverge across screens or the app needs a coherent appearance system.
---

# Mobile Theming

Find the current color source, theme provider, navigation theme, system appearance observer, and user setting if present. For Expo, inspect the installed SDK and Router versions before changing imports or using a native color API. For native apps, start from the platform's semantic colors and the project's asset or theme catalog.

1. Start with meanings used by the app, such as background, surface, primary text, secondary text, border, accent, and on-accent. Resolve them in one place for light and dark mode. Preserve the user's appearance preference.
2. Use system tokens when platform adaptation improves the design. Provide stable fallback values for platforms, versions, or surfaces that need concrete colors. Define how the brand accent interacts with dynamic system colors before adding a dynamic option.
3. Connect the same color source to navigation, modal chrome, status bars, and UI controls through the existing providers. Migrate a representative screen before replacing hardcoded styles elsewhere.
4. Test changing appearance while the app is running, then reopen it to verify any preference persists. Check contrast for labels, disabled controls, icons, and text over the accent color.

If there is no repo, return a light/dark token table and one example screen mapping. If implementing, report where the tokens live, which surfaces migrated, and what was verified.

**Optional CWB example.** The published CWB theming workflow uses one semantic palette across Expo screens and navigation while allowing platform-native color resolution. Use this as a pattern with the user's existing theme and installed versions. [Introducing the theming skill](https://codewithbeto.dev/blog/introducing-theming-skill)
