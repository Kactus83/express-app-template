"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendServiceTemplate = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = require("body-parser");
const errorHandler_1 = require("./middlewares/errorHandler");
const HealthStatus_1 = require("./types/HealthStatus");
class BackendServiceTemplate {
    constructor(options) {
        this.name = options.name;
        this.port = options.port;
        this.app = (0, express_1.default)();
        // Initialisation des middlewares de base
        this.initializeMiddlewares(options.corsOptions);
        // Route de santé
        this.addHealthCheckRoute();
        // Initialisation des middlewares supplémentaires
        this.configureAdditionalMiddlewares();
        // Initialisation des routes supplémentaires
        this.configureAdditionalRoutes();
        // Middleware de gestion des erreurs
        this.app.use(errorHandler_1.errorHandler);
    }
    initializeMiddlewares(corsOptions) {
        this.app.use((0, cors_1.default)(corsOptions || {
            origin: (origin, callback) => {
                // Permettre toutes les requêtes de localhost, peu importe le port
                if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, body_parser_1.json)());
    }
    addHealthCheckRoute() {
        this.app.get('/health', (req, res) => {
            const response = {
                status: HealthStatus_1.HealthStatus.UP,
                service: this.name,
            };
            res.send(response);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`${this.name} service is running on port ${this.port}`);
        });
    }
}
exports.BackendServiceTemplate = BackendServiceTemplate;
