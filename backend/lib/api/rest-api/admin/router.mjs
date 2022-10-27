import express     from 'express';

import controllers from './controllers/index.mjs';
import multer from "../middlewares/multer.mjs";
import {validateJwt} from "../middlewares/token.mjs";
// import middlewares from './../middlewares.mjs';


const router = express.Router();
// const { fileUpload, detectDevice, detectIp, sequelizeSession, errorHandler } = middlewares;
// const { check } = controllers.sessions;

export default function init({sequelize}) {
    // router.use(sequelizeSession({ sequelize }));
    // router.use(fileUpload().any());
    // router.use(csrfProtection);

    // users
    router.get('/users', validateJwt, controllers.users.show);
    router.get('/users/requests', validateJwt, controllers.users.showRequests);
    router.get('/gpg',  controllers.users.getGpg);
    router.patch('/users/:id', validateJwt, controllers.users.update);
    router.delete('/users/:id', validateJwt, controllers.users.delete);

    // articles
    router.get('/articles',  controllers.articles.show);
    router.get('/articles/:id',  controllers.articles.getOne);
    router.post('/articles', validateJwt, multer.single("file"), controllers.articles.create);
    router.delete('/articles/:id', validateJwt, controllers.articles.delete);

    // categories
    router.get('/categories',  controllers.categories.show);
    router.get('/categories/:id',  controllers.categories.getOne);
    router.post('/categories', validateJwt,  controllers.categories.create);
    router.delete('/categories/:id', validateJwt,  controllers.categories.delete);

    // authentication
    router.post('/login',  controllers.authentication.login);
    router.post('/register',  controllers.authentication.register);

    // router.use(errorHandler);

    return router;
}

