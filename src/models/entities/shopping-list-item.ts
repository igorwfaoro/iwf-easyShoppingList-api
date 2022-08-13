import { Entity } from "../abstraction/entity";
import { v4 as uuidV4 } from 'uuid';
import * as moment from 'moment-timezone';
import { DbProvider } from "../../database/db.provider";

export class ShoppingListItem extends Entity {

    public description: string;
    public index: number;
    public checked: boolean;
    public createdAt: Date;

    public static create(params: {
        index: number;
        description: string;
    }): ShoppingListItem {

        const entity = new ShoppingListItem();

        entity.id = uuidV4();
        entity.index = params.index;
        entity.description = params.description;
        entity.createdAt = moment().toDate();

        return entity;
    }

    public static getDb(): DbProvider<ShoppingListItem> {
        return new DbProvider('shoppingListItems');
    }
}