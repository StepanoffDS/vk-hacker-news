import { useEffect, useState } from 'react'
import { Button, CardGrid, Group, Header, Title } from '@vkontakte/vkui'
import { getStoryIds, getStory } from '../../api'
import StoryCard from './StoryCard'

export default function Home() {
	const [storyIds, setStoryIds] = useState([])

	function storiesIdsUpdate() {
		getStoryIds().then((data) => setStoryIds(data))
	}

	useEffect(() => {
		storiesIdsUpdate()
		// setInterval(() => {
		// 	storiesIdsUpdate()
		// }, 60000)
	}, [])

	return (
		<Group>
			<Title style={{ margin: '0px 8px' }} level='1'>
				Home
			</Title>
			<Button style={{ margin: '1rem 8px' }} onClick={() => storiesIdsUpdate()}>
				Update Stories
			</Button>
			<CardGrid size='m' style={{ alignItems: 'stretch' }}>
				{storyIds.slice(0, 100).map((storyId) => (
					<StoryCard key={storyId} storyId={storyId} />
				))}
			</CardGrid>
		</Group>
	)
}
