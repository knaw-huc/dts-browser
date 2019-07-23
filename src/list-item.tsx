import * as React from 'react'
import { AppState } from '.';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 32px auto 32px;
	width: 100%;
`

export const Url = styled.div`
	color: brown;
	font-style: italic;
	font-size: .8rem;
	grid-column: 2;
`

const Title = styled.span`
	border-bottom: 1px solid white;

	&:hover {
		border-bottom 1px solid brown;
	}
`

const Small = styled.span`
	font-size: .75em;
	margin-left: .5em;
`

interface Props {
	active: boolean
	dtsConfig: AppState['dtsConfig']
	item: Collection
}
export default function ListItem(props: Props) {
	const iconSrc = props.item['@type'] === CollectionType.Resource ?
		"/static/file-text.png" :
		`/static/folder-${props.active ? 'min' : 'plus'}.png`

	return (
		<Wrapper>
			<img
				alt={`${props.item['@type']} icon`}
				src={iconSrc}
				width="20px"
			/>
			<div>
				<Title>{props.item.title}</Title>
				{
					props.item[`@type`] === CollectionType.Collection &&
					<Small>({props.item.totalItems})</Small>
				}
			</div>
			{
				props.item['@type'] === CollectionType.Resource &&
				<a
					href={`${props.dtsConfig.documents}?id=${props.item['@id']}`}
					target="_blank"
				>
					<img
						alt="Open TEI in new tab"
						src={'/static/download.png'}
						title="Open TEI in new tab"
						width="20px"
					/>
				</a>
			}
		</Wrapper>
	)
}
