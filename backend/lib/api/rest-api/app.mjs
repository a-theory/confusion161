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
import winston from 'winston';
import useragent from 'express-useragent';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: './log/error.log', level: 'error' }),
        new winston.transports.File({ filename: './log/combined.log' }),
    ],
});

const promisify = bluebird.promisifyAll;

const app = express();

let server = null;

export function init({ sequelize }) {
    app.use(cors());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(helmet());
    app.use(useragent.express());
    app.use('/storage', express.static('storage'));

    app.use('/api/v1',  adminRotes({ sequelize }));

    return app;
}

export function start({ appPort, secure }) {
    const securedApp = secure ? useHttps(app) : app;

    server = securedApp.listen(appPort, () => {
        console.log(`app started on port ${appPort}`);
    });

    server.closeAsync = promisify(server.close);

    if (secure) {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }
}

export async function stop() {
    if (!server) return;

    console.log('server was stopped');

    await server.closeAsync();
}

function useHttps(application) {
    const httpsOptions = {
        key  : fs.readFileSync(path.join("cert", "key.pem")),
        cert : fs.readFileSync(path.join("cert", "cert.pem"))
    };

    return https.createServer(httpsOptions, application);
}
