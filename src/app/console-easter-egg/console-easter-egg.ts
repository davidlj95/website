const [width, height] = [625.079, 111.313]
const [fillColor, strokeColor] = ['--sys-color-surface4', '--ui-text'].map(
  (property) => getComputedStyle(document.body).getPropertyValue(property),
)
const TEXT_CHARS_ANIMATION_DELAY_SECONDS = 0.1
const textPathStyles = [...Array(8).keys()]
  .map(
    (i) =>
      `#text path:nth-child(${i + 1}) {
        animation-delay: ${i * TEXT_CHARS_ANIMATION_DELAY_SECONDS}s;
       }`,
  )
  .join(' ')
const ANIMATION_DURATION = '3s'
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <style>
    /* Animation idea from
       https://codepen.io/jakejarvis/pen/pBZWZw
    */
    #emoji {
      animation: ${ANIMATION_DURATION} wave infinite linear;
      /* Drew a circle to find out hand's palm */
      transform-origin: 14% 80%;
    }
    @keyframes wave {
        0% { transform: rotate( 0.0deg) }
       10% { transform: rotate(14.0deg) }  /* The following five values can be played with to make the waving more or less extreme */
       20% { transform: rotate(-8.0deg) }
       30% { transform: rotate(14.0deg) }
       40% { transform: rotate(-4.0deg) }
       50% { transform: rotate(10.0deg) }
       60% { transform: rotate( 0.0deg) }  /* Reset for the last half to pause */
      100% { transform: rotate( 0.0deg) }
    }
    /*
      Animation idea from
      https://akashraj9828.github.io/svg-text-animation-generator/
    */
    #text path {
      stroke: ${strokeColor};
      stroke-dashoffset: 100%;
      stroke-dasharray: 100%;
      animation: ${ANIMATION_DURATION} text infinite linear;
    }
    ${textPathStyles}
    @keyframes text {
      40% {
        stroke-dashoffset: 0;
        fill: transparent;
      }
      60%, 100% {
        stroke-dashoffset: 0;
        fill: ${fillColor}
      }
    }
  </style>
  <g id="text" style="fill:none" fill="none">
    <path d="M180.6 131.858V64.319h-12.895v27.693h-19.111V64.319h-12.942v67.539h12.942v-29.27h19.11v29.27z" aria-label="H"
          transform="translate(-13.288 -41.064)" />
    <path
      d="M196.929 81.668v10.53h14.287v29.177h-14.287v10.483h40.913v-10.483H224.25V81.668Zm13.359-12.85q0 1.485.51 2.784.557 1.252 1.53 2.133.975.928 2.32 1.438 1.392.51 3.062.51 3.432 0 5.427-1.901 2.041-1.948 2.041-4.964 0-3.015-2.041-4.916-1.995-1.949-5.427-1.949-1.67 0-3.062.51-1.345.51-2.32 1.392-.973.928-1.53 2.227-.51 1.252-.51 2.736"
      aria-label="i"
      transform="translate(-13.288 -41.064)" />
    <path
      d="M331.172 69.375h-12.896v12.293H306.82v9.509h11.457v22.822q0 4.964 1.299 8.535 1.299 3.526 3.71 5.799 2.367 2.319 5.706 3.432 3.387 1.067 7.515 1.067 2.134 0 4.314-.232 2.227-.185 4.268-.556t3.85-.928q1.809-.603 3.154-1.392l-1.252-8.86q-.882.232-2.134.464-1.206.232-2.598.418-1.438.232-3.015.37-1.53.14-3.015.14-2.041 0-3.711-.464-1.624-.464-2.783-1.577-1.16-1.067-1.81-2.876-.602-1.855-.602-4.592v-21.57h18.74v-9.51h-18.74z"
      aria-label="t"
      transform="translate(-13.288 -41.064)" />
    <path
      d="M377.42 88.58V60.607h-12.896v71.25h12.895V95.63q.742-.974 1.624-1.763.927-.788 2.04-1.345 1.207-.65 2.691-.974 1.485-.325 3.2-.325 2.227 0 3.99.603 1.763.557 3.015 1.763t1.902 3.154q.696 1.949.696 4.639v30.476h12.895v-30.383q0-5.52-1.345-9.417-1.299-3.943-3.664-6.448-2.366-2.504-5.66-3.664-3.293-1.206-7.236-1.206-2.69 0-5.102.788-2.412.789-4.407 2.227-1.299.928-2.505 2.18-1.16 1.206-2.134 2.644"
      aria-label="h"
      transform="translate(-13.288 -41.064)" />
    <path
      d="M445.886 132.786q7.283 0 12.617-2.83t7.793-6.308l-6.448-6.958q-2.226 2.876-5.798 4.314t-7.375 1.438q-2.69 0-4.964-.835-2.273-.835-4.035-2.366-1.717-1.485-2.737-3.294-1.02-1.855-1.67-4.87v-.14h34.048v-5.473q0-5.52-1.531-10.066-1.53-4.592-4.453-7.84-2.969-3.246-7.236-5.009-4.222-1.81-9.649-1.81-5.242 0-9.695 1.903-4.453 1.902-7.7 5.334-3.247 3.433-5.056 8.21-1.81 4.732-1.81 10.484v1.856q0 5.056 1.81 9.509 1.855 4.407 5.242 7.654 3.386 3.293 8.117 5.195t10.53 1.902m-1.53-41.61q2.458 0 4.313.79 1.902.742 3.2 2.04 1.3 1.346 2.042 3.155t.742 3.85v1.02h-21.152q.464-2.458 1.391-4.453.928-1.994 2.32-3.432 1.345-1.438 3.154-2.18 1.81-.79 3.99-.79"
      aria-label="e"
      transform="translate(-13.288 -41.064)" />
    <path
      d="M514.585 80.74q-5.056 0-9.324 2.458-4.268 2.412-7.33 6.68l-.092-1.113-.51-7.097h-12.014v50.19h12.895v-30.151q.882-2.134 2.227-3.711t3.247-2.598q1.577-.881 3.572-1.299 2.04-.464 4.546-.464 2.412 0 5.056.325 2.69.278 5.241.881l1.902-12.849q-1.53-.464-4.035-.835-2.459-.417-5.381-.417"
      aria-label="r"
      transform="translate(-13.288 -41.064)" />
    <path
      d="M559.905 132.786q7.282 0 12.617-2.83 5.334-2.83 7.793-6.308l-6.448-6.958q-2.227 2.876-5.798 4.314t-7.376 1.438q-2.69 0-4.963-.835t-4.036-2.366q-1.716-1.485-2.737-3.294-1.02-1.855-1.67-4.87v-.14h34.048v-5.473q0-5.52-1.53-10.066-1.531-4.592-4.454-7.84-2.968-3.246-7.236-5.009-4.221-1.81-9.648-1.81-5.242 0-9.695 1.903-4.453 1.902-7.7 5.334-3.247 3.433-5.057 8.21-1.809 4.732-1.809 10.484v1.856q0 5.056 1.81 9.509 1.855 4.407 5.241 7.654 3.386 3.293 8.118 5.195 4.731 1.902 10.53 1.902m-1.531-41.61q2.458 0 4.314.79 1.902.742 3.2 2.04 1.3 1.346 2.042 3.155t.742 3.85v1.02h-21.153q.464-2.458 1.392-4.453.928-1.994 2.32-3.432 1.345-1.438 3.154-2.18 1.809-.79 3.989-.79"
      aria-label="e"
      transform="translate(-13.288 -41.064)" />
    <path
      d="m620.393 108.247.742-43.928h-13.22l.742 43.928zm-13.406 17.302q0 2.97 1.995 5.01 1.994 1.995 5.52 1.995 3.432 0 5.473-1.995 2.041-2.04 2.041-5.01 0-3.061-2.04-5.102-2.042-2.041-5.474-2.041-3.526 0-5.52 2.04-1.995 2.042-1.995 5.103"
      aria-label="!"
      transform="translate(-13.288 -41.064)" />
    </g>
  <g id="emoji">
    <path
      d="M39.11 79.56c-1.1 1.03-2.21-.2-2.21-.2S18.42 59.78 17.22 58.9c-1.69-1.23-5.31-3.16-8.93.57-1.51 1.55-3.97 5 .6 10.56.99 1.2 29.78 31.54 31.46 33.18 0 0 13.3 12.94 21.35 17.81 2.23 1.35 4.74 2.78 7.67 3.78 2.92 1 6.22 1.69 9.7 1.69 3.48.04 7.09-.63 10.5-1.88 3.41-1.26 6.59-3.09 9.48-5.2.71-.54 1.43-1.08 2.1-1.66l1.94-1.6a59 59 0 0 0 3.82-3.53c2.43-2.42 4.62-5.01 6.55-7.66 1.92-2.66 3.55-5.41 4.85-8.15s2.21-5.49 2.76-8.09c.58-2.59.74-5.04.65-7.18-.02-2.14-.45-3.97-.8-5.43-.4-1.46-.83-2.55-1.17-3.27-.33-.72-.51-1.1-.51-1.1-.46-1.29-.9-2.52-1.29-3.63a890 890 0 0 0-4.51-12.47l.01.03c-4.85-13.17-10.06-26.74-10.06-26.74-.79-2.39-3.7-3.22-5.84-1.68-6.18 4.44-8.07 10.92-5.89 17.83l5.59 15.32c.79 1.71-1.39 3.69-2.85 2.5-4.59-3.74-14.3-14.05-14.3-14.05-4.34-4.16-28.83-29.27-30.47-30.8-3.3-3.07-7.46-4.65-10.63-2.32-3.24 2.38-4.14 6.06-1.01 10.08.85 1.09 25.6 27.24 25.6 27.24 1.44 1.51-.26 3.65-1.85 2.18 0 0-30.79-32.12-32.18-33.62-3.15-3.42-8.21-4.17-11.21-1.35-2.93 2.75-2.86 7.26.34 10.8 1.02 1.12 22.71 24.02 31.39 33.4.58.63 1.03 1.47.17 2.26-.01.01-.88.95-2-.25-2.36-2.52-25.93-27.08-27.24-28.41-3.01-3.06-7.05-4.51-10.3-1.53-2.96 2.71-3.44 7.44-.04 10.78l28.55 30.18s.93 1.1-.11 2.07"
      style="fill:#fac036;stroke-width:1.00049;stroke-dasharray:none"
      transform="matrix(.69797 0 0 .69797 11.175 10.99)" />
    <path
      d="m85.46 54.4 2.41 2.58s-13.79 13.31-4.39 33.75c0 0 1.22 2.59-.38 3.02 0 0-1.4.78-3-3.2 0-.01-9.49-19.42 5.36-36.15"
      style="fill:#e48c15;stroke-width:1.00049;stroke-dasharray:none"
      transform="matrix(.69797 0 0 .69797 11.175 10.99)" />
    <path
      d="M64.068 48.811s5.174.784 9.965 5.914c4.792 5.138 7.01 11.737 7.01 11.737M76.678 42.845s4.337 2.182 7.686 7.57c3.348 5.387 4.159 11.621 4.159 11.621M39.515 138.34s-5.219.347-10.998-3.643c-5.78-3.99-9.37-9.956-9.37-9.956M35.793 147.094s-4.845.205-10.402-2.867-9.298-8.122-9.298-8.122"
      style="fill:none;stroke:gray;stroke-width:3.56226;stroke-linecap:round;stroke-miterlimit:10;stroke-opacity:1"
      transform="translate(5.13 -20.147)scale(.78374)" />
  </g>
</svg>
  `
const svgDataUri = `data:image/svg+xml;base64,${btoa(svg)}`
console.log(
  '%c ',
  `
  padding-left:${width}px;
  padding-bottom:${height}px;
  background-image: url(${svgDataUri});
  background-repeat: no-repeat;
`,
)
console.log(`👀 Hope you find something interesting here 😜`)