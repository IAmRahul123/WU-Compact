jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/utils/commonNavigationController', () => ({
  navigate: jest.fn(),
  reset: jest.fn(),
}));

jest.mock('i18next');
jest.mock('react-i18next');

// // ✅ Mock TurboModules that crash (like DevMenu)
// jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry.js', () => ({
//   getEnforcing: () => ({}),
// }));

// // ✅ Mock Dimensions and PixelRatio
// jest.mock('react-native', () => {
//   const RN = jest.requireActual('react-native');

//   return {
//     ...RN,
//     Dimensions: {
//       get: jest.fn().mockReturnValue({width: 375, height: 812}),
//     },
//     PixelRatio: {
//       get: () => 2,
//       roundToNearestPixel: jest.fn(n => Math.round(n)),
//     },
//     NativeModules: {
//       ...RN.NativeModules,
//       DevSettings: {}, // Avoid TurboModule crash
//     },
//   };
// });
