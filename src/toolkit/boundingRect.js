import adjustCSSDescriptor from './adjustCSSDescriptor.js';

export default function boundingRect(width, height) {
  width = adjustCSSDescriptor(width);
  height = adjustCSSDescriptor(height);

  return `width:${width};height:${height}`;
}
