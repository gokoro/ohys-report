// Colors are directly referred from '@radix-ui/colors'.
// Using imported variables are prohibited when calling stylex-related functions.
// Look at the details:
// https://github.com/facebook/stylex/issues/112
// import {} from '@radix-ui/colors'
import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
  gray1: '#fcfcfc',
  gray2: '#f9f9f9',
  gray3: '#f0f0f0',
  gray4: '#e8e8e8',
  gray5: '#e0e0e0',
  gray6: '#d9d9d9',
  gray7: '#cecece',
  gray8: '#bbbbbb',
  gray9: '#8d8d8d',
  gray10: '#838383',
  gray11: '#646464',
  gray12: '#202020',

  green1: '#fbfefc',
  green2: '#f4fbf6',
  green3: '#e6f6eb',
  green4: '#d6f1df',
  green5: '#c4e8d1',
  green6: '#adddc0',
  green7: '#8eceaa',
  green8: '#5bb98b',
  green9: '#30a46c',
  green10: '#2b9a66',
  green11: '#218358',
  green12: '#193b2d',
})

export const fontFamily = stylex.defineVars({
  inter: 'Inter',
  cal: 'cal-sans',
})
