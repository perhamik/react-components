export enum Variant {
	full = 'full',
	half = 'half',
	empty = 'empty',
}

const isFullValue = (current: number, total: number): boolean => current < total
const isHalfValue = (current: number, total: number): boolean =>
	Math.floor(total) !== Math.ceil(total) && Math.floor(total) === current

export const getInitialList = (value: number, total: number): Array<Variant> => {
	return Array(total)
		.fill(Variant.empty)
		.map((item, id) => {
			if (isHalfValue(id, value)) return Variant.half
			if (isFullValue(id, value)) return Variant.full

			return item
		})
}
