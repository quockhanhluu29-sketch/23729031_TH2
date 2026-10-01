module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@services': './src/services',
          '@stores': './src/stores',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};