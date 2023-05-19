import React from 'react'

import {ComponentProps} from '../utils'

export const CardTitle = ({children}: ComponentProps) => {
	return <h5 className={`card-title`}>{children}</h5>
}
