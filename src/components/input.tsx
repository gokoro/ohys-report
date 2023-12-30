import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function _Input({ style, ...props }: Props, ref: React.Ref<HTMLInputElement>) {
  return <input {...props} ref={ref}></input>
}

export const Input = forwardRef<HTMLInputElement, Props>(_Input)
