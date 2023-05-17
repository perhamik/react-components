import React from 'react'

import {ComponentProps} from '@src/lib'
import styles from './Card.module.scss'

export const CardTitle = ({children}: ComponentProps) => {
	return <h5 className={`card-title ${styles.card__title}`}>{children}</h5>
}
