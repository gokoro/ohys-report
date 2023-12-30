interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function Button({ children, style, ...props }: CommonButtonProps) {
  return <button {...props}>{children}</button>
}
