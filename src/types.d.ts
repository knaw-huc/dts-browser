declare const enum CollectionType { Collection = "Collection", EntryPoint = "EntryPoint", Resource  = "Resource" }

declare const enum DTSResponseType { Json = "JSON", Xml = "XML" }

interface Collection {
	'@id': string
	'@type': CollectionType
	title: string
	totalItems: number
}

interface Collections {
	title: string
	member: Collection[]
}
