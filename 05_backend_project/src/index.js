import express from 'express';
import connectDB from './db/index.js';
import dotenv from 'dotenv';

// require('dotenv').config({ path: './env' });

const app = express();
dotenv.config();

// IIFI
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         app.on("error", (error) => console.error("Error: ", error));
//         console.log('Connected to MongoDB');

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error(error);
//     }
// })();

connectDB();