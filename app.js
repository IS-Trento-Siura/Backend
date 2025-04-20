import express from 'express';
//import usersRoutes from './routes/userRoutes.js';
//import reportsRoutes from './routes/reportRoutes.js';
//import orgsRoutes from './routes/orgRoutes.js';
import mongoConnect from './db.js';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT
const app = express();
mongoConnect();

//app.use("/api/users", usersRoutes);
//app.use("/api/reports", reportsRoutes);
//app.use("/api/orgs", orgsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});