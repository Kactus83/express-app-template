import { CorsOptions } from 'cors';
export interface ServiceOptions {
    name: string;
    port: number;
    corsOptions?: CorsOptions;
}
