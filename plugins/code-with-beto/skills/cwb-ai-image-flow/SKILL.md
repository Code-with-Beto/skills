---
name: cwb-ai-image-flow
description: Design, implement, or debug an image generation or editing feature, including input validation, provider requests, progress, results, retries, and cost controls. Use for photo-to-result or prompt-to-image workflows.
---

# AI Image Flow

Define the result the user should get, the inputs the app needs, and the most common unacceptable outputs. Use their current image provider, backend, and UI when present. For a prototype without credentials, use a local fixture or a mock generator to verify the full interaction.

1. Give the user input guidance and validate supported format, size, and quantity before upload. Preview the exact inputs that will be sent. Identify where images go and what retention the app actually implements.
2. Keep service credentials in the server environment. Validate requests on the server, assign a job identity, and reuse it across safe retries so a refresh or double tap does not multiply work or billable requests. Define limits where the request is accepted.
3. Model queued, generating, completed, expired, and failed states as appropriate. Preserve the user's inputs after a transient failure. Differentiate errors that need a new photo from errors that allow a retry.
4. Test with common inputs, one difficult input, an invalid input, a timeout, and rapid duplicate taps. Use a small evaluation set and score whether the edit fulfills the request, preserves important details, and introduces obvious artifacts.

Deliver a working mock, implementation, or test plan according to the request. Label checks that need provider credentials or real devices. Use sample images or user-approved assets when a real provider check is authorized.

**Optional CWB example.** Inkigo makes its success criteria concrete by showing how a chosen tattoo would look on the submitted photo. Adopt the same idea by specifying what should change and what should stay consistent in the user's own before-and-after flow. [Inkigo](https://codewithbeto.dev/resources/inkigo)
