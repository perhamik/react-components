import React from 'react'

import {ComponentProps} from '../utils'
import styles from './List.module.scss'
import {ListGroupItem} from './ListGroupItem'

export const ListGroup = ({children}: ComponentProps) => {
	return <ul className={`list-group ${styles.list}`}>{children}</ul>
}

export default Object.assign(ListGroup, {Item: ListGroupItem})
