import jwt from "jsonwebtoken";
import Users from "../../../domain-model/users.mjs";
import config from '#global-config' assert {type: 'json'};

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


export async function validateJwt(req, res, next) {
    try {
        const token = getToken(req);

        const tokenData = await jwt.verify(token, config.tokenLoginKey);
        if (Date.now() >= tokenData.exp * 1000) {
            throw new Error("TOKEN_OLD");
        }

        const user = await Users.findByPk(tokenData.id);
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
