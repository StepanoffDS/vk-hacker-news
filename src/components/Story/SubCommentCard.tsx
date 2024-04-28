import { useEffect, useState } from 'react'
import { getStory } from '../../api'
import { TStory } from './TStory'
import { ContentCard } from '@vkontakte/vkui'
import convertTextToHtml from '../../utils/convertTextToHtml'

export default function SubCommentCard({
	subCommentId,
}: {
	subCommentId: number
}) {
	const [subComment, setSubComment] = useState<TStory>()

	useEffect(() => {
		getStory(subCommentId).then((data) => setSubComment(data))
	}, [])

	return (
		<ContentCard
			mode='tint'
			header={subComment?.by}
			text={convertTextToHtml(subComment?.text || '')}
		/>
	)
}
