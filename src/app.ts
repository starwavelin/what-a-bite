/**
 * Required External Modules
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { itemsRoter } from './controllers/items.router';

dotenv.config();


/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/** Inject routers */
app.use('/api', itemsRoter);


/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});