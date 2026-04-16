---
name: local-build
description: Build a release APK and a simulator .app file locally for a React Native Expo app using gradlew and xcodebuild. Use when the user wants to produce installable artifacts without EAS (for e2e testing, sharing a build with a teammate, or quick iteration on a real device/simulator). Generates two shell scripts wired up to the user's actual app name, scheme, and bundle identifier.
---

# Local Build Workflow (APK and .app)

## Overview

Generate two shell scripts that build release artifacts for an Expo / React Native project using the platform toolchains directly:

- `scripts/build-android.sh` → runs `./gradlew assembleRelease` and copies the APK into `builds/`
- `scripts/build-ios.sh` → runs `xcodebuild` for the iOS Simulator and copies the `.app` into `builds/`

Both scripts replace the previous artifact on each run, so the output path is always predictable.

**Why this exists:** Debug builds on an Expo project include `expo-dev-client` and launch the "Development Servers" picker instead of the app UI. For e2e runs, teammate previews, or real device installs, you need a **Release** build, and that's what these scripts produce.

## Step 0: Confirm the project is a React Native / Expo app

Before doing anything else, verify the current directory is an Expo/React Native project:

1. Check for `package.json` with `expo` in `dependencies`.
2. Check for `app.json` or `app.config.ts` / `app.config.js`.

If neither exists, stop and tell the user the skill only works inside an Expo project.

## Step 1: Read the app identity from the Expo config

The scripts need three values specific to the user's project. **Do not hardcode "YourApp" or assume any name.** Read them from the config.

### Values to extract

| Value | Where to find it | Used for |
|-------|------------------|----------|
| `name` | `app.config.ts` / `app.config.js` / `app.json` → `expo.name` | iOS scheme and `.app` filename |
| `slug` | `expo.slug` | APK filename (fallback: lowercased `name`) |
| `ios.bundleIdentifier` | `expo.ios.bundleIdentifier` | `xcrun simctl launch` command |
| `android.package` | `expo.android.package` | `adb shell am start` command |

### How to read each config format

- **`app.json`** — plain JSON, parse directly. The top-level key is usually `expo`.
- **`app.config.ts` / `app.config.js`** — exports a function that returns the config. Read the file and extract the literal values from the returned object. Do not try to execute it. If a value is computed dynamically, ask the user what to use.

### Verify the iOS scheme exists on disk

The iOS scheme file is generated from `expo.name` during `expo prebuild`. Confirm it's there before wiring it into the script:

```bash
ls ios/*.xcworkspace 2>/dev/null
ls ios/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme 2>/dev/null
```

The `.xcworkspace` name and the `.xcscheme` filename (without the extension) are what you pass to `xcodebuild -workspace` and `-scheme`. They usually match `expo.name`, but if they don't, **use what's on disk**.

If `ios/` or `android/` doesn't exist yet, run:

```bash
npx expo prebuild
```

Then re-check the scheme.

## Step 2: Create the Android build script

Write `scripts/build-android.sh`. Replace `<SLUG>` with the value from Step 1.

```bash
#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
ARTIFACT="$ROOT/android/app/build/outputs/apk/release/app-release.apk"
DEST_DIR="$ROOT/builds"
DEST="$DEST_DIR/<SLUG>.apk"

echo "==> Building Android release APK"
cd "$ROOT/android"
./gradlew assembleRelease

if [ ! -f "$ARTIFACT" ]; then
  echo "Build did not produce $ARTIFACT" >&2
  exit 1
fi

mkdir -p "$DEST_DIR"
rm -f "$DEST"
cp "$ARTIFACT" "$DEST"

echo "Done: $DEST"
```

**Notes:**
- `assembleRelease` is required. `assembleDebug` launches `expo-dev-client` instead of the app.
- If the project has no release signing configured, Gradle falls back to the debug keystore, which is fine for local testing but **not** acceptable for Play Store submission.

## Step 3: Create the iOS build script

Write `scripts/build-ios.sh`. Replace `<SCHEME>` with the value from Step 1 (it's the same string used for `-workspace <SCHEME>.xcworkspace` and `-scheme <SCHEME>`, and the output file is `<SCHEME>.app`).

```bash
#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
ARTIFACT="$ROOT/ios/build/Build/Products/Release-iphonesimulator/<SCHEME>.app"
DEST_DIR="$ROOT/builds"
DEST="$DEST_DIR/<SCHEME>.app"

echo "==> Building iOS Simulator .app (Release)"
cd "$ROOT/ios"
xcodebuild \
  -workspace <SCHEME>.xcworkspace \
  -scheme <SCHEME> \
  -configuration Release \
  -sdk iphonesimulator \
  -derivedDataPath build \
  CODE_SIGNING_ALLOWED=NO \
  -quiet

if [ ! -d "$ARTIFACT" ]; then
  echo "Build did not produce $ARTIFACT" >&2
  exit 1
fi

mkdir -p "$DEST_DIR"
rm -rf "$DEST"
cp -R "$ARTIFACT" "$DEST"

echo "Done: $DEST"
```

**Notes:**
- `-sdk iphonesimulator` produces a simulator `.app`. It will **not** run on a physical device.
- `CODE_SIGNING_ALLOWED=NO` is safe for simulator builds and avoids the need for a signing identity.
- A `.app` is a directory bundle, not a file, so `cp -R` is required.

## Step 4: Make the scripts executable

```bash
chmod +x scripts/build-android.sh scripts/build-ios.sh
```

## Step 5: Add `builds/` to `.gitignore`

Append this to `.gitignore` (check it's not already there):

```
# Local build artifacts
builds/
```

## Step 6: Tell the user how to use them

Give the user this summary:

```
Built two scripts for you:

  ./scripts/build-android.sh   → builds/<slug>.apk
  ./scripts/build-ios.sh       → builds/<scheme>.app

Install and run:

  # Android (connected device or emulator)
  adb install -r builds/<slug>.apk
  adb shell am start -n <android.package>/.MainActivity

  # iOS Simulator
  xcrun simctl boot "iPhone 16" 2>/dev/null; open -a Simulator
  xcrun simctl install booted builds/<scheme>.app
  xcrun simctl launch booted <ios.bundleIdentifier>
```

Substitute the real values from Step 1 when producing the message so the user can copy/paste directly.

## Important notes

- **Release, not Debug.** Debug builds launch `expo-dev-client`, which is the launcher screen with the "Development Servers" list. For anything where you want the real UI, you need Release.
- **iOS builds are simulator-only here.** Device builds need provisioning profiles and a signing identity, which is out of scope for this skill. If the user asks for a device build, point them at `eas build` or manual Xcode archive.
- **Android signing is debug-key only.** The APK is fine for local testing and e2e, but do not use it for Play Store submission. For production, set up a release keystore or use `eas build`.
- **Values are project-specific.** Never hardcode "YourApp" or the Platano example values. Always read from `app.config.ts` / `app.json` and verify against files on disk.

## Troubleshooting

### "Build did not produce ..."
The xcodebuild or gradlew command succeeded but the artifact isn't where the script expects. Usually means:
- The scheme or workspace name is wrong (check `ios/*.xcworkspace` and `ios/*.xcodeproj/xcshareddata/xcschemes/`)
- A custom `derivedDataPath` or output directory is configured in a build-script or Gradle override

### `xcodebuild: error: The workspace ... does not exist`
Run `npx expo prebuild` to regenerate `ios/`. If you already have an `ios/` folder but no workspace, the CocoaPods install likely failed — run `cd ios && pod install`.

### APK installs but opens expo-dev-client launcher
The script ran `assembleDebug` somewhere in the chain. Make sure Step 2's script calls `assembleRelease`.

### `.app` opens and shows "Development Servers"
Same issue on iOS — the script was built with `-configuration Debug` instead of `Release`. Check Step 3's script.

### `xcrun simctl install` says "incorrect executable format"
The user tried to `open` the `.app` directly on macOS. Simulator `.app` bundles only run inside `xcrun simctl`, not as a macOS application. Use the `xcrun simctl install booted <path>` command.
