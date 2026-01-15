// testDataLoader.ts
import { promises as fs } from 'fs';
import * as path from 'path';
import { iScenarioData } from '../../resources/testdata/types';

let scenarioDataCache: Map<string, { [key: string]: any }> = new Map();
/**
 * @description Reusable method to read data from json file based on scenario name
 * @param filename Name of the json file where the scenario testdata is present
 * @param scenarioName Name of the scenario for which the data to be fetched
 * @returns An object with all the scenrio data in json format
 */
export async function getScenarioData(filename: string, scenarioName: string): Promise<{ [key: string]: any } | null> {
    const cacheKey = filename+'#'+scenarioName;
    
    // Return cached data if available
    if (scenarioDataCache.has(cacheKey)) {
        return scenarioDataCache.get(cacheKey)!;
    }

    try {
        const filePath = path.resolve(__dirname, '../../resources/testdata', `${filename}.json`);
        const data = await fs.readFile(filePath, 'utf8');
        const scenarios: iScenarioData[] = JSON.parse(data);

        for (let scenario of scenarios) {
            if (scenario.scenarioName === scenarioName) {
                scenarioDataCache.set(cacheKey, scenario.data);
                return scenario.data;
            }
        }

        console.warn(`No scenario found with name "${scenarioName}" in file "${filename}"`);
        return null;
    } catch (error) {
        console.error(`Error reading scenario data: ${error}`);
        throw error;
    }
}