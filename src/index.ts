/**
 *  index.ts
 */

import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import router from "./router/index";
import {sequelize} from "./database/config/config";
import {
  errorHandler,
  status400Handler,
  status401Handler,
  status403Handler,
  status404Handler,
  status409Handler
} from "./middlewares/errorHandler";

const hsts = require('hsts')
const frameguard = require("frameguard");

const app: express.Express = express();
const whitelist = process.env.BUCKET === 'prod' ? [String(process.env.FRONT_URL)] : '*'

app.use(cors({origin: whitelist, credentials: true}));

app.set("etag", false);
app.use(express.json({limit: '7mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("static"));

app.use(frameguard({action: "SAMEORIGIN"}));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.secure) {
    hstsMiddleware(req, res, next)
  } else {
    next()
  }
})

app.use("/api/v1", router);

const hstsMiddleware = hsts({
  maxAge: 1234000
})

app.use(status404Handler);

app.use(status400Handler);

app.use(status401Handler);

app.use(status403Handler);

app.use(status409Handler);

app.use(errorHandler);

try {
  sequelize.authenticate()
    .then(() => {
      console.log('[index.ts] Connection has been established successfully.');
    });
} catch (error) {
  console.log('[index.ts] Unable to connect to the database:', error);
}

app.listen(process.env.PORT, () => {
  console.log(
    `[index.ts] server listening on port: ${process.env.PORT} and env: ${process.env.NODE_ENV}`
  );
});

export default app;