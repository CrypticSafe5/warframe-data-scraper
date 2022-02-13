import { parse, Element, TextNode } from 'parse5';

export default function (html: string): Warframe.ExtractedData {
	const output: Partial<Warframe.ExtractedData> = {};

	const body = parse(html).childNodes[1] as Element;
	const topLevel = body.childNodes[2] as Element;

	let currentKey: string | null = null;
	for (const node of topLevel.childNodes) {
		const element = node as Element;
		if (element.tagName === 'h3') {
			const id = element.attrs.find((e) => e.name === 'id');
			if (id) {
				currentKey = id.value;
				output[id.value as keyof Warframe.ExtractedData] = [];
			}
		} else if (element.tagName === 'table') {
			const tbody = element.childNodes.find((e: Element) => e.tagName === 'tbody') as Element;
			for (const trow of tbody.childNodes) {
				const row = trow as Element;
				if (row.childNodes) {
					const rowData: Warframe.PageDataPoint[] = [];
					for (const td of row.childNodes) {
						const cell = td as Element;
						const data = cell.childNodes[0] as TextNode;
						if (data) rowData.push({ tagName: cell.tagName, value: data.value });
					}
					output[currentKey as keyof Warframe.ExtractedData].push(rowData);
				}
			}
		}
	}

	return output as Warframe.ExtractedData;
}
