import * as React from 'react'
import CollectionView from './collection'
import { AppState } from '.'
import Resource from './resource';

interface Props extends AppState {
	members: any[]
}
export default class Members extends React.PureComponent<Props> {
	render() {
		if (this.props.members == null) return null

		return (
			<ul>
				{
					this.props.members.map(member =>
						member['@type'] === CollectionType.Resource ?
							<Resource
								{...this.props}
								key={member['@id']}
								resource={member}
							/> :
							member['@type'] === CollectionType.Collection ?
								<CollectionView
									{...this.props}
									collection={member}
									key={member['@id']}
								/> :
								null

					)
				}
			</ul>
		)
	}
}
