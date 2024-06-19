import { HealthStatus } from "./HealthStatus";
export interface HealthResponse {
    status: HealthStatus;
    service: string;
}
