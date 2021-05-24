import { Dimensions, PixelRatio } from 'react-native';
import * as React from 'react';
export const navigationRef = React.createRef();
export function Navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
let { width, height } = Dimensions.get('window');

const widthToDp = (number) => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = (number) => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

const listenToOrientationChange = (ref) => {
  Dimensions.addEventListener('change', (newDimension) => {
    width = newDimension.screen.width;
    height = newDimension.screen.height;
    ref.setState({ orientation: height > width ? 'portrait' : 'landscape' });
  });
};

const removeOrientationChange = () => {
  Dimensions.removeEventListener('change');
};

const getDynamicStyle = (portraitStyle, landscapeStyle) => {
  const isPortrait = height > width;
  if (isPortrait) {
    return portraitStyle;
  } else {
    return landscapeStyle;
  }
};
export {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
  getDynamicStyle,
};
