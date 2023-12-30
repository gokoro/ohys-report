interface RootProps {
  children?: React.ReactNode
}

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export function Root(props: RootProps) {
  return <ul>{props.children}</ul>
}

export function Item(props: ItemProps) {
  const { children, style } = props
  return <li {...props}>{children}</li>
}
