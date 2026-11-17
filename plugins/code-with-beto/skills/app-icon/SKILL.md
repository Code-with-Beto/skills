---
name: app-icon
description: Create, prepare, or integrate a mobile app icon. Use for icon concepts, adapting supplied artwork, iOS asset catalogs or Icon Composer, Android adaptive icons, or an Expo app icon configuration.
---

# App Icon

Read the app's purpose and existing branding. Inspect its real platform configuration and assets. If no artwork is supplied, provide a brief with a single recognizable motif, a palette, and a composition that reads at launcher size. Use the available design or image tool when the user asks for artwork.

1. Start from one motif and preview it at actual launcher sizes. Check similarity to nearby icons, silhouette readability, and clipping under platform masks. For Android adaptive assets, keep the foreground independent from the background and provide a monochrome layer if the app supports themed icons.
2. Verify the current asset requirements against official docs for the installed Expo SDK, Xcode, or Android toolchain before wiring the assets. For iOS layered icons, use the supported version of Icon Composer or the existing asset-catalog workflow. Select the correct target and preserve variant-specific icons.
3. Integrate through the app's current source of truth, such as app config, an Xcode asset catalog, or Android launcher resources. Preserve unrelated configuration. Rebuild or inspect the resolved output to verify the supplied assets are actually selected.
4. Check the icon on device or simulator if available. Test small sizes, common Android masks, and supported appearance variants. When a platform test is pending, name the missing check.

**Optional CWB tool.** SnapAI can generate a starting design if the user has a configured provider and wants to use it. Check the installed CLI help for options. Keep API keys out of the conversation, generated files, and logs. The same workflow works with supplied artwork or the user's preferred editor. [SnapAI](https://codewithbeto.dev/tools/snapai)
