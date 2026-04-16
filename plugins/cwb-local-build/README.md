# Local Build Plugin

Generate shell scripts that build a **release APK** and a **simulator `.app`** for your React Native Expo project, wired up to your actual app name, scheme, and bundle identifier.

## What This Plugin Does

- **Reads your Expo config** (`app.config.ts`, `app.config.js`, or `app.json`) to pull your app name, slug, bundle identifier, and Android package.
- **Verifies the iOS scheme** on disk so the build command matches what Xcode generated during `prebuild`.
- **Writes `scripts/build-android.sh`** that runs `./gradlew assembleRelease` and copies the APK into `builds/`.
- **Writes `scripts/build-ios.sh`** that runs `xcodebuild` for the iOS Simulator in Release mode and copies the `.app` bundle into `builds/`.
- **Makes both scripts executable** and adds `builds/` to `.gitignore`.
- **Prints ready-to-paste install/launch commands** using your real bundle identifier and package name.

## When to Use

- You want to produce an installable APK or `.app` without waiting on a remote build
- You're setting up e2e tests (Maestro, Detox) that need a real artifact on a simulator or emulator
- You want to hand a teammate a build to click through without spinning up a dev server
- You're iterating locally and want a fast release build on your own machine

## Why Release Instead of Debug

Expo projects include `expo-dev-client` in Debug builds, which shows the "Development Servers" picker on launch. For any flow where you want the app to open into your real UI, you need a Release build — that's what the generated scripts produce.

## How It Differs from EAS

`eas build` does the same thing in the cloud and is the right call for production signing, store submission, and CI. This plugin is for the local path — when you already have Xcode and the Android SDK installed and you want the build to happen on your machine for speed and iteration.

## Generated Layout

After running the skill, your project will have:

```
scripts/
  build-android.sh
  build-ios.sh
builds/              # gitignored
  <slug>.apk         # latest Android build
  <AppName>.app/     # latest iOS simulator build
```

Each script run replaces the previous artifact, so `builds/` always holds the latest.

## Requirements

- An Expo project with `ios/` and `android/` folders generated (`npx expo prebuild` if missing)
- Xcode (for iOS builds)
- Android SDK and a working `gradlew` wrapper (standard in Expo-generated `android/`)

## License

MIT
