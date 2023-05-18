import React from 'react'

import {ComponentProps} from './utils'

export const Container = ({children}: ComponentProps) => {
	return <div className="container">{children}</div>
}

export default Container
