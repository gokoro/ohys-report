import * as stylex from '@stylexjs/stylex'

import { colors } from '../styles/vars.stylex'

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const styles = stylex.create({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.gray6,
    borderRadius: 8,
    letterSpacing: 0.3,
    backgroundColor: {
      default: colors.gray3,
      ':hover': colors.gray4,
      ':active': colors.gray5,
    },
  },
  disabled: {
    backgroundColor: colors.gray3,
  },
  container: { margin: '0 1em', lineHeight: '250%' },
})

export function Button({ children, disabled, ...props }: CommonButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      {...stylex.props(styles.root, disabled && styles.disabled)}
    >
      <div {...stylex.props(styles.container)}>{children}</div>
    </button>
  )
}
