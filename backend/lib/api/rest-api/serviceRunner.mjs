import {Exception} from "../../use-cases/Exception.mjs";
import winston from 'winston';
import {getToken} from "./middlewares/token.mjs";
import responseTime from "response-time";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: './log/error.log', level: 'error' }),
        new winston.transports.File({ filename: './log/combined.log' }),
    ],
});

export async function runUseCase(useCaseClass, { context = {}, params = {} }) {
    const result = await new useCaseClass({ context }).run(params);

    return result;
}

export function makeUseCaseRunner(
    useCaseClass,
    paramsBuilder,
    params,
    render = renderPromiseAsJson
) {
    return async function useCaseRunner(req, res, next) {
        const resultPromise = runUseCase(useCaseClass, {
            params : paramsBuilder(req, res),
        });

        return render(req, res, resultPromise, next);
    };
}

export async function renderPromiseAsJson(req, res, promise) {
    try {
        const data = await promise;

        data.status = 1;
        logger.log({
            level: 'info',
            ...createLogData(req, res)
        });

        return res.send(data);
    } catch (error) {
        /* istanbul ignore next */
        if (error instanceof Exception) {
            logger.log({
                level: 'error',
                messageError: error.toHash(),
                ...createLogData(req, res)
            })
            res.send({
                status : 0,
                error  : error.toHash()
            });
        } else {
            logger.log({
                level: 'error',
                messageError: error.message,
                ...createLogData(req, res)
            })
            console.log(error);
            res.send({
                status : 0,
                error  : {
                    code    : 'SERVER_ERROR',
                    message : 'Please, contact your system administartor!'
                }
            });
        }
    }
}

function createLogData(req, res){
    return {
        message: `HTTP ${req.method} ${res.statusCode} ${req.url}`,
        meta: {
            ip: req.ips.length ? req.ips : req.ip,
            // ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            protocol: req.protocol,
            hostname: req.hostname,
            req: {
                headers: req.headers,
                data: req.data,
                params: req.params,
                query: req.query,
                httpVersion: req.httpVersion,
                originalUrl: req.originalUrl,
                method: req.method,
            },
            res: {
                statusCode: res.statusCode,
            },
            time: new Date(),
        }
    }
}

// {"level":"info","message":"HTTP GET /api/v1/categories?userId=7aaa7bdf-100e-4240-9d49-7031ff862df1","meta":{"req":{"headers":{"accept":"application/json, text/plain, */*","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.5","authorization":"Bearer 56312c4812c031baa867a722e70547283fa2d8203c7c6226a53002b9fb838787d7b048024421db2eaf0853a7fb57b97f22030ccf2cbe7caba3110cb1a8eecbb459f2714a290a7654e34f39d8c5f3bd8fe644f55071dd6fc8f8ca5623bdf22def3c9b4ee7f4b527a46cb7f7af8c788cb0db2ecc14b03f912031ecff9e86c7ed22fe64c3bfda8281ec742b0d6ec5830b1b0a4780cbeb3fc3a6875f8211fb4699f59233aacaf1890cbd0b84d54b3d1e1ec5fbc53a027821c57f7c81cb","connection":"keep-alive","dnt":"1","host":"localhost:8080","if-none-match":"W/\"1e8-vlHORiPCA8Rfemrpylf1TRuEJ+g\"","origin":"https://localhost:3000","referer":"https://localhost:3000/","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","sec-gpc":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0"},"httpVersion":"1.1","method":"GET","originalUrl":"/api/v1/categories?userId=7aaa7bdf-100e-4240-9d49-7031ff862df1","query":{"userId":"7aaa7bdf-100e-4240-9d49-7031ff862df1"},"url":"/api/v1/categories?userId=7aaa7bdf-100e-4240-9d49-7031ff862df1"},"res":{"statusCode":304},"responseTime":68}}
