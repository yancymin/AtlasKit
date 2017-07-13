// ==============================
// PRIVATE
// ==============================

// Function for calculating one prop value into one prop of a keyframe. i.e
// For arguments: ({
//    property: 'transform',
//    value: interpolate`translateY(${t => t}px) translateX(${t => t}px)`,
//    deltas: [{ from: 0, to: -200 }, { from: 0, to: -50 }]
// }, 0.5)
//
// Will output: transform: translateY(-100px) translateX(-25px);
function calculateValue({ deltas, value }, mod) {
  const modifiedDeltas = deltas.map(({ from, to }) => (
    from + ((to - from) * mod)
  ));

  return value ? value(modifiedDeltas) : modifiedDeltas[0];
}

// Function used to create the content inside each keyframe.
function calculateKeyframe(options, mod) {
  if (!Array.isArray(options)) {
    throw new Error(`Animation mixin expects an array, but received \`${typeof options}\``);
  }
  return options.map(opt => `${opt.property}: ${calculateValue(opt, mod)};`)
    .join('\n')
    .trim();
}

// ==============================
// PUBLIC
// ==============================

// Create an animation by defining an object with the following properties:
//
// const slideUpAndRight = {
//   property: 'transform',
//   value: interpolate`translateY(${y => y}px) translateX(${x => x}px)`,
//   deltas: [{ from: 0, to: -200 }, { from: 0, to: 100 }],
// };
// const fadeOut = {
//   property: 'opacity',
//   deltas: [{ from: 1, to: 0 }],
// };
//
// Animation options require:
//   - @property [String] is the name of a CSS property (i.e 'transform')
//   - @value [Function] use the `interpolate` function as a tagged template
//     literal to evaluate the value for each keyframe.
//     NOTE: The @value prop can be omitted when the value directly maps to
//     a number, and doesn't need to be transformed. For instance with `opacity`.
//   - @deltas [ArrayOfObjects]
//     - @from [Number] the start value
//     - @to [Number] the end value
//
// Pass the options as an array to one of the mixins below. i.e.
// const keyframes = akAnimationMixins.createBold([slideUp, fadeOut]);

export function createBold(options) {
  return `
    0% {
      ${calculateKeyframe(options, 0)};
      animation-timing-function: cubic-bezier(0.23830050393398, 0, 0.25586732616931, 0.79011192334632);
    }
    20% {
      ${calculateKeyframe(options, 0.8)};
      animation-timing-function: cubic-bezier(0.21787238302442, 0.98324004924648, 0.58694150667646, 1);
    }
    100% {
      ${calculateKeyframe(options, 1)};
    }
  `;
}

export function createOptimistic(options) {
  return `
    0% {
      ${calculateKeyframe(options, 0)};
      animation-timing-function: cubic-bezier(0.33333333, 0, 0.4, 1);
    }
    20% {
      ${calculateKeyframe(options, 1.05)};
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    76% {
      ${calculateKeyframe(options, 0.975)};
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      ${calculateKeyframe(options, 1)};
    }
  `;
}

export function createCombined(options) {
  return `
    0% {
      ${calculateKeyframe(options, 0)};
      animation-timing-function: cubic-bezier(0.4, 0, 0.15, 1);
    }
    50% {
      ${calculateKeyframe(options, 1.1)};
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      ${calculateKeyframe(options, 1)};
    }
  `;
}

// Function to be used as a tagged template literal that evaluates it's
// value given the progress through an animation and concatenates
export function interpolate(strings, ...expressions) {
  return (mods) => {
    if (expressions.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Interpolate is not required. Use a `String` or remove the value property for direct numeric mapping.');
      return strings.join('');
    }

    const results = [];

    expressions.forEach((e, i) => {
      results.push(strings[i]);
      results.push(e(mods[i]));
    });

    results.push(strings[strings.length - 1]);

    return results.join('');
  };
}

export default {
  createBold,
  createCombined,
  createOptimistic,
  interpolate,
};
