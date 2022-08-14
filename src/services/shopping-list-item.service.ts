import { injectable } from "inversify";
import { ShoppingListItem } from "../models/entities/shopping-list-item";
import { ShoppingListItemViewModel } from "../models/view-models/shopping-list-item.view-model";
import { ShoppingListItemCreateInputModel } from '../models/input-models/shopping-list-item-create.input-model';
import { ShoppingListItemCreateUpdateModel } from "../models/input-models/shopping-list-item-update.input-model";
import { ShoppingListItemIndexesInputModel } from "../models/input-models/shopping-list-item-indexes.input-model";

@injectable()
export class ShoppingListItemService {

    public getAll(): ShoppingListItemViewModel[] {
        const items = ShoppingListItem.getDb().findAll();
        return items.map(ShoppingListItemViewModel.fromEntity);
    }

    public getById(id: string): ShoppingListItemViewModel {
        const item = ShoppingListItem.getDb().findById(id);
        return ShoppingListItemViewModel.fromEntity(item);
    }

    public create(input: ShoppingListItemCreateInputModel): ShoppingListItemViewModel {

        const items = ShoppingListItem.getDb().findAll();

        const item = ShoppingListItem.create({
            description: input.description,
            index: items.length
        });

        ShoppingListItem.getDb().save(item);

        return ShoppingListItemViewModel.fromEntity(item);
    }

    public update(id: string, input: ShoppingListItemCreateUpdateModel): ShoppingListItemViewModel {

        const item = ShoppingListItem.getDb().findById(id);
        item.description = input.description;
        ShoppingListItem.getDb().save(item);

        return ShoppingListItemViewModel.fromEntity(item);
    }

    public delete(id: string): void {
        ShoppingListItem.getDb().destroy(id);
    }

    public updateChecked(id: string, value: boolean): ShoppingListItemViewModel {
        
        const item = ShoppingListItem.getDb().findById(id);
        item.checked = value;
        ShoppingListItem.getDb().save(item);

        return ShoppingListItemViewModel.fromEntity(item);
    }

    public updateIndexes(input: ShoppingListItemIndexesInputModel): ShoppingListItemViewModel[] {

        const items = ShoppingListItem.getDb().findAll(x => input.items.map(y => y.id).includes(x.id));

        items.forEach(item => {
            item.index = input.items.find(x => x.id == item.id).index;
            ShoppingListItem.getDb().save(item);
        });

        return items.map(ShoppingListItemViewModel.fromEntity);
    }
}