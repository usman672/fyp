import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
const color = {
  blue: '#6b7fea',
  primary: '#ff1616',
  brandRed: '#ff1616',
  brandRedOpacity: 'rgba(255, 22, 22, 0.6)',
  darkBlue: '#030EF7',
  darkgray: '#252333',
  black: 'black',
  blackOpacity: 'rgba(0,0,0,0.4)',
  gray: 'gray',
  nearwhite: '#FAFBFD',
  white: 'white',
  sky: 'CAFEF6',
  lightBlue: '#3E83C1',
  orange: '#F67E20',
  badgeIconColor: '#3E83C1',
  separatorColor: '#BFBFBF',
  lightGrey: '#808080',
  starIcon: '#EBE405',
  transparent: 'transparent',
  purple: '#DF6DF1',
  lightGrey2: '#A7A6A6',
  lightGrey3: '#EAE8E8',
  lightGrey4: '#D1D0D0',
  orangeOpacity: 'rgba(246, 155, 31 ,0.9)',
  nearGray: '#6E6D6C',
  lightGreyOpacity: 'rgba(226, 226, 228,0.9)',
  nearGray1: '#E6E6E6',
};

module.exports.color = color;

const neomorph = {
  elevation: 3,
  cornerRadius: 10,
};

module.exports.neomorph = neomorph;

module.exports.s = StyleSheet.create({
  topPadding: (StatusBar.currentHeight || (20 * height) / 667) + 10,
  height,
  width,
  br: (px) => ({
    marginTop: (px * height) / 667,
  }),
  scrollview: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
  },
  container_space_between: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: color.white,
  },
  loaderContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  loader: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSettingHeader: {
    marginTop: 5,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //header CardView
  headerCard: {
    height: 65,
    justifyContent: 'center',
  },
  blueHeaderCard: {
    height: 65,
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  profileheaderCard: {
    height: 65,
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  inputView: {
    margin: 10,
    // backgroundColor: color.white,
    width: '100%',
  },
  dropDownView: {
    padding: 10,
    // backgroundColor: color.white,
    width: '100%',
  },
  productcardView: {
    margin: 5,
    width: (30 * width) / 100,
    marginLeft: 5,
  },
  inputHeading: {
    alignSelf: 'flex-start',
    fontFamily: 'Avenir',
    color: color.black,
  },
  inputCard: {
    marginTop: 10,
    marginRight: 20,
    height: 50,
    paddingLeft: 10,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCard: {
    width: (30 * width) / 100,
    backgroundColor: color.white,
  },
  inputField: {
    width: '100%',
    height: 50,
    fontFamily: 'Avenir',
  },
  sellProductDec: {
    marginTop: 5,
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 14,
  },
  inputValidateIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15,
    paddingRight: 5,
  },
  inputPasswordShow: {
    position: 'absolute',
    right: 26,
    bottom: 15,
  },
  leftrow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  middle: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'white',
    paddingBottom: (26 * height) / 667,
  },

  inputbox: {
    width: '100%',
    marginTop: (20 * height) / 667,
    borderBottomWidth: 1,
    borderColor: '#EAE7DF',
    marginRight: (10 * height) / 667,
  },

  input: {
    // height: 22 * height / 667
  },

  //Modal
  loaderCard: {
    margin: 80,
    padding: 20,
    borderRadius: 20,
    backgroundColor: color.nearGray1,
    alignItems: 'center',
  },
  loaderCardinfo: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: color.nearGray1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  pickerModal: {
    backgroundColor: color.trasparent,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pickerCard: {
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: color.nearGray1,
    alignItems: 'center',
    height: (40 * height) / 100,
    width: (80 * width) / 100,
  },
  modal: {
    backgroundColor: color.trasparent,
    flex: 1,
    justifyContent: 'center',
  },

  NaTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  NaText: {
    textAlign: 'center',
    fontSize: 15,
    color: color.lightGrey,
  },

  //Button
  buttonText: {
    fontSize: 16,
    color: color.white,
  },
  buttonBlackText: {
    fontSize: 16,
    color: color.black,
  },
  buttonLoader: {
    marginRight: 10
  },

  //Tabs
  tabTitle: {
    color: color.primary,
  },
  activeTab: {
    backgroundColor: color.primary,
    height: 3,
  },

  // Tabs  Header
  headerLogo: {
    height: 40,
    width: 40,
    margin: 10,
  },
  headerTitleFont: {
    fontWeight: 'bold',
  },
  // Tab Icons

  tabIcons: {
    fontSize: 28,
  },
  tabLabelColor: {
    color: 'white',
    fontSize: 14,
  },
  // Notification Texts Design

  notificationText: {
    color: '#B0B0B0',
    marginLeft: '3%',
    fontSize: 16,
  },

  messageContainer: {
    marginTop: 10,
    marginBottom: 10,
  },

  //Photos
  photo_100: {
    width: '100%',
    height: '100%',
  },

  //Titles & Headings
  title_1_normal: {
    fontSize: 14,
    marginLeft: '5%',
    marginTop: '7%',
  },
  title_1_bold: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: '7%',
    marginTop: '7%',
  },
   save_search: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle_normal: {
    color: color.lightGrey2,
    fontSize: 14,
    marginLeft: '7%',
    marginTop: '3%',
  },
  subtitle_general: {
    color: color.lightGrey2,
    fontSize: 13,
    marginTop: '3%',
  },
  text_normal: {
    fontSize: 14,
    marginLeft: '5%',
  },

  buttonbox: (backgroundColor, borderColor, alignSelf, width = '90%') => ({
    alignSelf: alignSelf,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    margin: (10 * height) / 667,
    height: (40 * height) / 667,
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor,
    borderColor,
  }),
  Orderbutton: (backgroundColor, borderColor, alignSelf, width = '90%') => ({
    alignSelf: alignSelf,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    margin: (5 * height) / 667,
    height: 27,
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor,
    borderColor,
  }),

  smallbuttonbox: (backgroundColor, borderColor) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginBottom: (10 * height) / 667,
    height: (27 * height) / 667,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor,
    borderColor,
  }),

  image: (w, h) => ({
    width: (w * height) / 667,
    height: (h * height) / 667,
    resizeMode: 'contain',
  }),

  text: (fontSize, lineHeight, fontWeight, textAlign, c) => ({
    fontSize: (fontSize * height) / 667,
    lineHeight: (lineHeight * height) / 667,
    fontWeight,
    textAlign,
    color: c,
  }),
});
