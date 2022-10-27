import Articles         from '../../domain-model/articles.mjs';
import UsersToArticles         from '../../domain-model/users-to-articles.mjs';
import ArticlesToCategories         from '../../domain-model/articles-to-categories.mjs';
import Users         from '../../domain-model/users.mjs';
import Categories         from '../../domain-model/categories.mjs';
import Base from '../../use-cases/Base.mjs';
import {initMinio} from "../../minio/index.mjs";

export default class Create extends Base {
    async validate(data = {}) {
        const rules = {
            userData : [ 'required' ],
            name : [ 'required', 'string' ],
            brief : [ 'required', 'string' ],
            categories : [ 'required' ],
            file : [ 'required' ],
        };

        return this.doValidation(data, rules);
    }

    async execute({ file, ids, categories, name, brief, userData}) {
        const htmlString = file.buffer.toString()
        if (htmlString.search("<script") !== -1){
            throw Error("HTML_ERROR");
        }
        const minioClient = await initMinio();

        const originalname = file.originalname.split(' ');
        const fileName = originalname.join('_');

        await minioClient.putObject('mysite', fileName, file.buffer);
        const url = await minioClient.presignedGetObject('mysite', fileName);
        // const url2 = await minioClient.presignedUrl('GET', 'mysite', fileName)

        const article = await Articles.create({
            name: name,
            brief: brief,
            pdf: url,
        });

        for (const i of JSON.parse(categories)){
            await ArticlesToCategories.create({
                articleId: article.id,
                categoryId: i
            });
        }


        // for (const i of ids){
        //     await UsersToArticles.create({
        //         userId: i,
        //         articleId: article.id
        //     });
        // }
        //
        //


        // const articleN = Articles.findOne({
        //     where: {
        //         id: article.id
        //     },
        //     include: [
        //         // Users,
        //         Categories,
        //     ],
        // });

        return {
            // article: articleN
        };
    }
}
