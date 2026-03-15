# App Icon Plugin

AI-powered app icon generation for React Native Expo apps with full iOS 26 Liquid Glass support and Android adaptive icons.

## What This Plugin Does

- **Generates app icons** using AI via [SnapAI](https://github.com/betomoedano/snapai), an open-source CLI by the Code with Beto team.
- **Creates iOS 26 .icon folder** with proper Liquid Glass icon format for modern iOS apps
- **Configures Android adaptive icons** with support for foregroundImage, backgroundImage, and monochromeImage
- **Updates app.json automatically** with correct paths for both iOS and Android
- **Uses transparent backgrounds** enabling better integration with Material You theming and iOS effects
- **Handles SnapAI configuration** including API key setup and verification

## When to Use

- You're starting a new Expo app and need an app icon
- You want to update your existing app icon with a fresh design
- You need iOS 26 Liquid Glass support (.icon format)
- You want proper Android adaptive icons with Material You theming
- You prefer AI-generated icons over manually designing them
- You need to quickly iterate on multiple icon concepts

## Tips & Advanced Usage

### Iterating on the Icon in Icon Composer (iOS)

After generating your icon, you can refine it using Apple's Icon Composer:

1. **Open the .icon folder in Xcode:**

   ```bash
   open assets/app-icon.icon
   ```

   Or double-click the `.icon` folder in Finder

2. **Edit in Icon Composer:**
   - Adjust translucency, shadow, and glass effects
   - Add fill specializations for light/dark mode
   - Fine-tune positioning and scale
   - Preview across different platforms (iOS, watchOS, macOS)

3. **Save changes:**
   - Icon Composer saves automatically back to the `.icon` folder
   - No need to update app.json—it already points to the folder

### Generating Multiple Icon Variations

If you want to try different styles:

1. **Generate a new icon:**

   ```bash
   npx snapai icon --prompt "your new prompt" --background transparent --style minimalism
   ```

2. **Compare before replacing:**
   - The new icon will have a different timestamp
   - Preview both before deciding
   - Keep backups if needed

3. **Replace the main asset:**

   ```bash
   # Update iOS
   cp assets/icon-[new-timestamp].png assets/app-icon.icon/Assets/icon.png

   # Update Android in app.json
   # Change the paths to point to the new PNG
   ```

4. **Test the changes:**
   ```bash
   npx expo prebuild --clean
   npx expo run:ios
   npx expo run:android
   ```

## Requirements

- Node.js and npm/npx
- OpenAI API key (costs ~$0.04 per icon)
- Expo project with app.json
- SnapAI CLI (automatically used via npx)

## About SnapAI

[SnapAI](https://github.com/betomoedano/snapai) is a free, open-source CLI built by the [Code with Beto](https://codewithbeto.dev) team. It uses your own OpenAI API key to generate icons — the only cost is standard OpenAI API usage (~$0.04 per icon). Your API key is stored in a local config file on your machine (`~/.snapai/config.json`) and is sent directly to OpenAI's API. SnapAI ships no telemetry, has no backend server, and collects zero data; credentials never leave your device.

## License

MIT
