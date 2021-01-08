import { DefaultTheme } from 'styled-components';

const common = {
  blueColor: '#0186FF',
  iconsYellowColor: '#FFD350',
  descriptionFontColor: '#848587',
};

const light: DefaultTheme = {
  ...common,
  iconsColor: '#D6DAE4',
  bodyBackgroundColor: '#EAEFF2',
  backgroundColor: 'white',
  borderColor: '#F7F8F9',
  fontColor: '#2A3F5E',
  messageBackgroundColor: '#CBD0DA',
  messageInputBackgroundColor: '#F8F8FA',
  messageFontColor: '#354967',
  myMessageFontColor: '#DEEEFF',
};

const dark: DefaultTheme = {
  ...common,
  iconsColor: '#5B5C61',
  bodyBackgroundColor: '#747A85',
  backgroundColor: '#2E2E34',
  borderColor: '#35353C',
  fontColor: '#C0C1C2',
  messageBackgroundColor: '#383C40',
  messageInputBackgroundColor: '#2F3336',
  messageFontColor: '#A5A6AA',
  myMessageFontColor: '#DEEEFF',
};

export { light, dark };
