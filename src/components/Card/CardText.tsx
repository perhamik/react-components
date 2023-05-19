import React from 'react'

import {ComponentProps} from '../utils'

export const CardText = ({children}: ComponentProps) => {
	return (
		<p className={`card-text`}>
			<span className="card-text-content">{children}</span>
		</p>
	)
}
