import { writeFileSync } from 'fs';

export default function (data: any) {
	console.log('writeData.ts');
	writeFileSync('./toolbox/output.json', JSON.stringify(data, null, '\t'));
}
