import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {COMPONENT} from '../types/component.type.js';
import {getDBConnectionURI} from '../utils/db.js';
import {DatabaseInterface} from '../common/db-client/db.interface.js';

@injectable()
export default class Application {
  constructor(@inject(COMPONENT.LoggerInterface) private logger: LoggerInterface,
              @inject(COMPONENT.ConfigInterface) private config: ConfigInterface,
              @inject(COMPONENT.DatabaseInterface) private dbClient: DatabaseInterface) {}

  async init() {
    this.logger.info(`Application initialized. Get value from $PORT: ${this.config.get('PORT')}.`);

    const uri = getDBConnectionURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.dbClient.connect(uri);
  }
}
