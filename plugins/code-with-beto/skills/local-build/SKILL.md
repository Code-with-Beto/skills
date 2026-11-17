---
name: local-build
description: Produce and verify an installable local mobile build using the project's native toolchain. Use for iOS Simulator apps, physical-device builds, Android APKs, or artifacts for beta and UI testing.
---

# Local Mobile Build

First identify the destination, the intended behavior at launch, and whether the build needs signing. Simulator apps, signed iOS device builds, Android APKs for local installation, and store archives have different requirements. Match the artifact to the request.

1. Inspect the existing build scripts, package configuration, iOS workspace or project and actual scheme, or Android Gradle modules and variants. Reuse a working native runner. For a managed Expo app that needs generated projects, use the existing project convention and preserve hand-maintained native changes.
2. For iOS Simulator, select the simulator destination and verify the scheme with Xcode's project listing. Use a device destination and the project's signing setup for physical hardware. For Android, select the real Gradle task and variant that produces the requested APK or bundle.
3. Use the project's release-like profile for UI tests or unattended launch when the development profile needs a dev server. Identify the produced artifact from build output. Verify its identifier, configuration, and target before reporting it.
4. If the device or emulator is already available, install and run the build, then confirm the intended screen opens. If a build cannot run here, return the exact missing prerequisite and a command scoped to the project.

Create a reusable build script when asked or when the task needs repeated runs. Keep artifact paths predictable and preserve successful prior artifacts if the next build fails. Store submission is handled independently from local testing.

**Optional CWB example.** The existing CWB Local Build workflow names artifacts predictably for test runners. Its simulator build and Android APK are examples of testing outputs to adapt to the user's platform and build variants. [Building Expo apps locally](https://codewithbeto.dev/blog/building-expo-apps-locally)
