# Ship Plugin

Scaffold production-ready React Native apps from [Code with Beto](https://codewithbeto.dev) templates using the `@codewithbeto/ship` CLI.

## What This Plugin Does

- **Scaffolds a complete React Native Expo app** from a battle-tested template in one command
- **Configures app identity** — app name, bundle ID, slug, and EAS project settings
- **Sets up RevenueCat payments** out of the box (opt-out with `--no-payments`)
- **Installs dependencies and initializes git** so you can start coding immediately
- **Works non-interactively** — perfect for AI agents (the interactive TUI requires a real terminal)

## When to Use

- You want to ship a revenue-ready AI image app this weekend
- You need a production-quality React Native starter with payments built in
- You're scaffolding a new project from the Platano template
- You want to skip boilerplate and jump straight to building features

## Quick Start

```bash
bunx @codewithbeto/ship --name my-app
```

## Flags

| Flag | Required | Default |
|------|----------|---------|
| `--name <dir>` | Yes | — |
| `--template <name>` | No | `platano` |
| `--app-name <name>` | No | title-cased `--name` |
| `--bundle-id <id>` | No | `com.<user>.<slug>` |
| `--payments` / `--no-payments` | No | `--payments` |
| `--rc-key-ios <key>` | No | — |
| `--rc-key-android <key>` | No | same as iOS key |
| `--dry-run` | No | — |

## Requirements

- [Bun](https://bun.sh/) runtime installed
- Pro access to the Platano template — get it at [cwb.sh/platano](https://cwb.sh/platano)

## Links

- Course & Pro access: https://cwb.sh/rn
- Platano landing page: https://cwb.sh/platano
- YouTube: https://cwb.sh/youtube
- Discord: https://cwb.sh/discord
- Newsletter: https://cwb.sh/newsletter

## License

MIT
