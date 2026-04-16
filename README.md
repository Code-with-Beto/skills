# Code with Beto Skills

Professional agent skills and plugins to help mobile developers ship better apps faster with AI assistance.

## Overview

This repository contains a curated collection of Claude agent skills designed specifically for React Native and Expo developers. Each skill automates complex workflows, follows best practices, and helps you build production-ready mobile apps with confidence.

## Available Plugins

### 🎨 App Icon Plugin

AI-powered app icon generation with full iOS 26 Liquid Glass support and Android adaptive icons.

**Features:**

- Generate professional app icons using AI (powered by OpenAI via SnapAI CLI)
- Full iOS 26 `.icon` folder format with Liquid Glass effect support
- Android adaptive icons with Material You theming integration
- Automatic `app.json` configuration for both platforms
- Multiple style options: minimalism, glassy, gradient, neon, material, and more
- Transparent backgrounds for better platform integration

**Use cases:**

- Starting a new Expo app and need an icon quickly
- Updating existing app icons with fresh designs
- Need proper iOS 26 and Android 13+ support
- Iterate on multiple icon concepts rapidly

[View full documentation →](plugins/cwb-app-icon/README.md)

### 🚀 Ship Plugin

Scaffold production-ready React Native apps from Code with Beto templates using the `@codewithbeto/ship` CLI.

**Features:**

- One-command project scaffolding with `bunx @codewithbeto/ship`
- Pre-configured RevenueCat payments integration
- Automatic app name, bundle ID, and slug configuration
- Dependency installation and git initialization out of the box
- Non-interactive flag-based mode for AI agent compatibility

**Use cases:**

- Ship a revenue-ready AI image app this weekend
- Skip boilerplate and start building features immediately
- Scaffold from the battle-tested Platano template
- Automate project creation in CI or with AI agents

[View full documentation →](plugins/cwb-ship/README.md)

### 🛠 Local Build Plugin

Generate release `.apk` and simulator `.app` artifacts for your Expo project using `gradlew` and `xcodebuild` directly, no EAS required.

**Features:**

- Reads your `app.config.ts` / `app.json` to pull app name, slug, scheme, and bundle identifier
- Verifies the iOS scheme on disk so the build command matches what Xcode generated
- Writes `scripts/build-android.sh` and `scripts/build-ios.sh` with your real values baked in
- Copies each artifact into `builds/` (replacing the previous one) for predictable install paths
- Defaults to **Release** to avoid the `expo-dev-client` launcher screen

**Use cases:**

- Producing APKs and `.app` bundles for e2e tests (Maestro, Detox)
- Sharing a real build with a teammate without spinning up a dev server
- Iterating on a local device or simulator without waiting on remote builds

[View full documentation →](plugins/cwb-local-build/README.md)

## Installation

Install all Code with Beto skills with a single command:

```bash
npx skills add code-with-beto/skills
```

Or install individual plugins:

```bash
npx skills add code-with-beto/skills/plugins/cwb-app-icon
npx skills add code-with-beto/skills/plugins/cwb-ship
npx skills add code-with-beto/skills/plugins/cwb-local-build
```

## Requirements

- Node.js 16+
- npm or npx
- Expo CLI (for app icon plugin)
- OpenAI API key (for AI-powered icon generation)
- [Bun](https://bun.sh/) runtime (for ship plugin)

## How It Works

These skills integrate with Claude Code to provide contextual, automated workflows. When you describe what you need, Claude will:

1. Detect which skill is relevant to your task
2. Execute the appropriate workflow automatically
3. Handle configuration, file generation, and setup
4. Provide clear instructions for testing and next steps

No manual configuration needed - just describe what you want to build.

## Why Use These Skills?

- **Save Time:** Automate repetitive mobile dev tasks that normally take hours
- **Best Practices:** Built-in knowledge of iOS and Android platform requirements
- **Stay Current:** Updated for the latest platform features (iOS 26, Android 13+)
- **Learn by Doing:** Each skill explains what it's doing and why
- **Battle-Tested:** Used by Code with Beto students building production apps

## Support

- 📚 Learn React Native & Expo: [codewithbeto.dev](https://codewithbeto.dev)
- 💬 Questions or issues? [Open an issue](https://github.com/code-with-beto/skills/issues)
- 🐦 Follow updates: [@codewithbeto](https://x.com/betomoedano)

## Contributing

Contributions welcome! If you have ideas for new skills or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description

## License

MIT - feel free to use in personal and commercial projects.

---

Made with ❤️ for the mobile dev community by [Code with Beto](https://codewithbeto.dev)
