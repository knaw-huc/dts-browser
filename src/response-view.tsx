import * as React from 'react' 
import { AppState } from '.';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	overflow: auto;
	height: 74vh;
	
	& > pre {
		box-sizing: border-box;
		height: 74vh;
		margin: 0;
	}
`

export default class ResponseView extends React.PureComponent<AppState> {
	componentDidMount() {
		// @ts-ignore
		Prism.highlightAll()
	}

	componentDidUpdate() {
		// @ts-ignore
		Prism.highlightAll()
	}

	render() {
		const value = this.props.lastResponse.type === DTSResponseType.Json ?
			JSON.stringify(this.props.lastResponse.value, null, 4) :
			this.props.lastResponse.value.slice(0, 10000)

		return (
			<Wrapper>
				<pre>
					<code className={`language-${this.props.lastResponse.type.toLowerCase()}`}>{value}</code> :
				</pre>
			</Wrapper>
		)
	}

}
