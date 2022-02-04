// @ts-check
import neatCSV from 'neat-csv';
import * as fs from 'fs';
import { parseAsync } from 'json2csv';

const csv = fs.readFileSync('./isonis_playbook.csv');

const readCSV = async () => neatCSV(csv);

const parseMarket = 

const parseCSV = async () => {
    const result = await readCSV();

    const fields = [
        'ictKey',
        'Translated ictMarketTemplateName',
        'Translated ictSelectionTemplateName'
    ];

    const resultTranslations /** : Map<string, string> */ = new Map();

    for (const item of result) {
        console.info('item', item);
    }

    const opts = { fields };

    const resultsCSV = await parseAsync(result, opts);
    fs.writeFileSync('./cleanedup.csv', resultsCSV);
}

parseCSV()
    .then(() => console.log('Done!'))
    .catch(err => console.error(err.message));
