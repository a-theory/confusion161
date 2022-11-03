import jwt from 'jsonwebtoken';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};
import Users from "../../domain-model/users.mjs";
import Keys from "../../domain-model/keys.mjs";

export default class refresh extends Base {
    async validate(data = {}) {
        const rules = {
            userData	: [	'required' ],
        };

        return this.doValidation(data, rules);
    }

    async execute({ userData }) {
        const keys = await Keys.findOne({where: {userId: userData.id}})

        const accessToken = await jwt.sign(
            { id: userData.id },
            config.accessToken,
            { expiresIn: '1m' }
        );

        await keys.update({access: accessToken});

        return { accessToken };
    }
}
