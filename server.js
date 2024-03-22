import express from 'express'
const app = express();

import indexRoute from './routes/index.js'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRoute);

const PORT = 5200;

app.listen(PORT, () => {
    console.log(`Live on PORT ${PORT}`);
})
