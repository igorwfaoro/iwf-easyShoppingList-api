import { injectable } from "inversify";
import { ShoppingListItem } from "../models/entities/shopping-list-item";
import { ShoppingListItemViewModel } from "../models/view-models/shopping-list-item.view-model";
import { ShoppingListItemCreateInputModel } from '../models/input-models/shopping-list-item-create.input-model';
import { ShoppingListItemCreateUpdateModel } from "../models/input-models/shopping-list-item-update.input-model";
import { ShoppingListItemIndexesInputModel } from "../models/input-models/shopping-list-item-indexes.input-model";
import { NotFoundException } from "../common/exceptions/not-found.exception";

@injectable()
export class ShoppingListItemService {

    public getAll(): ShoppingListItemViewModel[] {
        const items = ShoppingListItem.getDb().findAll();
        return items.map(ShoppingListItemViewModel.fromEntity);
    }

    public getById(id: string): ShoppingListItemViewModel {
        const item = ShoppingListItem.getDb().findById(id);

        if (!item)
            throw new NotFoundException();

        return ShoppingListItemViewModel.fromEntity(item);
    }

    public create(input: ShoppingListItemCreateInputModel): ShoppingListItemViewModel {

        const items = ShoppingListItem.getDb().findAll();

        const item = ShoppingListItem.create({
            description: input.description,
            index: items.length
        });

        ShoppingListItem.getDb().save(item);

        return this.getById(item.id);
    }

    public update(id: string, input: ShoppingListItemCreateUpdateModel): ShoppingListItemViewModel {

        const item = ShoppingListItem.getDb().findById(id);

        if (!item)
            throw new NotFoundException();

        item.description = input.description;

        ShoppingListItem.getDb().save(item);

        return this.getById(item.id);
    }

    public delete(id: string): void {

        if (!ShoppingListItem.getDb().exists(x => x.id == id))
            throw new NotFoundException();

        ShoppingListItem.getDb().destroyById(id);
    }

    public updateChecked(id: string, value: boolean): ShoppingListItemViewModel {

        const item = ShoppingListItem.getDb().findById(id);

        if (!item)
            throw new NotFoundException();

        item.checked = value;

        ShoppingListItem.getDb().save(item);

        return this.getById(item.id);
    }

    public updateIndexes(input: ShoppingListItemIndexesInputModel): ShoppingListItemViewModel[] {

        const items = ShoppingListItem.getDb().findAll(x => input.items.map(y => y.id).includes(x.id));

        items.forEach(item => {
            item.index = input.items.find(x => x.id == item.id).index;
            ShoppingListItem.getDb().save(item);
        });

        return ShoppingListItem.getDb().findAll(x => items.map(y => y.id).includes(x.id)).map(ShoppingListItemViewModel.fromEntity);
    }

    public clear(): void {
        ShoppingListItem.getDb().destroy(() => true);
    }
}