import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
import { appAPI } from './routes/apiroutes';
import mongoose from 'mongoose';
import { secretUtil } from './utils/secretutil';

/**
 * @description Express server application class.
 */
class App {
  public server = express();

  constructor() {
    this.initMiddlewares();
    this.MongoosConnect();
    this.defineRoutes();
  }

  private initMiddlewares(): void {
    this.server.use('/api-docs/swagger', express.static('swagger'));
    this.server.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
    this.server.use(bodyParser.json());
    this.server.use(swagger.express({
      definition: {
        info: {
          title: "Road Runner APIs",
          version: "1.0",
        },
        securityDefinitions: {
          apiKeyHeader: {
            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
            in: SwaggerDefinitionConstant.Security.In.HEADER,
            name: "Authorization"
          }
        }
      }
    }));
  }

  private MongoosConnect() {

    // const uri =`mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
    var ip = secretUtil.MONGODB_SERVER;
    var dbName = secretUtil.MONGODB_DBNAME as string;
    var conn = "mongodb://" + ip + ":27017/" + dbName;
    mongoose.connect(conn)
      .then(() => {
        mongoose.connection.useDb(dbName);
        console.log('> MongoDB connected - ' + ip);
      })
      .catch(err => {
        console.error('> MongoDB connection error.........' + err.stack);
        process.exit(1);
      });
  }
  private defineRoutes(): void {

    // API Base path
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(appAPI.path, appAPI.routerinstance);

    // fallback invalid route
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        success: false,
        message: 'Invalid route',
        result: {},
        statusCode: 404
      });
    });
  }

}

// initialize server app
const app = new App();

// export the default "App" class object "server" property
export default app;