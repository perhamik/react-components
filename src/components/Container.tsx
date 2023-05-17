import React from 'react'
import {ComponentProps} from '@src/lib'

export const Container = ({children}: ComponentProps) => {
	return <div className="container">{children}</div>
}
