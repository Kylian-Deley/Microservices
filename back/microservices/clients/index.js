const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0';
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected for Client'))
    .catch(err => console.log(err));

const clientRoutes = require('./routes');
app.use('/clients', clientRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
});
