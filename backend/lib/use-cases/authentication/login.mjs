import jwt from 'jsonwebtoken';
import argon2  from 'argon2';
import User         from '../../domain-model/users.mjs';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};
import pad from "one-time-pad";
import crypto from 'crypto'
import Keys from "../../domain-model/keys.mjs";
import {encryptAES} from "../utils/encryption.mjs";

export default class login extends Base {
    async validate(data = {}) {
        const rules = {
            email   	: [	'required', 'email', { min_length: 3, max_length: 255 } ],
            password	: [	'required', 'string', { min_length: 8, max_length: 20 } ],
            useragent	: [	'required' ],
        };

        return this.doValidation(data, rules);
    }

    async execute({ email, password, useragent }) {
        const user = await User.findOne({ where: { email } });

        const errors = {};

        if (!user) throw ({ email: 'EMAIL_NOT_EXIST' });
        const isVerified = await argon2.verify(user.password, password);

        if (!isVerified) errors.password = 'INCORRECT_PASSWORD';
        if (user.status === 'UNVERIFIED') errors.error = 'UNVERIFIED_USER';
        if (Object.keys(errors).length) {
            throw errors;
        }
        const accessToken = await jwt.sign(
            { id: user.id },
            config.accessTokenKey,
            { expiresIn: '1m' }
        );
        const keyAccessToken = crypto.randomBytes(32);
        const encryptedAccessToken = encryptAES(accessToken, keyAccessToken)

        const refreshToken = await jwt.sign(
            { id: user.id },
            config.refreshTokenKey, { expiresIn: '7d' }
        );
        const keyRefreshToken = crypto.randomBytes(32);
        const encryptedRefreshToken = encryptAES(refreshToken, keyRefreshToken)

        await Keys.create({
            userId: user.id,
            refresh: keyRefreshToken.toString('hex'),
            access: keyAccessToken.toString('hex'),
            userAgent: JSON.stringify(useragent)
        })

        return {
            userId: user.id,
            accessToken: encryptedAccessToken.toString('hex'),
            refreshToken: encryptedRefreshToken.toString('hex')
        };
    }
}
