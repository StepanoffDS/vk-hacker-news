import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import bridge from '@vkontakte/vk-bridge'
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import {
	RouterProvider,
	createHashRouter,
} from '@vkontakte/vk-mini-apps-router'

bridge.send('VKWebAppInit')

const router = createHashRouter([
	{
		path: '/',
		panel: 'home',
		view: 'default_view',
	},
	{
		path: '/story/:id',
		panel: 'story',
		view: 'default_view',
	},
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<RouterProvider router={router}>
						<App />
					</RouterProvider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	</React.StrictMode>
)
