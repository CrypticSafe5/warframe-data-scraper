import fetch, { Response } from 'node-fetch';
import parsePage from './modules/parsePage';
import normalizeData from './modules/normalizeData';
import writeData from './modules/writeData';

fetch('https://n8k6e2y6.ssl.hwcdn.net/repos/hnfvc0o3jnfvc873njb03enrf56.html')
	.then((e: Response) => e.text())
	.then(parsePage)
	// .then(normalizeData)
	// .then(writeData)
	.catch(console.error);
