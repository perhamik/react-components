import React from 'react'

import {ComponentProps, mergeWithAdditionalClassName} from './utils'

export const Row = ({children, className, style}: ComponentProps) => {
	return (
		<div className={mergeWithAdditionalClassName('row', className)} style={style}>
			{children}
		</div>
	)
}

export default Row
