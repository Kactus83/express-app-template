import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import { ServiceOptions } from './types/ServiceOptions';
import { errorHandler } from './middlewares/errorHandler';
import { HealthResponse } from './types/HealthResponse';
import { HealthStatus } from './types/HealthStatus';

export abstract class BackendServiceTemplate {
  protected app: Express;
  private name: string;
  private port: number;

  constructor(options: ServiceOptions) {
    this.name = options.name;
    this.port = options.port;
    this.app = express();

    // Initialisation des middlewares de base
    this.initializeMiddlewares(options.corsOptions);

    // Route de santé
    this.addHealthCheckRoute();

    // Initialisation des middlewares supplémentaires
    this.configureAdditionalMiddlewares();

    // Initialisation des routes supplémentaires
    this.configureAdditionalRoutes();

    // Middleware de gestion des erreurs
    this.app.use(errorHandler);
  }

  private initializeMiddlewares(corsOptions?: CorsOptions) {
    this.app.use(cors(corsOptions || {
      origin: (origin, callback) => {
        // Permettre toutes les requêtes de localhost, peu importe le port
        if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    }));
    this.app.use(morgan('dev'));
    this.app.use(json());
  }

  private addHealthCheckRoute() {
    this.app.get('/health', (req: Request, res: Response) => {
      const response: HealthResponse = {
        status: HealthStatus.UP,
        service: this.name,
      };
      res.send(response);
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`${this.name} service is running on port ${this.port}`);
    });
  }

  protected abstract configureAdditionalMiddlewares(): void;
  protected abstract configureAdditionalRoutes(): void;
}
