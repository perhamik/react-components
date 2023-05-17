import React from 'react'

import {mergeWithAdditionalClassName, ComponentProps} from '@src/lib'
import {CardBody} from './CardBody'
import {CardImg} from './CardImg'
import {CardText} from './CardText'
import {CardTitle} from './CardTitle'
import styles from './Card.module.scss'

export const Card = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName(`card ${styles.card}`, className)}>{children}</div>
}

export default Object.assign(Card, {Body: CardBody, Title: CardTitle, Text: CardText, Img: CardImg})
