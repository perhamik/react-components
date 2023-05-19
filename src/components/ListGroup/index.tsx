import React from 'react'

import {ComponentProps} from '../utils'
import {ListGroupItem} from './ListGroupItem'

export const ListGroup = ({children}: ComponentProps) => {
	return <ul className={`list-group`}>{children}</ul>
}

export default Object.assign(ListGroup, {Item: ListGroupItem})
