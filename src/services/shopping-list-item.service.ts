import { injectable } from "inversify";
import { ShoppingListItem } from "../models/entities/shopping-list-item";
import { ShoppingListItemViewModel } from "../models/view-models/shopping-list-item.view-model";

@injectable()
export class ShoppingListItemService {

    public getAll(): ShoppingListItemViewModel[] {
        const items = ShoppingListItem.getDb().findAll();
        return items.map(ShoppingListItemViewModel.fromEntity);
    }
}