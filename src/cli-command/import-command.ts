import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {CliCommandInterface} from './cli-command.interface.js';
import {createMovie} from '../utils/common-functions.js';

export default class ImportCommand implements CliCommandInterface {
  readonly name = '--import';

  async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', (line) => console.log(createMovie(line)));
    fileReader.on('end', (count) => console.log(`${count} rows imported.`));

    try {
      await fileReader.read();
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Can't read the file: ${err.message}`);
      }
    }
  }
}
