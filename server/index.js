import express from 'express';
import bodyParser from 'body-parser';

import Api from './api';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/api', Api(app));
app.use(express.static(`${__dirname}/app`));


app.listen(port, console.log(`Server started on port ${port}`));
