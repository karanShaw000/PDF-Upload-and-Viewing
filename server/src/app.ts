import express, { Express, Request, Response } from "express";
import cors from 'cors'
import pdfRouter from "./routes/pdfRoutes";

const app: Express = express();
const port = 5000



app.use(cors({
    origin: 'http://localhost:5173',
    exposedHeaders: ['File-Name']
}))

app.get("/", (req: Request, res: Response) => {
    res.send("Server working");
});


app.use('/pdf', pdfRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
