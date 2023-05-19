import React from 'react'

import {Star} from './Star'
import {StarFull} from './StarFull'
import {StarHalf} from './StarHalf'
import {getInitialList} from './utils'
import {Variant} from './utils'

export type StarIconProps = {
	type: Variant
}

export type StarIconGroupProps = {
	value: number
	total?: number
}

export const StarIcon = ({type}: StarIconProps) => {
	if (type === Variant.half) return <StarHalf />
	else if (type === Variant.empty) return <Star />

	return <StarFull />
}

export const StarIconGroup = ({value = 4, total = 5}: StarIconGroupProps) => {
	const list = getInitialList(value, total)
	return <>{list.length > 0 && list.map((type, id) => <StarIcon key={`${type}_${id}`} type={type} />)}</>
}

export default StarIconGroup
