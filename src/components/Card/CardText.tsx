import React from 'react'

import {ComponentProps} from '@src/lib'
import styles from './Card.module.scss'

export const CardText = ({children}: ComponentProps) => {
	return (
		<p className={`card-text ${styles.card__text}`}>
			<span className={styles.card__text__content}>{children}</span>
		</p>
	)
}
