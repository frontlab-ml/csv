// import neatCSV from 'neat-csv';
import * as fs from 'fs';
// import { parseAsync } from 'json2csv';

// const csv = fs.readFileSync('./isonis_playbook.csv');

// const readCSV = async () => neatCSV(csv);

const parseMarket = (column1: string, column2: string): [string, string] => {
    /*
    '"tennis|two-participant-event|match-winner|A"',
    '"Pobjednik"',

    wynik

    market.tennisdoubles.two-participant-event.match-winner      --> Pobjednik
    */
    
    throw Error('TODO');
};

const parseSelection = (column1: string, column3: string): [string, string] => {

    /*
    '"tennisdoubles|two-participant-event|match-winner|A"',
    '"2"'

    wynik

    selection.tennisdoubles.two-participant-event.match-winner.H --> 1
    */

    throw Error('TODO');
};

const parseCSV = async () => {
    // const result = await readCSV();

    const bytes = await fs.promises.readFile('./cleanedup.csv');
    const content = bytes.toString();


    const counter: Map<number, number> = new Map();

    const items: Array<Array<string>> = [];

    for (const [index, line] of content.split('\n').entries()) {
        if (index === 0 || index === 1) {
            continue;
        }

        const chunks = line.split(',');

        console.info('przerabiam', chunks);

        const current_counter = counter.get(chunks.length) ?? 0;
        counter.set(chunks.length, current_counter + 1);

        items.push(chunks);

        for (const chunktItem of chunks) {
            if (chunktItem.includes(',')) {
                throw Error('jest przecinek');
            }
        }
    }

    console.info(counter);

    //tutaj jest tablica tablic
    /*
    przerabiam [
    '"tennis|two-participant-event|match-winner|A"',
    '"Pobjednik"',
    '"2"'
    ]
    przerabiam [
    '"tennisdoubles|two-participant-event|match-winner|H"',
    '"Pobjednik"',
    '"1"'
    ]
    przerabiam [
    '"tennisdoubles|two-participant-event|match-winner|A"',
    '"Pobjednik"',
    '"2"'
    ]
    przerabiam [
    '"volleyball|two-participant-event|match-winner|H"',
    '"Pobjednik"',
    '"1"'
    ]
    przerabiam [
    '"volleyball|two-participant-event|match-winner|A"',
    '"Pobjednik"',
    '"2"'
    ]
    */
    const translations: Map<string, string> = new Map();

    for (const row of items) {
        const col1 = row[0];
        const col2 = row[1];
        const col3 = row[2];

        if (col1 === undefined || col2 === undefined || col3 === undefined) {
            throw Error('To się nie powinno wydarzyć');
        }

        const [marketId, market] = parseMarket(col1, col2);
        const [selectionId, selection] = parseSelection(col1, col3);

        translations.set(marketId, market);
        translations.set(selectionId, selection);
    }
    

    //...


    /*
    przerabiam [
        '"tennisdoubles|two-participant-event|match-winner|H"',
        '"Pobjednik"',
        '"1"'
    ]
    przerabiam [
        '"tennisdoubles|two-participant-event|match-winner|A"',
        '"Pobjednik"',
        '"2"'
    ]

    market.tennisdoubles.two-participant-event.match-winner      --> Pobjednik
    selection.tennisdoubles.two-participant-event.match-winner.H --> 1
    market.tennisdoubles.two-participant-event.match-winner      --> Pobjednik
    selection.tennisdoubles.two-participant-event.match-winner.A --> 2


    po deduplikacji przez mapę ...

    market.tennisdoubles.two-participant-event.match-winner      --> Pobjednik
    selection.tennisdoubles.two-participant-event.match-winner.H --> 1
    selection.tennisdoubles.two-participant-event.match-winner.A --> 2
    */



    //TODO - zapisać "translations" jako csv z dwoma kolumami

    

    // console.info('lines', lines);


    // const fields = [
    //     'ictKey',
    //     'Translated ictMarketTemplateName',
    //     'Translated ictSelectionTemplateName'
    // ];

    // const resultTranslations /** : Map<string, string> */ = new Map();

    // for (const item of result) {
    //     console.info('item', item);
    // }

    // const opts = { fields };

    // const resultsCSV = await parseAsync(result, opts);
    // fs.writeFileSync('./cleanedup.csv', resultsCSV);
}

parseCSV()
    .then(() => console.log('Done!'))
    .catch(err => console.error(err.message));


// console.info("dsdas");

