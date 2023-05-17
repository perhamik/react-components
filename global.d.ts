export {}

// declare module '*.scss' {
// 	const content: Record<string, string>
// 	export default content
// }

declare global {
	declare module '*.scss'

	type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
		? Acc[number]
		: Enumerate<N, [...Acc, Acc['length']]>

	type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
}
