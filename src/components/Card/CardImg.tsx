import React from 'react'

import {mergeWithAdditionalClassName} from '@src/lib'

export type CardImgProps = {
	variant?: 'top' | 'bottom' | string
	style?: React.CSSProperties
	src: string
	width: number
	height: number
}

export const CardImg = ({variant, src, width, height, ...props}: CardImgProps) => {
	return (
		<img
			className={mergeWithAdditionalClassName('card-img', variant ? `card-img-${variant}` : '')}
			src={src}
			width={width}
			height={height}
			alt="Card image"
			{...props}
		/>
	)
}
