import React from 'react'
import {mergeWithAdditionalClassName, ComponentProps} from '../utils'

export type ListGroupItemProps = ComponentProps & {
	active?: boolean
	onClick?: Function
	disabled?: boolean
}

export const staticClassNames = [
	'd-flex',
	'justify-content-between',
	'align-items-start',
	'list-group-item',
	'list-group-item-action',
]

export const ListGroupItem = ({active, disabled, onClick, children}: ListGroupItemProps) => {
	const stateClassName = !!disabled ? 'disabled' : !!active ? 'active' : ''

	const handleClick = (e: React.MouseEvent) => {
		onClick && onClick(e)
	}

	return (
		<button
			type="button"
			className={mergeWithAdditionalClassName(stateClassName, [...staticClassNames])}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
