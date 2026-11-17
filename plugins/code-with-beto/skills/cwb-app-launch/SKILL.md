---
name: cwb-app-launch
description: Check a mobile app's readiness for internal beta, public beta, or store submission. Use for release checklists, App Review preparation, testing release candidates, or choosing a native build versus an over-the-air update.
---

# App Launch

Identify the target platform, distribution track, candidate version, and the workflow that has to succeed. For current submission rules and store requirements, check official Apple or Google documentation. Describe requirements in terms of the actual app features and distribution track.

1. Verify the candidate's identity, build profile, signing and environment, and test a clean install on the target device. When users are upgrading, test with a representative existing install and data. Include the core flow, lost network, and denied permissions where relevant.
2. Prepare listing details and privacy disclosures from actual product behavior. Compare screenshots with the candidate. If sign-in or a paywall affects the reviewer path, verify test access, purchase restoration, and clear review instructions as applicable.
3. For changes delivered over the air, confirm native/runtime compatibility, the rollout path, and the response if the update fails. When a change needs native code or configuration, build and test a new binary.
4. Group evidence into passed, failed, and unchecked. Distinguish blockers for the chosen track from improvements that can wait. Provide the next step with the greatest impact on readiness.

If the user only supplies an idea or screenshots, produce a tailored checklist with observable checks. When an artifact is available, report the version and checks actually run. Submit or release only when the user requests the external action.

**Optional CWB examples.** Code with Beto's launch checklist emphasizes the full customer journey, including support, and its OTA release guide explains why delivery depends on the installed runtime. Apply what fits the user's release. [Launch checklist](https://codewithbeto.dev/blog/5-things-before-launching-an-app) · [OTA release management](https://codewithbeto.dev/blog/react-native-ota-release-management)
