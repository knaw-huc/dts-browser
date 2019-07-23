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
				const urlPath = `${props.dtsConfig.navigation}?id=${props.resource['@id']}`
				// await props.fetch(urlPath, DTSResponseType.Xml)
				await props.fetch(urlPath, DTSResponseType.Json)
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
