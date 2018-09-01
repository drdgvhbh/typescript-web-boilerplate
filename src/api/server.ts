import * as debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import { distPath } from './paths';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(path.resolve(distPath, 'index.html')));

app.listen(port, () => debug('info')(`Server is listening on port ${port}`));

app.use(express.static(distPath));
