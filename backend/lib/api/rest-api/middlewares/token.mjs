import jwt from "jsonwebtoken";
import Users from "../../../domain-model/users.mjs";
import config from '#global-config' assert {type: 'json'};

export async function validateAccessToken(req, res, next) {
    await validateToken(req, res, next, true);
}

export async function validateRefreshToken(req, res, next) {
    await validateToken(req, res, next, false);
}

async function validateToken(req, res, next, isAccess) {
    try {
        const token = getToken(req);
        const conf = isAccess ? config.accessTokenKey : config.refreshTokenKey
        const {id, exp} = await jwt.verify(token, conf);
        if (Date.now() >= exp * 1000) {
            if (isAccess){
                return res.status(498).send({
                    error: "OLD_TOKEN"
                });
            } else {
                throw {message: "unauthorised"}
            }
        }

        const user = await Users.findByPk(id);
        if (!user) {
            throw new Error("NOT_VALID_USER");
        }

        req.userData = user;

        await next();
    } catch (e) {
        res.status(400).send({
            error: "WRONG_TOKEN"
        });
    }
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }

    if (req.query && req.query.token) {
        return req.query.token;
    }

    if (req.params && req.params.token) {
        return req.params.token;
    }

    if (req.params && req.params.token) {
        return req.params.token;
    }

    if (req.get('X-AuthToken')) {
        return req.get('X-AuthToken')
    }

    return null;
}
