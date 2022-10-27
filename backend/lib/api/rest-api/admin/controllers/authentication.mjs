import Login from '../../../../use-cases/authentication/login.mjs';
import Register from '../../../../use-cases/authentication/register.mjs';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    login       : makeUseCaseRunner(Login, req => ({ ...req.query, ...req.params, ...req.body })),
    register    : makeUseCaseRunner(Register, req => ({ ...req.query, ...req.params, ...req.body })),
};
