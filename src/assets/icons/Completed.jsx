import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Completed = ({
  color = 'currentColor',
  width = 24,
  height = 24,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color} // Renk prop'u burada kullanılıyor
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

export default Completed;
