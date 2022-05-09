/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  verbose: true,
};

module.exports = config;
// module.exports = {
//     clearMocks: true,
//     moduleFileExtensions: ['js'],
//     roots: ['<rootDir>'],
//     testEnvironment: 'node',
//     transform: {
//       '^.+\\.js?$': 'js-jest',
//     },
//     setupFilesAfterEnv: ['jest-extended'],
//     globals: {
//       'js-jest': {
//         diagnostics: false,
//       },
//     },
//     globalSetup: '<rootDir>/tests/setup.js',
//     globalTeardown: '<rootDir>/tests/teardown.js',
//   }