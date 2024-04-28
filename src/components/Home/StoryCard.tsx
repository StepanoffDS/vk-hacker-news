import { useEffect, useState } from 'react'
import { getStory } from '../../api'
import { Card, Subhead, Title, Button, Text } from '@vkontakte/vkui'
import { RouterLink, useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { mapTime } from '../../utils/mapTime'

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

export default function StoryCard({ storyId }: { storyId: number }) {
	const [story, setStory] = useState<TStory>()
	useEffect(() => {
		getStory(storyId).then((data) => data && data.url && setStory(data))
	}, [storyId])

	const routeNavigator = useRouteNavigator()

	return story && story.url ? (
		<Card
			style={{
				padding: '1rem',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Title level='2' style={{ marginBottom: '0.5rem' }}>
				{story?.title}
			</Title>
			<Subhead
				style={{
					marginTop: 'auto',
					marginBottom: '2rem',
				}}
			>
				Rating: {story?.score}
			</Subhead>
			<Title
				level='3'
				style={{
					marginTop: 'auto',
					marginBottom: '0.5rem',
				}}
			>
				By: {story?.by}
			</Title>

			<Text
				style={{
					marginTop: 'auto',
					marginBottom: 0,
				}}
			>
				Posted: {mapTime(story?.time ?? 0)} ago
			</Text>

			<Button
				style={{
					marginTop: '2rem',
				}}
				onClick={() => routeNavigator.push(`/story/${storyId}`)}
			>
				Go to Story
			</Button>
		</Card>
	) : null
}
