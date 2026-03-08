// PRIMITIVES (temporarily being exported for dev)
export const palette = {
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(1, 7, 13, 1)',
  red: 'rgba(227, 51, 51, 1)',
  green: 'rgba(40, 167, 69, 1)',
  yellow: 'rgba(251, 191, 36, 1)',
  gatorBlue: {
    50: 'rgba(229, 243, 255, 1)',
    100: 'rgba(207, 233, 255, 1)',
    200: 'rgba(169, 212, 255, 1)',
    300: 'rgba(117, 181, 255, 1)',
    400: 'rgba(63, 131, 255, 1)',
    500: 'rgba(20, 82, 255, 1)',
    600: 'rgba(0, 59, 255, 1)',
    700: 'rgba(0, 60, 255, 1)',
    800: 'rgba(0, 54, 227, 1)',
    900: 'rgba(0, 33, 165, 1)',
    950: 'rgba(0, 17, 102, 1)',
  },
  ufOrange: {
    50: 'rgba(255, 243, 237, 1)',
    100: 'rgba(255, 229, 213, 1)',
    200: 'rgba(254, 198, 170, 1)',
    300: 'rgba(254, 158, 115, 1)',
    400: 'rgba(252, 108, 59, 1)',
    500: 'rgba(250, 70, 22, 1)',
    600: 'rgba(235, 43, 11, 1)',
    700: 'rgba(195, 28, 11, 1)',
    800: 'rgba(155, 25, 17, 1)',
    900: 'rgba(124, 24, 18, 1)',
    950: 'rgba(67, 8, 7, 1)',
  },
};

const eventColors = {
  cardPressed: { color: palette.gatorBlue[200], opacity: 0.6 },
  labelPressed: { color: palette.black, opacity: 0.6 },
};

export const Colors = {
  // Brand
  brandPrimary: palette.ufOrange[500],
  brandPrimaryLight: palette.ufOrange[100],
  brandPrimaryDark: palette.ufOrange[700],
  brandAccent: palette.ufOrange[400],

  // Surface/Background
  surfacePrimary: palette.ufOrange[50],
  surfaceSecondary: palette.ufOrange[100],
  surfacePressed: eventColors.cardPressed,
  surfaceTertiary: palette.gatorBlue[200],
  surfaceInverse: palette.gatorBlue[900],

  // Text
  textPrimary: palette.gatorBlue[900],
  textSecondary: palette.gatorBlue[500],
  textPressed: eventColors.labelPressed,
  textDisabled: palette.gatorBlue[400],
  textInverse: palette.white,
  textLink: palette.gatorBlue[600],

  // Border
  borderPrimary: palette.gatorBlue[300],
  borderStrong: palette.gatorBlue[400],
  borderFocus: palette.ufOrange[500],
  borderDisabled: palette.gatorBlue[200],

  // Button
  // buttonPrimary: palette.ufOrange[500],
  // buttonPressed: palette.ufOrange[600],
  // buttonDisabled: palette.gatorBlue[200],
  // buttonLabelPrimary: palette.white,
  // buttonLabelDisabled: palette.gatorBlue[500],
  buttonDefaultBorder: palette.gatorBlue[900],
  buttonAcceptBorder: palette.green,
  buttonRejectBorder: palette.red,

  // Pure Colors
  baseWhite: palette.white,
  baseBlack: palette.black,

  bg: '#0F172A',
  bgCustomer: '#fff',
  // bgCustomer: "#f2f2f2",
  bgPro: '#ffa',
  bgMaster: '#ff5',
  text: '#E2E8F0',
} as const;

// FOR TESTING NEW COLORS
// export const Colors = {
//   // Brand
//   brandPrimary: palette.anyColor[500],
//   brandPrimaryLight: palette.anyColor[100],
//   brandPrimaryDark: palette.anyColor[700],
//   brandAccent: palette.anyColor[400],

//   // Surface/Background
//   surfacePrimary: palette.anyColor[50],
//   surfaceSecondary: palette.anyColor[100],
//   surfacePressed: eventColors.cardPressed,
//   surfaceTertiary: palette.gray[200],
//   surfaceInverse: palette.gray[900],

//   // Text
//   textPrimary: palette.gray[900],
//   textSecondary: palette.gray[500],
//   textDisabled: palette.gray[400],
//   textInverse: palette.white,
//   textLink: palette.anyColor[600],

//   // Border
//   borderPrimary: palette.gray[300],
//   borderStrong: palette.gray[400],
//   borderFocus: palette.anyColor[500],
//   borderDisabled: palette.gray[200],

//   // Button
//   buttonPrimary: palette.anyColor[500],
//   buttonPressed: palette.anyColor[600],
//   buttonDisabled: palette.gray[200],
//   buttonLabelPrimary: palette.white,
//   buttonLabelDisabled: palette.gray[500],
// } as const;
