# OpenAI Plugin Directory Submission — Working Doc

Prep sheet for submitting the four CWB plugins to the public plugin directory via
**platform.openai.com/plugins**. Each plugin is a separate skills-only submission
(no MCP tab needed). Delete this file after publishing, or keep it for future releases.

## One-time prerequisites (do these first, in the OpenAI Platform)

- [ ] Verify a **developer or business identity** for the org. The identity's name,
      website, support contact, privacy policy, and terms must match what's below:
  - Name: **Code with Beto**
  - Website: **https://codewithbeto.dev**
  - Privacy: **https://codewithbeto.dev/privacy**
  - Terms: **https://codewithbeto.dev/terms**
- [ ] Make sure your account has the **Apps Management** write permission in the org.

## Shared listing info (Info tab, all four plugins)

- Developer: Code with Beto
- Category: Developer Tools
- Logo: `plugins/<name>/assets/logo.png` (1024×1024 PNG)
- Website / support: https://codewithbeto.dev
- Privacy: https://codewithbeto.dev/privacy · Terms: https://codewithbeto.dev/terms
- Skill bundle: upload the plugin's `skills/` directory (contains `SKILL.md`)
- Release notes (first submission, all plugins): "Initial public release."

---

## 1. cwb-app-icon v1.0.4

**Starter prompts** (from manifest): "Generate a new app icon for my Expo app" ·
"Update my app icon with iOS 26 Liquid Glass support"

**Positive test cases (5):**
1. Prompt: "Generate a new app icon for my Expo app" in an Expo project.
   Expected: skill triggers, generates an icon via the SnapAI CLI, and updates the
   app config to reference it.
2. Prompt: "Update my app icon with iOS 26 Liquid Glass support."
   Expected: produces the iOS 26 `.icon` folder format with Liquid Glass layers.
3. Prompt: "Add an Android adaptive icon with Material You theming."
   Expected: generates foreground/background (and monochrome) layers and wires them
   into the Android config.
4. Prompt: "Create a minimalist app icon for a meditation app."
   Expected: applies the minimalism style option when generating.
5. Prompt: "My app icon looks low-res on Android, regenerate it."
   Expected: regenerates at correct resolutions and fixes the adaptive icon config.
   Test data: an Expo project with an existing low-res icon.

**Negative test cases (3):**
1. Prompt: "Generate an app icon" in a directory that is not a React Native/Expo
   project. Expected: skill explains the requirement instead of writing config files.
2. Prompt: icon generation with no SnapAI API key configured.
   Expected: clear setup instructions for the key; no fabricated output.
3. Prompt: "Publish my app to the App Store."
   Expected: skill does not trigger; out of scope.

---

## 2. cwb-local-build v1.0.3

**Starter prompts:** "Build a release APK for my Expo app locally" ·
"Create a simulator .app build for e2e testing"

**Positive test cases (5):**
1. Prompt: "Build a release APK for my Expo app locally."
   Expected: writes a gradlew-based build script, runs it, and copies the `.apk`
   into `builds/`.
2. Prompt: "Create a simulator .app build for e2e testing."
   Expected: xcodebuild simulator build; `.app` copied into `builds/`.
3. Prompt: "Build both Android and iOS artifacts for my Maestro tests."
   Expected: both artifacts produced with predictable paths under `builds/`.
4. Prompt: "Build an APK without using EAS."
   Expected: local gradlew path used; no EAS commands run.
5. Test data: an Expo project with a custom scheme and slug in app config.
   Expected: skill reads app name, slug, scheme, and bundle ID from the config and
   names artifacts accordingly.

**Negative test cases (3):**
1. Prompt: "Build a release APK" in a non-Expo project.
   Expected: explains the Expo project requirement; writes nothing.
2. Test data: machine without the Android SDK (or without Xcode for iOS).
   Expected: surfaces the actionable environment error instead of looping on retries.
3. Prompt: "Submit my build to the Play Store."
   Expected: skill does not trigger; out of scope.

---

## 3. cwb-ship v1.0.3

**Starter prompts:** "Scaffold a new React Native app with the ship CLI" ·
"Create a revenue-ready AI image app from the Platano template"

**Positive test cases (5):**
1. Prompt: "Scaffold a new React Native app with the ship CLI."
   Expected: runs `bunx @codewithbeto/ship`, collects the app name, scaffolds project.
2. Prompt: "Create a revenue-ready AI image app from the Platano template."
   Expected: Platano template scaffolded with RevenueCat payments pre-configured.
3. Prompt: "Scaffold Platano as 'Glow' with bundle ID com.beto.glow."
   Expected: app name, bundle ID, and slug set from the prompt.
4. Prompt: any scaffold request. Expected: dependencies installed and git initialized
   in the new project without extra prompting.
5. Prompt: "What templates can I ship with the ship CLI?"
   Expected: lists available templates and what each includes.

**Negative test cases (3):**
1. Prompt: scaffold request run inside an existing app directory.
   Expected: warns and asks before writing into a non-empty directory.
2. Test data: machine without bun/node available.
   Expected: actionable install guidance, not a raw stack trace loop.
3. Prompt: "Write a blog post about React Native."
   Expected: skill does not trigger; out of scope.

---

## 4. cwb-theming v1.0.3

**Starter prompts:** "Set up theming and dark mode in my Expo app" ·
"Add Material You dynamic colors to my React Native app"

**Positive test cases (5):**
1. Prompt: "Set up theming and dark mode in my Expo app" in an Expo Router project.
   Expected: scaffolds the semantic color token system and the `useColors()` hook.
2. Prompt: "Add Material You dynamic colors to my React Native app."
   Expected: Android tokens resolve to Material You dynamic colors.
3. Prompt: "Make my colors use native iOS system colors."
   Expected: iOS tokens resolve to native iOS colors.
4. Prompt: "Make my app switch between light and dark mode automatically."
   Expected: tokens flip with the system appearance without extra wiring.
5. Test data: project with an existing partial color file.
   Expected: integrates without breaking existing imports; migration steps explained.

**Negative test cases (3):**
1. Prompt: theming request in a project without Expo Router.
   Expected: explains the Expo Router requirement before scaffolding.
2. Test data: bare React Native project (no Expo).
   Expected: states the limitation and offers guidance rather than writing files.
3. Prompt: "Theme my website with CSS variables."
   Expected: skill does not trigger; web CSS is out of scope.

---

## Submit tab (each plugin)

- Release notes: "Initial public release."
- Policy attestations: review and accept in the portal.
- Global tab: select availability (suggest: all countries).
- After approval, hit **Publish** — approval alone doesn't list the plugin.
