interface RootProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

interface ItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export function Root({ children, style, ...props }: RootProps) {
  return <select {...props}>{children}</select>
}

export function Item({ children, style, ...props }: ItemProps) {
  return <option {...props}>{children}</option>
}
