import React from 'react'

import {ComponentProps, mergeWithAdditionalClassName} from '../utils'
import styles from './Card.module.scss'

export const Card = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName(`card ${styles.card}`, className)}>{children}</div>
}
