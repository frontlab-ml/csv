import neatCSV from 'neat-csv';
import fs from 'fs';
import { parseAsync } from 'json2csv';

const csv = fs.readFileSync('./cleanedup.csv');

const readCSV = async () => neatCSV(csv);

const parseCSV = async () => {
    const result = await readCSV();


    for (const item of result) {
        // const test = Object.entries(item);
        console.log('item', item);
        
        // for (const obj in item) {
        //   console.log(`${obj}: ${item[obj]}`);
        // }
      }

    // const opts = { fields };

    // const resultsCSV = await parseAsync(result, opts);
    // fs.writeFileSync('./result.csv', resultsCSV);
}

parseCSV()
    .then(() => console.log('Done!'))
    .catch(err => console.error(err.message));
