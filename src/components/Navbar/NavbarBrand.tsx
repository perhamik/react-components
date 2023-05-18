import React from 'react'
import {ComponentProps} from '../utils'

export type NavbarBrandProps = ComponentProps & {
	href: {pathname: string}
}

export const NavbarBrand = ({href, children}: NavbarBrandProps) => {
	return (
		<a href={href.pathname} className="link navbar-brand text-white">
			{children}
		</a>
	)
}
