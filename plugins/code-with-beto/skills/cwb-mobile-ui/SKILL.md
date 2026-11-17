---
name: cwb-mobile-ui
description: Review or improve a mobile screen, navigation flow, or interaction for usability and native feel. Use for visual hierarchy, gestures, keyboard behavior, accessibility, adaptive layouts, and empty or error states.
---

# Mobile UI

Identify the main task for the screen. Inspect the implementation, screenshot, or flow description using the target device and platform. Agree with the project's navigation and components unless changing them is part of the request.

- Start with what the user must find, read, and tap. Make the primary action easy to reach and keep the order of content stable across loading, empty, error, and success states.
- Use native controls or familiar equivalents when their behavior matters. Check that gestures have an accessible alternative where appropriate. Verify safe areas, scrolling, input focus, and reachability with the software keyboard shown.
- Check a small viewport, the largest layout the app supports, and larger system text. Check screen reader order and labels, a focus or selection indicator beyond color, and usable light and dark contrast.
- If motion communicates a change, preserve meaning with reduced motion enabled and verify that interrupted transitions leave a usable screen.

Return changes in the order they affect the user's task. When editing, update the smallest surface that fixes the issue and report checks actually performed. With screenshots alone, mark behavior that needs a live build and give the user a concrete verification case.

**Optional CWB example.** Planet Atlas presents the catalog and the selected planet side by side where space allows. On a compact screen it makes those two views a navigation flow. Use the same approach to preserve a user's selection when a list-detail layout changes size. [Planet Atlas](https://codewithbeto.dev/resources/planet-atlas)
