import * as fs from 'fs';
import { Entity } from "../models/abstraction/entity";
import { ENV_CONFIG } from "../env-config";

const DB_FILE_PATH = ENV_CONFIG.JSON_DB_FILE_PATH;

export class DbProvider<T extends Entity> {

    constructor(
        private _dataName: string
    ) { }

    public findAll(validation?: (item: T) => boolean): T[] {
        return this.getData().filter(validation || (() => true));
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

    public destroy(id: string): void {
        this.setData(this.getData().filter(x => x.id != id));
    }

    public findOne(validation: (item: T) => boolean): T {
        return this.getData().find(validation || (() => true));
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