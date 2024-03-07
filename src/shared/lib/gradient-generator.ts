import Gradient from 'javascript-color-gradient';

export const GRADIENT_FROM = '#7cff11';
export const GRADIENT_TO = '#db4321';

const gradientGenerator = new Gradient().setColorGradient(
  GRADIENT_FROM,
  GRADIENT_TO,
);

export function getGradientMap(arr: number[]) {
  const gradients = gradientGenerator.setMidpoint(arr.length).getColors();

  return Object.fromEntries(arr.map((val, i) => [val, gradients[i]]));
}
