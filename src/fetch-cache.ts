class FetchCache {
	cache: Map<string, any> = new Map()

	last() {
		return Array.from(this.cache.values()).pop()
	}

	async fetchJson(url: string | string[]) {
		if (Array.isArray(url)) {
			return await Promise.all(url.map(u => this.fetch(u, 'json')))
		}
		return await this.fetch(url, 'json')
	}

	async fetchText(url: string) {
		return await this.fetch(url, 'text')
	}

	private async fetch(url: string, type: 'text'): Promise<string>
	private async fetch(url: string, type: 'json'): Promise<any>
	private async fetch(url: string, type: 'text' | 'json') {
		if (this.cache.has(url)) return this.cache.get(url)

		let response: Response
		try {
			response = await fetch(url)
		} catch (err) {
			console.error(err)			
		}

		let data: any
		if (response.ok) {
			data = type === 'json' ?
				await response.json() :
				await response.text()
		}

		this.cache.set(url, data)

		return data
	}
}

export default new FetchCache()
