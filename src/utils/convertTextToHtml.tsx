import { ReactNode } from 'react'

export default function convertTextToHtml(text: string): ReactNode {
	const parser = new DOMParser()
	const doc = parser.parseFromString(text, 'text/html')
	return (
		<div dangerouslySetInnerHTML={{ __html: doc.documentElement.innerHTML }} />
	)
}
