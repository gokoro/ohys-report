import * as stylex from '@stylexjs/stylex'

import { colors, fontFamily } from '../styles/vars.stylex'

interface RootProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

interface ItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const styles = stylex.create({
  root: {
    fontFamily: fontFamily.inter,
    fontWeight: 500,
    letterSpacing: -0.3,

    borderWidth: 1.5,
    borderColor: colors.gray6,
    borderRadius: 8,

    padding: '0.5em 4px',
  },
})

export function Root({ children, ...props }: RootProps) {
  return (
    <select {...props} {...stylex.props(styles.root)}>
      {children}
    </select>
  )
}

export function Item({ children, ...props }: ItemProps) {
  return <option {...props}>{children}</option>
}
