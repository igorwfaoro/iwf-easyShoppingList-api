import { NextFunction, Request, Response, Router } from "express";
import { ServicesCollection } from "../providers";
import { ShoppingListItemService } from "../services/shopping-list-item.service";

const ShoppingListItemsController = Router();

const shoppingListItemService = ServicesCollection.resolve(ShoppingListItemService);

ShoppingListItemsController.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = shoppingListItemService.getAll();
        res.json(items);
    } catch (error) {
        next(error);
    }
});

ShoppingListItemsController.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = shoppingListItemService.getById(req.params.id);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

ShoppingListItemsController.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = shoppingListItemService.update(req.params.id, req.body);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

ShoppingListItemsController.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        shoppingListItemService.delete(req.params.id);
        res.send();
    } catch (error) {
        next(error);
    }
});

ShoppingListItemsController.patch('/:id/check', (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = shoppingListItemService.updateChecked(req.params.id, true);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

ShoppingListItemsController.patch('/:id/uncheck', (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = shoppingListItemService.updateChecked(req.params.id, false);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

export { ShoppingListItemsController };