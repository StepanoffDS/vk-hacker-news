import { useState } from 'react'
import { getStoryIds } from '../api'

export function useStoriesIds() {
	const [storyIds, setStoryIds] = useState([])

	function storiesIdsUpdate() {
		getStoryIds().then((data) => setStoryIds(data))
	}
}
