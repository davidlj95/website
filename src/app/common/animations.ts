// To be in sync with animations in SCSS
import {
  animate,
  AnimationTriggerMetadata,
  AUTO_STYLE,
  style,
  transition,
  trigger,
} from '@angular/animations'

export const STANDARD_DURATION_MS = 300
export const EMPHASIZED_DURATION_MS = 500
export const TIMING_FUNCTION = 'cubic-bezier(0.2, 0, 0, 1.0)'

export function slideDownOnEnterAndSlideUpOnLeave(
  triggerName: string,
  durationInMs: number = EMPHASIZED_DURATION_MS,
): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      style({ height: '0', visibility: 'hidden' }),
      animate(
        `${durationInMs}ms ${TIMING_FUNCTION}`,
        style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
      ),
    ]),
    transition(':leave', [
      style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
      animate(
        `${durationInMs}ms ${TIMING_FUNCTION}`,
        style({ height: '0', visibility: 'hidden' }),
      ),
    ]),
  ])
}
