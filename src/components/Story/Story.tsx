import { useParams } from '@vkontakte/vk-mini-apps-router'
import { useEffect, useState } from 'react'
import { getStory } from '../../api'

export default function Story() {
	const params = useParams<'id'>()
	const paramId = Number(params?.id) || 0

	type TStory = {
		by: string
		descendants: number
		id: number
		score: number
		time: number
		title: string
		type: string
		url: string
		kids?: number[]
	}

	const [story, setStory] = useState<TStory>()
	useEffect(() => {
		getStory(paramId).then((data) => data && data.url && setStory(data))
	}, [paramId])

	return (
		<div>
			<p>{story?.title}</p>
			<p>{story?.url}</p>
			<p>{story?.time}</p>
			<p>{story?.by}</p>
			<p>{story?.kids?.length || 0}</p>
		</div>
	)
}
