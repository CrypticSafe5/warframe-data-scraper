declare namespace Warframe {
	interface ExtractedData {
		missionRewards: PageDataPoint[][];
		relicRewards: PageDataPoint[][];
		keyRewards: PageDataPoint[][];
		transientRewards: PageDataPoint[][];
		sortieRewards: PageDataPoint[][];
		cetusRewards: PageDataPoint[][];
		solarisRewards: PageDataPoint[][];
		deimosRewards: PageDataPoint[][];
		modByAvatar: PageDataPoint[][];
		modByDrop: PageDataPoint[][];
		blueprintByAvatar: PageDataPoint[][];
		blueprintByDrop: PageDataPoint[][];
		sigilByAvatar: PageDataPoint[][];
		additionalItemByAvatar: PageDataPoint[][];
		relicByAvatar: PageDataPoint[][];
	}

	interface PageDataPoint {
		tagName: string;
		value: string;
	}

	interface Drop {
		drop: string;
		chance: number;
		rarity: Rarity;
		rotation: Rotation | null;
		stage: string[] | null;
	}

	type Planet = 'Mercury' | 'Venus' | 'Earth' | 'Lua' | 'Mars' | 'Deimos' | 'Phobos' | 'Ceres' | 'Jupiter' | 'Europa' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'Eris' | 'Kuva Fortress' | 'Void';
	type MissionType = 'Arena' | 'Assassination' | 'Assault' | 'Capture' | 'Defection' | 'Defense' | 'Disruption' | 'Excavation' | 'Exterminate' | 'Free Roam/Bounty' | 'Hijack' | 'Infested Salvage' | 'Interception' | 'Junction' | 'Mobile Defense' | 'Pursuit' | 'Rescue' | 'Rush' | 'Sabotage' | 'Sanctuary Onslaught' | 'Skirmish' | 'Spy' | 'Survival' | 'Volatile';
	type Rarity = 'Very Common' | 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Legendary';
	type Rotation = 'A' | 'B' | 'C';
	type Quality = 'Intact' | 'Exceptional' | 'Flawless' | 'Radiant';
	type Tier = 'Lith' | 'Meso' | 'Neo' | 'Axi' | 'Requiem';

	interface Mission {
		planet: Planet;
		location: string;
		event: boolean;
		missionType: MissionType;
		dropList: Drop[];
	}

	interface MissionToDropsMap {
		name: string;
		dropList: Drop[];
	}

	interface CetusMission extends MissionToDropsMap { }
	interface TransientMission extends MissionToDropsMap { }
	interface KeyMission extends MissionToDropsMap { }
	interface Sorties extends MissionToDropsMap { }

	interface Relic {
		relic: string;
		tier: Tier;
		quality: Quality;
		dropList: Drop[];
	}

	interface NormalizedData {
		missionRewards: Mission[];
		relicRewards: Relic[];
		keyRewards: KeyMission[];
		transientRewards: TransientMission[];
		sortieRewards: Sorties[];
		cetusRewards: CetusMission[];
		// solarisRewards: PageDataPoint[][];
		// deimosRewards: PageDataPoint[][];
		// modByAvatar: PageDataPoint[][];
		// modByDrop: PageDataPoint[][];
		// blueprintByAvatar: PageDataPoint[][];
		// blueprintByDrop: PageDataPoint[][];
		// sigilByAvatar: PageDataPoint[][];
		// additionalItemByAvatar: PageDataPoint[][];
		// relicByAvatar: PageDataPoint[][];
	}
}
