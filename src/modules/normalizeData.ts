function normalizeMissionRewards(data: Warframe.PageDataPoint[][]): Warframe.Mission[] {
	const missionList = [];

	let table: Partial<Warframe.Mission> = {
		dropList: []
	};
	let rotation: Warframe.Rotation = null;
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			missionList.push({ ...table });
			table = {
				dropList: []
			};
			rotation = null;
		}
		for (const cell of row) {
			if (cell.tagName === 'th' && !('planet' in table)) {
				// Planet/location/mission type row
				const splitValue = cell.value.split('/');
				table.event = cell.value.includes('Event: ');
				table.planet = ((table.event) ? splitValue[0].split('Event: ')[1] : splitValue[0]) as Warframe.Planet;
				table.location = splitValue[1].split(' (')[0];
				table.missionType = splitValue[1].split(/\(|\)/g)[1] as Warframe.MissionType;
			} else if (cell.tagName === 'th' && row.length === 1) {
				// Rotation declaration row
				rotation = cell.value.split('Rotation ')[1] as Warframe.Rotation;
			} else if (cell.tagName === 'td') {
				// Data row
				if (!('drop' in drop)) {
					drop = {
						rotation,
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return missionList as Warframe.Mission[];
}

function normalizeRelicRewards(data: Warframe.PageDataPoint[][]): Warframe.Relic[] {
	const relicRewardList = [];

	let table: Partial<Warframe.Relic> = {
		dropList: []
	};
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			relicRewardList.push({ ...table });
			table = {
				dropList: []
			};
		}
		for (const cell of row) {
			if (cell.tagName === 'th' && !('relic' in table)) {
				// Relic info row
				if (cell.value === 'Requiem Relic (Intact)') {
					// Edge case for relics
					const splitValue = cell.value.split(' ');
					table.relic = '';
					table.tier = splitValue[0] as Warframe.Tier;
					table.quality = splitValue[2].split(/\(|\)/g)[1] as Warframe.Quality;
				} else {
					const splitValue = cell.value.split(' ');
					table.relic = splitValue[1];
					table.tier = splitValue[0] as Warframe.Tier;
					table.quality = splitValue[3].split(/\(|\)/g)[1] as Warframe.Quality;
				}
			} else if (cell.tagName === 'td') {
				// Data row
				if (!('drop' in drop)) {
					drop = {
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return relicRewardList as Warframe.Relic[];
}

function normalizeKeyRewards(data: Warframe.PageDataPoint[][]): Warframe.KeyMission[] {
	const keyMissionList = [];

	let table: Partial<Warframe.KeyMission> = {
		dropList: []
	};
	let rotation: Warframe.Rotation = null;
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			keyMissionList.push({ ...table });
			table = {
				dropList: []
			};
			rotation = null;
		}
		for (const cell of row) {
			if (cell.tagName === 'th' && !('name' in table)) {
				table.name = cell.value;
			} else if (cell.tagName === 'th' && row.length === 1) {
				// Rotation declaration row
				rotation = cell.value.split('Rotation ')[1] as Warframe.Rotation;
			} else if (cell.tagName === 'td') {
				// Data row
				if (!('drop' in drop)) {
					drop = {
						rotation,
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return keyMissionList as Warframe.KeyMission[];
}

function normalizeTransientRewards(data: Warframe.PageDataPoint[][]): Warframe.TransientMission[] {
	const transientRewardsList = [];

	let table: Partial<Warframe.KeyMission> = {
		dropList: []
	};
	let rotation: Warframe.Rotation = null;
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			transientRewardsList.push({ ...table });
			table = {
				dropList: []
			};
			rotation = null;
		}

		for (const cell of row) {
			if (cell.tagName === 'th' && !('name' in table)) {
				table.name = cell.value;
			} else if (cell.tagName === 'th' && row.length === 1) {
				// Rotation declaration row
				rotation = cell.value.split('Rotation ')[1] as Warframe.Rotation;
			} else if (cell.tagName === 'td') {
				// Data row
				if (row.length === 1) {
					// Edge case of drop being an empty string and a drop chance
					console.warn('EMPTY_DATA_CELL', table.name, row);
				} else if (!('drop' in drop)) {
					drop = {
						rotation,
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return transientRewardsList as Warframe.TransientMission[];
}

function normalizeSortieRewards(data: Warframe.PageDataPoint[][]): Warframe.Sorties[] {
	// For whatever reason, the data incoming for this section doesn't have an empty array to denote end of table
	if (data[data.length - 1].length !== 0) data.push([]);

	const sortieList = [];

	let table: Partial<Warframe.KeyMission> = {
		dropList: []
	};
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			sortieList.push({ ...table });
			table = {
				dropList: []
			};
		}
		for (const cell of row) {
			if (cell.tagName === 'th' && !('name' in table)) {
				table.name = cell.value;
			} else if (cell.tagName === 'th' && row.length === 1) {
				// Rotation declaration row
			} else if (cell.tagName === 'td') {
				// Data row
				if (!('drop' in drop)) {
					drop = {
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return sortieList as Warframe.Sorties[];
}

function normalizeCetusRewards(data: Warframe.PageDataPoint[][]) {
	const cetusRewardsList = [];

	let table: Partial<Warframe.KeyMission> = {
		dropList: []
	};
	let stage: string[] = null;
	let drop: Partial<Warframe.Drop> = {};
	for (const row of data) {
		if (row.length === 0) {
			// Break point for table
			cetusRewardsList.push({ ...table });
			table = {
				dropList: []
			};
			stage = null;
		}

		for (const cell of row) {
			if (cell.tagName === 'th' && !('name' in table)) {
				table.name = cell.value;
			} else if (cell.tagName === 'th' && row.length === 1) {
				// Rotation declaration row
				stage = cell.value
					.split(',')
					.map((e) =>
						e
							.replace(/\bStage \b|\band Stage \b/g, '')
							.trim()
					);
			} else if (cell.tagName === 'td') {
				// Data row
				if (!('drop' in drop)) {
					drop = {
						stage,
						drop: cell.value
					};
				} else {
					drop.rarity = cell.value.split(' (')[0] as Warframe.Rarity;
					drop.chance = Number((Number(cell.value.split('(')[1].split('%)')[0]) / 100).toFixed(4));
					table.dropList.push(drop as Warframe.Drop);
					drop = {};
				}
			}
		}
	}

	return cetusRewardsList as Warframe.CetusMission[];
}

function normalizeSolarisRewards() {

}

function normalizeDeimosRewards() {

}

function normalizeModByAvatar() {

}

function normalizeModByDrop() {

}

function normalizeBlueprintByAvatar() {

}

function normalizeBlueprintByDrop() {

}

function normalizeSigilByAvatar() {

}

function normalizeAdditionalItemByAvatar() {

}

function normalizeRelicByAvatar() {

}


export default function (pageData: Warframe.ExtractedData): Warframe.NormalizedData {
	console.log('normalizeData.ts');

	return {
		missionRewards: normalizeMissionRewards(pageData.missionRewards),
		relicRewards: normalizeRelicRewards(pageData.relicRewards),
		keyRewards: normalizeKeyRewards(pageData.keyRewards),
		transientRewards: normalizeTransientRewards(pageData.transientRewards),
		sortieRewards: normalizeSortieRewards(pageData.sortieRewards),
		cetusRewards: normalizeCetusRewards(pageData.cetusRewards),
		// solarisRewards: normalizeSolarisRewards(),
		// deimosRewards: normalizeDeimosRewards(),
		// modByAvatar: normalizeModByAvatar(),
		// modByDrop: normalizeModByDrop(),
		// blueprintByAvatar: normalizeBlueprintByAvatar(),
		// blueprintByDrop: normalizeBlueprintByDrop(),
		// sigilByAvatar: normalizeSigilByAvatar(),
		// additionalItemByAvatar: normalizeAdditionalItemByAvatar(),
		// relicByAvatar: normalizeRelicByAvatar()
	};
}
