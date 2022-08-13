import { DateHelper } from "../../common/helpers/date.helper";
import { ShoppingListItem } from "../entities/shopping-list-item";

export class ShoppingListItemViewModel {
    
    public id: string;
    public index: number;
    public description: string;
    public checked: boolean;
    public createdAt: string;

    public static fromEntity(entity: ShoppingListItem): ShoppingListItemViewModel {

        if(!entity) return null;
        
        const viewModel = new ShoppingListItemViewModel();

        viewModel.id = entity.id;
        viewModel.index = entity.index;
        viewModel.description = entity.description;
        viewModel.checked = entity.checked;
        viewModel.createdAt = DateHelper.toStringViewModel(entity.createdAt);

        return viewModel;
    }
}