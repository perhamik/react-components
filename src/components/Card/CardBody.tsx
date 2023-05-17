import React from 'react'

import {mergeWithAdditionalClassName, ComponentProps} from '@src/lib'
import styles from './Card.module.scss'

export const CardBody = ({children, className, style}: ComponentProps) => {
	return (
		<div
			className={mergeWithAdditionalClassName(`card-body ${styles.card__body}`, className)}
			style={style}
		>
			{children}
		</div>
	)
}
