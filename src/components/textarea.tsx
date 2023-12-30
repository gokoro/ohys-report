import { forwardRef } from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function _Textarea(
  { style, ...props }: Props,
  ref: React.Ref<HTMLTextAreaElement>
) {
  return <textarea {...props} ref={ref}></textarea>
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(_Textarea)
