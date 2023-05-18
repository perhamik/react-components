import React from 'react'

import {ComponentProps, mergeWithAdditionalClassName} from '../utils'
import {NavbarBrand} from './NavbarBrand'

export const Navbar = ({children, className}: ComponentProps) => {
	return (
		<nav className={mergeWithAdditionalClassName('navbar header__navbar', className)}>
			<div className="container-fluid">{children}</div>
		</nav>
	)
}

export default Object.assign(Navbar, {Brand: NavbarBrand})
