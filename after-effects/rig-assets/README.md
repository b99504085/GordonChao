# Trial Balloon Rig Assets

This folder contains MVP character rig parts exported from the current flat PNG mascot artwork.

The current After Effects assembly uses a hybrid MVP rig:

- a complete mascot PNG as the visual base, to avoid visible broken seams
- selected overlay parts for small motion, such as eyes, mouth, balloon, star, and magnifying glass
- arms, feet, ears, cheeks, and the old cutout body are included as optional disabled layers

## Characters

- `crowd-puller`
- `outlier`
- `shadow`

Each character folder contains transparent PNG parts such as:

- `body`
- `left_arm`
- `right_arm`
- `left_foot`
- `right_foot`
- `eye` / `left_eye` / `right_eye`
- `mouth`
- character accessory, such as `balloon`, `star`, or `magnifying_glass`

## Preview Sheets

Use these contact sheets to quickly inspect the current cut quality:

- `crowd-puller-contact-sheet.jpg`
- `outlier-contact-sheet.jpg`
- `shadow-contact-sheet.jpg`

## Manifest

`rig-manifest.json` records each part file, original crop box, and suggested center anchor.

## Assembly Script

Run `../assemble-mascot-rigs.jsx` in After Effects to automatically create:

- `rig_crowd-puller`
- `rig_outlier`
- `rig_shadow`
- `rig_preview_all_mascots`

The script places the complete mascot source first, then adds a small number of overlay parts back into their original relative position. It also adds a sample bob, blink, and accessory motion so you can quickly check whether the character feels usable without exposing broken cut edges.

## Important Note

These are MVP rig parts created from already flattened PNG images. They are useful for testing After Effects rigging, Puppet Pins, and simple character motion. Because the original art was not drawn as a layered character rig, wide limb movement can expose gaps or rough edges. For this MVP version, risky limb cutouts are disabled by default.

For final polished cartoon animation, the best next step is to create true layered PSD or PNG artwork where the body, limbs, face, and accessories are drawn separately from the start.
