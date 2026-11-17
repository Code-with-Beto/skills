# Code with Beto Public Skills

Ten skills for people building their own mobile apps. Use them with an idea, screenshots, or your own code. The pack works independently of Code with Beto accounts, templates, and MCP.

| Skill | Ask for |
| --- | --- |
| `cwb-ship-coach` | A workable first version, stack choice, and build milestones |
| `cwb-onboarding` | A shorter path from first launch to the first useful result |
| `cwb-mobile-ui` | A review or improvement of one mobile screen or interaction |
| `theming` | Consistent light and dark colors across the UI and navigation |
| `cwb-local-first` | Offline data, migrations, and tests for data recovery |
| `cwb-ai-image-flow` | A reliable flow from image input to a useful result |
| `cwb-monetization` | Paywall, purchase, access, and restoration flows |
| `app-icon` | An icon brief, platform assets, and integration checks |
| `local-build` | A local iOS or Android build you can install and test |
| `cwb-app-launch` | A beta or store release readiness check |

## Install the public pack

### Codex

```sh
codex plugin marketplace add Code-with-Beto/skills
codex plugin add code-with-beto@code-with-beto
```

### Claude Code

```text
/plugin marketplace add Code-with-Beto/skills
/plugin install code-with-beto@cwb-plugins
```

### Other skill-compatible agents

```sh
npx skills add Code-with-Beto/skills
```

You can also download the ZIP from the [latest GitHub release](https://github.com/Code-with-Beto/skills/releases/latest).

### Switching from an earlier version

Refresh the Code with Beto marketplace, then install the `code-with-beto` plugin. If you already added the marketplace in Codex, run `codex plugin marketplace upgrade code-with-beto`. In Claude Code, run `/plugin marketplace update cwb-plugins`. The `app-icon`, `local-build`, and `theming` skills are included in the new pack. Remove obsolete individual plugin installations if your agent still shows them.

## Pro skills

Project-specific skills are available through [your Code with Beto profile](https://codewithbeto.dev/profile) with Pro Lifetime Access. Open **Pro Skills** to download `ship` for Platano.

The public pack works with your own idea or project. Some workflows, such as builds and image generation, can use a platform toolchain or your choice of external service.

## License

MIT. See [LICENSE](LICENSE).
