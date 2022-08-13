import * as fs from 'fs';
import { Entity } from "../models/abstraction/entity";
import { ENV_CONFIG } from "../env-config";

const DB_FILE_PATH = ENV_CONFIG.JSON_DB_FILE_PATH;

export class DbProvider<T extends Entity> {

    constructor(
        private _dataName: string
    ) { }

    public findAll(options: { [key: string]: any } = {}): T[] {
        return this.getData()
            .filter(x => Object.entries(options) ? Object.entries(options).every(opt => x[opt[0]] == opt[1]) : true);
    }

    public save(item: T): T {
        const data = this.getData();

        const index = data.findIndex(x => x.id);

        if (index)
            data[index] = item;
        else
            data.push(item);

        this.setData(data);

        return item;
    }

    public findOne(options: { [key: string]: any }): T {
        return this.getData()
            .find(x => Object.entries(options).every(opt => x[opt[0]] == opt[1]));
    }

    public findById(id: string): T {
        return this.getData().find(x => x.id == id);
    }

    private getData(): T[] {
        return JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'))[this._dataName];
    }

    private setData(data: T[]): void {
        const oldData = JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'));
        oldData[this._dataName] = data;
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(oldData, null, 2), 'utf-8');
    }
}