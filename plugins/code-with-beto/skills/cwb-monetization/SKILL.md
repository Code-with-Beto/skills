---
name: cwb-monetization
description: Design or verify mobile paywalls, product choices, and purchase entitlements. Use for subscriptions, one-time purchases, restore handling, sandbox tests, or diagnosing access after payment.
---

# Mobile Monetization

Identify what the user is paying for, how often they receive value, the stores and payment provider already in use, and how current access is represented. For work involving store requirements, consult current official guidance for the user's platforms and products.

1. Match the offer to the value. For each option, specify the feature or quota it grants, the price source, and any renewal or trial terms. Fetch localized prices from the store or billing SDK. Make purchased access and restoration discoverable.
2. Read the authoritative purchase state from the existing billing or entitlement system. Handle loading, verified active, expired or revoked, and temporarily unavailable states. Keep the purchase callback and restored entitlement reconciliation safe to repeat.
3. Create sandbox cases for success, cancellation, missing products, restore after reinstall, and changes such as expiry or refund when supported. Verify what the user sees at each step and which features become available. Use the store test environment or inject fixtures when credentials are unavailable.
4. For a paywall review, show where it appears, what the user knows at that point, the action available to them, and how they can recover an existing purchase. Change one decision at a time when testing conversion.

Report separately what the user saw, what entitlement state was recorded, and which cases were verified. Treat pricing changes, production product edits, and real purchases as separate explicit requests.

**Optional CWB examples.** Platano presents a result preview before asking for a subscription. Duo sells permanent access to a utility as a one-time purchase. Use the differences in ongoing value to evaluate the offer for the user's app. [Platano](https://codewithbeto.dev/platano) · [Duo](https://codewithbeto.dev/resources/duo)
