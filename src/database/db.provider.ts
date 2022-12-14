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
        const index = data.findIndex(x => x.id == item.id);

        if (index >= 0)
            data[index] = item;
        else
            data.push(item);

        this.setData(data);

        return item;
    }

    public destroyById(id: string): void {
        this.setData(this.getData().filter(x => x.id != id));
    }

    public destroy(validation: (item: T) => boolean): void {
        this.setData(this.getData().filter(x => !validation(x)))
    }

    public findOne(validation: (item: T) => boolean): T {
        return this.getData().find(validation);
    }

    public findById(id: string): T {
        return this.getData().find(x => x.id == id);
    }

    public exists(validation: (item: T) => boolean): boolean {
        return !!this.getData().find(validation || (() => true));
    }

    private getData(): T[] {
        return JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'))[this._dataName];
    }

    private setData(data: T[]): void {
        const oldData = JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'));
        oldData[this._dataName] = data;
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(oldData, null, 2), { encoding: 'utf-8', mode: 0o777 });
    }
}