export default function adjust(value, unit = 'px') {
  return /\d$/.test(value) ?
    value += unit : value;
}
