import { useEffect, useState } from 'react'
import { getStory } from '../../api'
import { TStory } from './TStory'
import { Button, CardGrid, ContentCard } from '@vkontakte/vkui'
import convertTextToHtml from '../../utils/convertTextToHtml'
import SubCommentCard from './SubCommentCard'

export default function CommentCard({ commentId }: { commentId: number }) {
	const [comment, setComment] = useState<TStory>()
	const [showSubComments, setShowSubComments] = useState(false)

	useEffect(() => {
		getStory(commentId).then((data) => setComment(data))
	}, [])

	return (
		<>
			<ContentCard
				header={comment?.by}
				text={
					comment?.deleted
						? 'Comment deleted'
						: convertTextToHtml(comment?.text || '')
				}
			/>

			{comment?.kids && comment.kids.length > 0 && (
				<Button
					style={{ marginTop: '0.5rem' }}
					onClick={() => setShowSubComments(!showSubComments)}
				>
					{showSubComments ? 'Hide' : 'Show'} Sub-comments
				</Button>
			)}

			{showSubComments && comment?.kids && comment.kids.length > 0 && (
				<CardGrid size='l' style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
					{comment?.kids?.map((id) => (
						<SubCommentCard key={id} subCommentId={id} />
					))}
				</CardGrid>
			)}
		</>
	)
}
