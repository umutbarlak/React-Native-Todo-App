import * as React from 'react';
import Svg, {Circle, Line, Path} from 'react-native-svg';
const Notification = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-circle-x"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="m15 9-6 6" />
    <Path d="m9 9 6 6" />
  </Svg>
);
export default Notification;
