import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { useEffect, useState } from 'react'
import { getStory } from '../../api'
import { TStory } from './TStory'
import { Button, CardGrid, Group, Link, Text, Title } from '@vkontakte/vkui'
import CommentCard from './CommentCard'
import { mapTime } from '../../utils/mapTime'

export default function Story() {
	const params = useParams<'id'>()
	const paramId = Number(params?.id) || 0
	const [story, setStory] = useState<TStory>()

	const routeNavigator = useRouteNavigator()

	function updateStory() {
		getStory(paramId).then((data) => data && data.url && setStory(data))
	}

	useEffect(() => {
		updateStory()
	}, [])

	return (
		<Group>
			<Button
				style={{ marginBottom: '1rem' }}
				onClick={() => routeNavigator.back()}
			>
				Back
			</Button>
			<Title style={{ marginBottom: '1rem' }}>{story?.title}</Title>
			<Text style={{ marginBottom: '0.8rem' }}>
				Link:{' '}
				<Link href={story?.url} target='_blank'>
					{story?.url}
				</Link>
			</Text>
			<Text style={{ marginBottom: '0.8rem' }}>
				{mapTime(story?.time ?? 0)} ago
			</Text>
			<Text style={{ marginBottom: '0.8rem' }}>Author: {story?.by}</Text>
			<Button style={{ marginBottom: '0.8rem' }} onClick={() => updateStory()}>
				Update Comments
			</Button>
			<Text style={{ marginBottom: '0.8rem' }}>
				COMMENTS ({story?.kids?.length || 0}){' '}
			</Text>
			{story?.kids && story.kids.length > 0 ? (
				<CardGrid size='l'>
					{story?.kids?.map((id) => (
						<CommentCard key={id} commentId={id} />
					))}
				</CardGrid>
			) : (
				<Text>No comments</Text>
			)}
		</Group>
	)
}
