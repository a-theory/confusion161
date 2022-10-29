import jwt from 'jsonwebtoken';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};

export default class refresh extends Base {
    async validate(data = {}) {
        const rules = {
            userData	: [	'required' ],
        };

        return this.doValidation(data, rules);
    }

    async execute({ userData }) {
        const accessToken = await jwt.sign(
            { id: userData.id },
            config.accessToken,
            { expiresIn: '10m' }
        );

        return { accessToken };
    }
}
