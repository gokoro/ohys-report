import * as stylex from '@stylexjs/stylex'

import { colors } from '../styles/vars.stylex'

interface RootProps {
  children?: React.ReactNode
}

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  interactable?: boolean
  isActive?: boolean
  isHierarchy?: boolean
}

const listStyles = stylex.create({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    borderRadius: 8,
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  interactable: {
    cursor: 'pointer',
  },
  interactableText: {
    color: { default: colors.gray10, ':hover': colors.gray11 },
  },
  active: {
    color: colors.gray12,
    boxShadow: `inset 0 -6px 0 rgb(from ${colors.green8} r g b / 80%)`,
  },
  arrowIcon: {
    color: colors.gray8,
  },
})

export function Root(props: RootProps) {
  return <ul {...stylex.props(listStyles.root)}>{props.children}</ul>
}

export function Item({
  children,
  interactable,
  isActive,
  isHierarchy,
  ...props
}: ItemProps) {
  return (
    <li
      {...props}
      {...stylex.props(
        listStyles.item,
        interactable && listStyles.interactable
      )}
    >
      <span
        {...stylex.props(
          interactable && listStyles.interactableText,
          isActive && listStyles.active
        )}
      >
        {children}
      </span>
      {isHierarchy && <span {...stylex.props(listStyles.arrowIcon)}>&gt;</span>}
    </li>
  )
}
