import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'

import { colors, fontFamily } from '../styles/vars.stylex'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const styles = stylex.create({
  root: {
    fontFamily: fontFamily.inter,
    fontWeight: 500,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: colors.gray6,
    padding: '0.6em 6px',
    borderRadius: 8,
    width: 'min-content',
    boxShadow: 'none',
  },
})

function _Input({ ...props }: Props, ref: React.Ref<HTMLInputElement>) {
  return <input {...props} {...stylex.props(styles.root)} ref={ref}></input>
}

export const Input = forwardRef<HTMLInputElement, Props>(_Input)
