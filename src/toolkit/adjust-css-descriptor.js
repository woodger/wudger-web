export default function adjustCSSDescriptor(value, unit = 'px') {
  return /\d$/.test(value) ?
    value += unit : value;
}
