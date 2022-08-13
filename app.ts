require('dotenv').config();

import "reflect-metadata";
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment-timezone'
import { routes } from './src/routes';
import { ENV_CONFIG } from './src/env-config';
import { onError } from "./src/common/functions/on-error";
import { ServicesCollection } from "./src/providers";
import { DbProvider } from "./src/database/db.provider";

console.log('Initializing...');

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

moment.tz.setDefault('UTC');

app.use('/files', express.static(`${process.cwd()}/files`));
app.use(routes);

app.use(onError);

const listener = app.listen(ENV_CONFIG.PORT, ENV_CONFIG.HOST, () => {
    const { address, port } = listener.address() as any;
    console.log(`Running on http://${address}:${port}`);
});