import React from 'react'

import {ComponentProps, mergeWithAdditionalClassName} from '../utils'

export const CardBody = ({children, className, style}: ComponentProps) => {
	return (
		<div className={mergeWithAdditionalClassName(`card-body`, className)} style={style}>
			{children}
		</div>
	)
}
