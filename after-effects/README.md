# Trial Balloon After Effects MVP

This folder contains After Effects scripts that build the Trial Balloon opening animation MVP.

## How to use

1. Open Adobe After Effects.
2. Choose `File > Scripts > Run Script File...`.
3. First run `assemble-mascot-rigs.jsx` to create the mascot rig precomps.
4. Then run `create-opening-scene-from-rigs.jsx` to create the 20-second opening scene from those rigs.
5. After Effects will create and save:
   `TrialBalloonOpeningRigScene.aep`
6. Open the composition named:
   `Trial Balloon Opening MVP - Rig Scene`
7. Preview the timeline, then export through Adobe Media Encoder or After Effects render queue.

`trial-balloon-opening.jsx` is still kept as the older static-PNG MVP generator. For the current character-rig workflow, use `create-opening-scene-from-rigs.jsx`.

## What the script creates

- 1920 x 1080 composition
- 20 seconds
- 30 fps
- Six storyboard scenes
- Rigged mascot precomps from `assemble-mascot-rigs.jsx`
- English question card and options
- Shadow observation scene with a magnified thought bubble
- Final title frame with `Trial Balloon`

## Suggested export

- Format: H.264 / MP4
- Resolution: 1920 x 1080
- Frame rate: 30 fps
- Duration: 20 seconds

## Notes

The script is an MVP generator, not the final polished animation. It gives you a working After Effects timeline that you can refine with better easing, sound effects, music, motion blur, and more detailed character animation.
