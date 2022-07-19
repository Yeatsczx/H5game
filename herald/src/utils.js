const scale = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
const random = (min, max) => {
  return scale(Math.random(), 0, 1, min, max);
};
const randomOne = (arr) => {
  return arr[Math.floor(random(0, arr.length))];
};