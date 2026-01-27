---
name: app-icon
description: Generate app icons for your React Native Expo app with iOS 26 support
---

# App Icon Generation Workflow

## Overview
Generate professional app icons using AI and configure them for both iOS (with iOS 26 Liquid Glass support) and Android platforms in Expo apps.

## Step 0: Verify SnapAI Setup (CRITICAL - DO THIS FIRST)

**Before attempting to generate icons, check if SnapAI is configured:**

1. Check if SnapAI is configured:
```bash
npx snapai config --show
```

2. **If the config check fails or shows no API key:**
   - SnapAI requires an OpenAI API key to generate icons
   - Each icon costs approximately $0.04 via OpenAI's image generation API
   - Ask the user: "SnapAI requires an OpenAI API key. Do you have one, or would you like me to help you set it up?"

3. **If the user has an API key:**
   - Ask them to provide it securely
   - Configure it for them with:
   ```bash
   snapai config --api-key <their-api-key>
   ```
   - Verify the setup worked:
   ```bash
   snapai config --show
   ```

4. **If the user needs to get an API key:**
   - Direct them to: https://platform.openai.com/api-keys
   - Explain: "You'll need to:
     1. Create an OpenAI account if you don't have one
     2. Navigate to API keys section
     3. Click 'Create new secret key'
     4. Copy the key (starts with 'sk-')
     5. Come back here and provide it to me"
   - Once they provide the key, configure it using the command above

**Important Notes:**
- API keys are stored locally and remain private (zero data collection)
- Do NOT proceed with icon generation if SnapAI is not configured
- The key must start with "sk-" to be valid
- You can handle the configuration for the user - just ask for their API key

## Step 1: Understand the App Context
- Read the `app.json` to understand the app name and current icon configuration
- Ask the user what the app is about if not clear from context
- Identify the app's theme, purpose, and target aesthetic

## Step 2: Get Style Preferences
Ask the user what style they'd like for the icon. Available styles:
- `minimalism` - Clean, Apple-inspired minimalism (2-3 colors max)
- `glassy` - Premium glass aesthetic with semi-transparent elements
- `gradient` - Vibrant gradients, Instagram-inspired
- `neon` - Cyberpunk, futuristic with glowing effects
- `material` - Google Material Design
- `ios-classic` - Traditional iOS with subtle gradients
- `pixel` - Retro 8-bit/16-bit game art style
- `geometric` - Bold, angular compositions

Or let the user provide a custom style description.

## Step 3: Generate Icon with SnapAI

**Pre-flight check:** Verify SnapAI is configured before running (see Step 0)

Generate a 1024x1024 icon with **transparent background** (critical for both platforms):

```bash
npx snapai icon --prompt "YOUR_PROMPT_HERE" --background transparent --output-format png --style STYLE_NAME
```

**Important flags:**
- `--background transparent` - REQUIRED for iOS 26 and Android adaptive icons
- `--output-format png` - Ensures PNG format
- `--style` - Optional, enhances the visual style
- `--quality high` - Optional, for final production icons

The icon will be saved to `./assets/icon-[timestamp].png`

## Step 4: Create iOS 26 .icon Folder Structure

Create the new iOS 26 Liquid Glass icon format:

1. Create the folder structure:
```bash
mkdir -p assets/app-icon.icon/Assets
```

2. Copy the generated PNG:
```bash
cp assets/icon-[timestamp].png assets/app-icon.icon/Assets/icon.png
```

3. Create `assets/app-icon.icon/icon.json` with this basic configuration:
```json
{
  "fill": "automatic",
  "groups": [
    {
      "layers": [
        {
          "glass": false,
          "image-name": "icon.png",
          "name": "icon"
        }
      ],
      "shadow": {
        "kind": "neutral",
        "opacity": 0.5
      },
      "translucency": {
        "enabled": true,
        "value": 0.5
      }
    }
  ],
  "supported-platforms": {
    "circles": ["watchOS"],
    "squares": "shared"
  }
}
```

## Step 5: Update app.json

Update the `app.json` to configure icons for both platforms:

### For iOS:
```json
{
  "expo": {
    "ios": {
      "icon": "./assets/app-icon.icon"
    }
  }
}
```

### For Android:

**Option 1: Simple (with solid background color)**
```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon-[timestamp].png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

**Option 2: Comprehensive (recommended - use same icon for all)**
Since the icon has a transparent background, you can use it for all three Android adaptive icon fields:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon-[timestamp].png",
        "backgroundImage": "./assets/icon-[timestamp].png",
        "monochromeImage": "./assets/icon-[timestamp].png"
      }
    }
  }
}
```

**Benefits of Option 2:**
- `foregroundImage` - Main icon displayed
- `backgroundImage` - Provides layered depth effect on Android 8.0+
- `monochromeImage` - Used for themed icons on Android 13+ (automatically recolored by system)

**Note:**
- For Option 1, ask the user for their preferred `backgroundColor`, or use white (#ffffff) as default
- For Option 2, the same transparent PNG works perfectly for all three fields
- Option 2 provides better integration with Android's Material You theming

## Step 6: Verify and Test

1. Verify the folder structure exists:
```bash
ls -la assets/app-icon.icon/
```

2. Verify app.json is valid JSON:
```bash
cat app.json | jq .
```

3. Inform the user to test the app with:
```bash
npx expo prebuild --clean
npx expo run:ios
npx expo run:android
```

## Important Notes

- **Transparent background is critical** - The icon must have a transparent background for both iOS Liquid Glass effect and Android adaptive icons
- **iOS 26 .icon format** - The `.icon` folder enables Liquid Glass effects on iOS 26+
- **Keep original PNG** - Don't delete the generated PNG, it's used for Android (and can be reused for all three Android icon fields)
- **Android adaptive icon flexibility** - The same transparent PNG can be used for foregroundImage, backgroundImage, AND monochromeImage fields
- **Material You support** - Using monochromeImage enables Android 13+ themed icons that adapt to user's color scheme
- **File naming** - The `.icon` folder name can be customized (e.g., `app-icon.icon`, `myapp.icon`)

## Troubleshooting

### SnapAI Configuration Issues
- **"No API key found"** - Run `snapai config --api-key <key>` to set it up
- **"Invalid API key"** - Verify the key starts with "sk-" and is copied correctly from OpenAI
- **Authentication errors** - Check if the API key has been revoked or has insufficient credits at platform.openai.com
- **Command not found** - Ensure you're using `npx snapai` (not just `snapai`)

### Icon Display Issues
- If the icon doesn't appear, verify the path in app.json matches the actual folder location
- Ensure the PNG inside the .icon folder is exactly 1024x1024
- For Android, make sure all image paths (foregroundImage, backgroundImage, monochromeImage) are correct and point to existing files
- You can use the same PNG file path for all three Android adaptive icon fields
- Run `npx expo prebuild --clean` to regenerate native projects after icon changes
