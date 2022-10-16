import 'reflect-metadata';
import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';
import {Container} from 'inversify';
import {COMPONENT} from './types/component.type.js';
import {LoggerInterface} from './common/logger/logger.interface.js';
import {ConfigInterface} from './common/config/config.interface.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(COMPONENT.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(COMPONENT.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(COMPONENT.ConfigInterface).to(ConfigService).inSingletonScope();

const application = applicationContainer.get<Application>(COMPONENT.Application);
await application.init();
