import Base from "./base.mjs";
import { DataTypes as DT }     from 'sequelize';

export default class ArticlesToCategories extends Base {
	static modelName = "UsersToArticles";

	static generateSchema() {
		this.modelSchema = {
			id: {type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true},
			userId: DT.UUID,
			articleId: DT.UUID,

			createdAt : { type: DT.DATE, allowNull: false },
			updatedAt : { type: DT.DATE, allowNull: false }
		}
		return this.modelSchema;
	}

	static initRelations() {}
}
