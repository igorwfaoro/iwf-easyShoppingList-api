import { Router } from "express";
import { VERSION } from "../version";
import { ShoppingListItemsController } from "./controllers/soccer-team-categories.controller";
import { ENV_CONFIG } from "./env-config";
import { CONSTANTS } from "./static/constants";

const routes = Router();

routes.get(`/`, (req, res) => res.json({
    name: CONSTANTS.API_NAME,
    version: VERSION,
    environment: ENV_CONFIG.ENV
}));

routes.use(`/${CONSTANTS.API_V1}/shopping-list-items`, ShoppingListItemsController);

export { routes };