import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {COMPONENT} from '../types/component.type.js';
import {getDBConnectionURI} from '../utils/db.js';
import {DatabaseInterface} from '../common/db-client/db.interface.js';
import express, {Express} from 'express';
import {ControllerInterface} from '../common/controller/controller.interface';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(@inject(COMPONENT.LoggerInterface) private logger: LoggerInterface,
              @inject(COMPONENT.ConfigInterface) private config: ConfigInterface,
              @inject(COMPONENT.DatabaseInterface) private dbClient: DatabaseInterface,
              @inject(COMPONENT.MovieController) private movieController: ControllerInterface,
              @inject(COMPONENT.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
              @inject(COMPONENT.UserController) private userController: ControllerInterface,) {
    this.expressApp = express();
  }

  initRoutes() {
    this.expressApp.use('/movies', this.movieController.router);
    this.expressApp.use('/users', this.userController.router);
  }

  initMiddleware() {
    this.expressApp.use(express.json());
  }

  initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
