/* eslint-disable no-sync */
import fs            from 'fs';
import https         from 'https';
import express       from 'express';
import bluebird    from 'bluebird';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRotes    from './admin/router.mjs';
import path from "path";
import helmet from "helmet";
import responseTime from "response-time";
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const promisify = bluebird.promisifyAll;

const app = express();

let server = null;

export function init({ sequelize }) {
    app.set('trust proxy', true)

    app.use(cors());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(helmet());
    app.use(responseTime());
    app.use(limiter)
    app.use('/storage', express.static('storage'));

    app.use('/api/v1',  adminRotes({ sequelize }));

    return app;
}

export function start({ appPort, secure }) {
    const securedApp = secure ? useHttps(app) : app;

    server = securedApp.listen(appPort, () => {
        console.log(`app started on port ${appPort}`);
        console.log(`app mode ${
            process.env.API_MODE ? process.env.API_MODE : "PRODUCTION"
        }`);
    });

    server.closeAsync = promisify(server.close);
}

export async function stop() {
    if (!server) return;

    console.log('server was stopped');

    await server.closeAsync();
}

function useHttps(application) {
    const httpsOptions = {
        key  : fs.readFileSync(path.join("certs", "key.pem")),
        cert : fs.readFileSync(path.join("certs", "cert.pem"))
    };

    return https.createServer(httpsOptions, application);
}
