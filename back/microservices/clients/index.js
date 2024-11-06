const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const clientRoutes = require('./routes');
app.use('/clients', clientRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`Clients service running on port ${port}`);
});
