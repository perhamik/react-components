import React from 'react'

import {ComponentProps, mergeWithAdditionalClassName} from '../utils'

export const Card = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName(`card`, className)}>{children}</div>
}
