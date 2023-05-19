export enum Variant {
	full = 'full',
	half = 'half',
	empty = 'empty',
}

const isEmptyValue = (current: number, total: number): boolean => current - total === 1
const isHalfValue = (current: number, total: number): boolean =>
	Math.floor(total) !== Math.ceil(total) && Math.floor(total) === current

export const getInitialList = (value: number, total: number): Array<Variant> => {
	return Array(total)
		.fill(Variant.full)
		.map((item, id) => {
			if (isHalfValue(id, value)) return Variant.half
			if (isEmptyValue(id, value)) return Variant.empty

			return item
		})
}
