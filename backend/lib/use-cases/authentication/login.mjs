import jwt from 'jsonwebtoken';
import argon2  from 'argon2';
import User         from '../../domain-model/users.mjs';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};

export default class login extends Base {
    async validate(data = {}) {
        const rules = {
            email   	: [	'required', 'email', { min_length: 3, max_length: 255 } ],
            password	: [	'required', 'string', { min_length: 8, max_length: 20 } ],
        };

        return this.doValidation(data, rules);
    }

    async execute({ email, password }) {
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
            { expiresIn: '10m' }
        );

        const refreshToken = await jwt.sign(
            { id: user.id },
            config.refreshTokenKey, { expiresIn: '1d' }
        );

        return { user, accessToken, refreshToken };
    }
}
