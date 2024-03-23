import express from 'express'
const app = express();
import firmRoutes from './routes/firmRoutes.js'
import clientRoutes from './routes/clientRoutes.js'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/firm', firmRoutes);
app.use('/client', clientRoutes);

const PORT = 5200;

app.listen(PORT, () => {
    console.log(`Live on PORT ${PORT}`);
})
