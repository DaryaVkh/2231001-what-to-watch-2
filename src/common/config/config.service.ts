import {ConfigInterface} from './config.interface.js';
import {config} from 'dotenv';
import {LoggerInterface} from '../logger/logger.interface.js';
import {CONFIG_SCHEMA, ConfigSchema} from './config.schema.js';
import {inject, injectable} from 'inversify';
import {COMPONENT} from '../../types/component.type.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;

  constructor(@inject(COMPONENT.LoggerInterface) private logger: LoggerInterface) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Cannot read .env file.');
    }

    CONFIG_SCHEMA.load({});
    CONFIG_SCHEMA.validate({allowed: 'strict', output: this.logger.info});

    this.config = CONFIG_SCHEMA.getProperties();

    this.logger.info('.env file successfully parsed.');
  }

  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
