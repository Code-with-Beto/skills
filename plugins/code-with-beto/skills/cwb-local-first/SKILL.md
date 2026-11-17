---
name: cwb-local-first
description: Design, implement, or review offline-capable mobile features and on-device data. Use for local storage choice, durable writes, migrations, sync boundaries, data recovery, or tests after a restart.
---

# Local-First Data

Pick one real workflow and define what a user must be able to read and change in airplane mode, after force-quitting, and after an upgrade. Inspect the app's existing data model and storage. Name which data is replaceable and which data belongs to the user.

1. Reuse a suitable store. Use preferences for small settings, a structured database for related records and queries, and files for larger media. Write coupled changes together. Give records stable identifiers from creation.
2. Preserve existing data when changing schemas. Prefer a versioned migration and test it with a representative older database. Run recovery tests on copies or fixtures.
3. If sync is required, name the local and remote responsibilities, when an edit is considered saved, and what happens after retries or conflicts. Test duplicate delivery, deletion, and edits from two devices where the feature supports them.
4. Verify the core flow with no network, after a relaunch, and after upgrading an existing install. If the app groups activity by calendar day, cover boundaries relevant to it, such as midnight or a changed time zone.

For a plan, give the storage choice, entities, write/read path, and test cases. When changing code, report the migration and the evidence that existing data survives.

**Optional CWB example.** Kujun keeps habit history on-device. A check-in from NFC or a normal tap should reach the same underlying action in a habit app, which gives the developer one place to enforce consistency. [Kujun](https://codewithbeto.dev/resources/kujun)
