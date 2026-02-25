// PRIMITIVES
const palette = {
  white: '#ffffff',
  black: '#01070D',
  red: '#E33333',
  green: '#28A745',
  yellow: '#FBBF24',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  lightCyan: {
    50: '#E1F3F7',
    100: '#CFECF2',
    200: '#AADFE8',
    300: '#86D1DE',
    400: '#62C3D5',
    500: '#3EB5CB',
    600: '#2D95A9',
    700: '#237280',
    800: '#184E58',
    900: '#091C20',
  },
  anyColor: {
    50: '',
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

const eventColors = {
  cardPressed: { color: palette.gray[200], opacity: 0.6 },
  labelPressed: { color: palette.black, opacity: 0.6 },
};

export const Colors = {
  // Brand
  brandPrimary: palette.lightCyan[500],
  brandPrimaryLight: palette.lightCyan[100],
  brandPrimaryDark: palette.lightCyan[700],
  brandAccent: palette.lightCyan[400],

  // Surface/Background
  surfacePrimary: palette.lightCyan[50],
  surfaceSecondary: palette.lightCyan[100],
  surfacePressed: eventColors.cardPressed,
  surfaceTertiary: palette.gray[200],
  surfaceInverse: palette.gray[900],

  // Text
  textPrimary: palette.gray[900],
  textSecondary: palette.gray[500],
  textPressed: eventColors.labelPressed,
  textDisabled: palette.gray[400],
  textInverse: palette.white,
  textLink: palette.lightCyan[600],

  // Border
  borderPrimary: palette.gray[300],
  borderStrong: palette.gray[400],
  borderFocus: palette.lightCyan[500],
  borderDisabled: palette.gray[200],

  // Button
  buttonPrimary: palette.lightCyan[500],
  buttonPressed: palette.lightCyan[600],
  buttonDisabled: palette.gray[200],
  buttonLabelPrimary: palette.white,
  buttonLabelDisabled: palette.gray[500],

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
