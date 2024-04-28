import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { Panel, Root, View, SplitCol, SplitLayout } from '@vkontakte/vkui'
import React from 'react'
import Home from './components/Home/Home'
import Story from './components/Story/Story'

function App() {
	const { view: activeView, panel: activePanel } = useActiveVkuiLocation()

	return (
		<SplitLayout style={{ justifyContent: 'center' }}>
			<SplitCol width='100%' maxWidth='1024px' stretchedOnMobile autoSpaced>
				<Root activeView={activeView as string}>
					<View nav='default_view' activePanel={activePanel as string}>
						<Panel nav='home'>
							<Home />
						</Panel>
						<Panel nav='story'>
							<Story />
						</Panel>
					</View>
				</Root>
			</SplitCol>
		</SplitLayout>
	)
}

export default App
