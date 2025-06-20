import express from 'express';
import usersRoutes from './routes/UserRoutes.js';
import reportsRoutes from './routes/ReportRoutes.js';
import orgsRoutes from './routes/OrgRoutes.js';
import { mongoConnect } from './utils/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';



dotenv.config();


const PORT = process.env.PORT
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:8080', // allow your frontend
  credentials: true // if you're using cookies or auth headers
}));

mongoConnect();

app.use("/api/users", usersRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/orgs", orgsRoutes);


export default app;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});