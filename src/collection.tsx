import * as React from 'react'
import styled from '@emotion/styled'
import Members from './members'
import { AppState } from '.'
import ListItem from './list-item'

const Li = styled.li`
	cursor: pointer;
	font-size: 1rem;
	margin-bottom: 1rem;

	& > img {
		margin-right: .25em;
	}

	& > ul {
		margin: 1em 0 2em 1em;
	}
`

interface Props extends AppState {
	collection: Collection
}
interface State {
	active: boolean
	members: any[]
}
export default class CollectionView extends React.PureComponent<Props, State> {
	state: State = {
		active: false,
		members: []
	}

	render() {
		if (this.props.collection == null) return null

		const urlPath = `${this.props.dtsConfig.collections}?id=${this.props.collection['@id']}`

		return (
			<Li
				onClick={async (ev) => {
					ev.stopPropagation()
					if (this.state.active) {
						this.setState({ active: false })
						return
					}

					const collection = await this.props.fetch(urlPath, DTSResponseType.Json)
					this.setState({ active: true, members: collection.member })
				}}
			>
				<ListItem
					active={this.state.active}
					dtsConfig={this.props.dtsConfig}
					item={this.props.collection}
				/>
				{
					this.state.active &&
					<Members
						{...this.props}
						members={this.state.members}
					/>
				}
			</Li>
		)
	}
}

				// <img src={`/static/folder-${this.state.active ? 'min' : 'plus'}.png`} />
				// {this.props.collection.title} ({this.props.collection.totalItems})
				// <Url>{`${baseUrl}${urlPath}`}</Url>
