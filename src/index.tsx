import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import fetchCache from './fetch-cache'
import ResponseView from './response-view'
import { Url } from './list-item'
import CollectionView from './collection'
import { basePath, baseUrl } from './endpoint'

const Main = styled('div')`
	background-color: white;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 480px auto;
	grid-template-rows: 8vh 8vh 74vh;
	grid-column-gap: 5vw;
	height: 100%;
	width: 100%;

	& > h1 {
		grid-column: 1 / span 2;
	}
`

const Header = styled.header`
`

const Collections = styled.ul`
	height: 74vh;
	overflow-y: auto;
`

export interface AppState {
	collections: Collections
	dtsConfig: any
	fetch: (url: string, type: DTSResponseType) => any
	lastRequestUrl: string
	lastResponse: {
		type: DTSResponseType
		value: any
	}
}
class App extends React.Component<{}, AppState> {
	state: AppState = {
		collections: null,
		dtsConfig: null,
		fetch: async (url: string, type: DTSResponseType) => {
			let value
			let lastResponse

			if (type === DTSResponseType.Json) {
				value = await fetchCache.fetchJson(url)
				lastResponse = {
					type: DTSResponseType.Json,
					value
				}
			} else if (type === DTSResponseType.Xml) {
				value = await fetchCache.fetchText(url)
				lastResponse = {
					type: DTSResponseType.Xml,
					value
				}
			}
			this.setState({ lastRequestUrl: url, lastResponse })

			return value
		},
		lastRequestUrl: null,
		lastResponse: null,
	}

	async componentDidMount() {
		const dtsConfig = await fetchCache.fetchJson(basePath)
		console.log('CONFIG', dtsConfig)
		const collections = await this.state.fetch(dtsConfig.collections, DTSResponseType.Json)

		this.setState({ collections, dtsConfig })
	}

	render() {
		if (this.state.collections == null) return null

		return (
			<Main>
				<h1>DTS browser</h1>
				<Header>
					<h2>{this.state.collections.title}</h2>
					<Url>{`${baseUrl}${this.state.dtsConfig.collections}`}</Url>
				</Header>
				<Header>
					<h2>Response</h2>
					<Url>{baseUrl}{this.state.lastRequestUrl}</Url>
				</Header>
				<Collections>
					{
						this.state.collections.member.map(collection =>
							<CollectionView
								{...this.state}
								key={collection['@id']}
								collection={collection}
							/>
						)
					}
				</Collections>
				<ResponseView {...this.state} />
			</Main>
		)
	}
}

document.addEventListener('DOMContentLoaded', async function() {
	const container = document.getElementById('container')

	ReactDOM.render(
		<App />,
		container
	)
})
