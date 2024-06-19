import { Express } from 'express';
import { ServiceOptions } from './types/ServiceOptions';
export declare abstract class BackendServiceTemplate {
    protected app: Express;
    private name;
    private port;
    constructor(options: ServiceOptions);
    private initializeMiddlewares;
    private addHealthCheckRoute;
    start(): void;
    protected abstract configureAdditionalMiddlewares(): void;
    protected abstract configureAdditionalRoutes(): void;
}
