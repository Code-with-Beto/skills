---
name: cwb-onboarding
description: Design or improve mobile first-run onboarding, from initial launch to a first useful result. Use when reviewing welcome screens, starter demos, optional setup, or the timing of permission prompts and paywalls.
---

# Mobile Onboarding

Inspect the current first-run path or use the screens and goals the user provides. Identify the first moment at which the app delivers its promise, then list the decisions, permissions, and waiting time before that moment.

1. Draft the shortest path to the first result. For each screen, name the action it helps the user take. Offer a realistic sample or preview if doing the real task requires setup the user cannot finish on first launch.
2. Ask for a permission at the point it unlocks an action. Define what the user can still do after skipping or denying it. Preserve the expected path for people who return mid-flow after closing the app.
3. If purchase is part of the flow, use a truthful sample or a clear description to show what the user gets. Keep exit and restore discoverable where relevant. Preserve existing entitlement rules when changing the presentation.
4. Test a fresh install, a completed onboarding, an interrupted session, and each relevant denied permission. If the app collects events, distinguish meaningful events like first result and permission denial from ordinary screen views.

For a review, provide the proposed screen order and the reason for each change. For implementation, update the flow in the user's architecture and test with the first-run state reset in a test environment.

**Optional CWB examples.** Kujun lets the user record a habit by tapping and introduces NFC when it helps. Oyelo gives the user a bundled first listen before setting up text-to-speech. Either pattern can inform the user's own interaction. [Kujun](https://codewithbeto.dev/resources/kujun) · [Oyelo](https://codewithbeto.dev/resources/oyelo)
