import * as React from 'react'
import ListItem from './list-item';
import styled from '@emotion/styled'
import { AppState } from '.';

const Li = styled.li`
	cursor: pointer;
	margin-bottom: 1em;

	& > img {
		margin-right: .25em;
	}
`

interface Props {
	dtsConfig: AppState['dtsConfig']
	fetch: AppState['fetch']
	resource: Collection
}

export default function ResourceView(props: Props) {
	return (
		<Li 
			onClick={async (ev) => {
				ev.stopPropagation()
				// if (this.state.active) {
				// 	this.setState({ active: false })
				// 	return
				// }

				const urlPath = `${props.dtsConfig.documents}?id=${props.resource['@id']}`
				const resource = await props.fetch(urlPath, DTSResponseType.Xml)
				console.log(resource)
				// this.setState({ active: true, members: resource.member })
			}}
		>
			<ListItem
				active={false}
				dtsConfig={props.dtsConfig}
				item={props.resource}	
			/>
		</Li>

	)
}
