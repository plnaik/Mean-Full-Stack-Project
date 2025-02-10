const express =require('express');
const connectDB = require('./config');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);


app.listen(5000,()=>{
    console.log(`Server running on port= ${5000}`);
    
});
