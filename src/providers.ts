import { Container } from 'inversify';
import { DbProvider } from './database/db.provider';
import { ShoppingListItemService } from './services/shopping-list-item.service';

const ServicesCollection = new Container();

ServicesCollection.bind(ShoppingListItemService).toSelf();

export { ServicesCollection };