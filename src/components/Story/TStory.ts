export type TStory = {
	by: string
	descendants?: number
	id: number
	score?: number
	time: number
	title?: string
	type: string
	url?: string
	kids?: number[]
	text?: string
	deleted?: boolean
}
