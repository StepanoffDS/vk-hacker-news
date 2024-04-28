import { useParams } from '@vkontakte/vk-mini-apps-router'
import { useEffect, useState } from 'react'
import { getStory, getStoryIds } from '../../api'
import { TStory } from './TStory'
import {
	Button,
	Card,
	CardGrid,
	ContentCard,
	Group,
	Link,
	Text,
	Title,
} from '@vkontakte/vkui'
import CommentCard from './CommentCard'
import { mapTime } from '../../utils/mapTime'

export default function Story() {
	const params = useParams<'id'>()
	const paramId = Number(params?.id) || 0
	const [story, setStory] = useState<TStory>()

	function updateStory() {
		getStory(paramId).then((data) => data && data.url && setStory(data))
	}

	useEffect(() => {
		updateStory()
	}, [])

	console.log(story)

	return (
		<Group>
			<p>{story?.id}</p>
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
			<CardGrid size='l'>
				{story?.kids?.map((id) => (
					<CommentCard key={id} commentId={id} />
				))}
			</CardGrid>
		</Group>
	)
}
