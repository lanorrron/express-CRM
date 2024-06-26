import express from 'express';
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());

app.use('/api', routes); // Esto usará las rutas en /api/accounts

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


export default app;
