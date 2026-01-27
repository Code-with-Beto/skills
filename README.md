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

## Installation

Install all Code with Beto skills with a single command:

```bash
npx skills add cwb/skills
```

Or install individual plugins:

```bash
npx skills add cwb/skills/cwb-app-icon
```

## Requirements

- Node.js 16+
- npm or npx
- Expo CLI (for app icon plugin)
- OpenAI API key (for AI-powered features)

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
- 💬 Questions or issues? [Open an issue](https://github.com/cwb-org/skills/issues)
- 🐦 Follow updates: [@codewithbeto](https://twitter.com/codewithbeto)

## Contributing

Contributions welcome! If you have ideas for new skills or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description

## License

MIT - feel free to use in personal and commercial projects.

---

Made with ❤️ for the mobile dev community by [Code with Beto](https://codewithbeto.dev)
