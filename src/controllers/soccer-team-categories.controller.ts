import { NextFunction, Request, Response, Router } from "express";
import { ServicesCollection } from "../providers";
import { ShoppingListItemService } from "../services/shopping-list-item.service";

const ShoppingListItemsController = Router();

const shoppingListItemService = ServicesCollection.resolve(ShoppingListItemService);

ShoppingListItemsController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = shoppingListItemService.getAll();
        res.json(items);
    } catch (error) {
        next(error);
    }
});

export { ShoppingListItemsController };