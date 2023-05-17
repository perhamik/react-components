import React from 'react'

import {mergeWithAdditionalClassName, ComponentProps} from '@src/lib'
import {NavbarBrand} from './NavbarBrand'

const Navbar = ({children, className}: ComponentProps) => {
	return (
		<nav className={mergeWithAdditionalClassName('navbar header__navbar', className)}>
			<div className="container-fluid">{children}</div>
		</nav>
	)
}

export default Object.assign(Navbar, {Brand: NavbarBrand})
