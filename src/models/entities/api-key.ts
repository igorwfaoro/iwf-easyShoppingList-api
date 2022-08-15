import { Entity } from "../abstraction/entity";
import { DbProvider } from "../../database/db.provider";

export class ApiKey extends Entity {

    public description: string;
    public key: string;
    public isActive: boolean;
    public createdAt: Date;

    public static getDb(): DbProvider<ApiKey> {
        return new DbProvider('apiKeys');
    }
}