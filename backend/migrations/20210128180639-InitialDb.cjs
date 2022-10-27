/* eslint-disable max-lines-per-function */
// eslint-disable-next-line import/no-commonjs
const {DataTypes: DT} = require("sequelize");
module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            status: {
                type: Sequelize.ENUM,
                values: [
                    'UNVERIFIED',
                    'VERIFIED',
                ],
                defaultValue: "UNVERIFIED",
            },

            createdAt      : { type: Sequelize.DATE,    allowNull: false },
            updatedAt      : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });

        await queryInterface.createTable('Articles', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brief: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pdf: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM,
                values: [
                    'PROCESS',
                    'DONE',
                ],
                defaultValue: "PROCESS",
            },

            createdAt      : { type: Sequelize.DATE,    allowNull: false },
            updatedAt      : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });
        await queryInterface.createTable("Categories", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brief: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.createTable("UsersToArticles", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "Users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            articleId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "Articles", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.createTable("ArticlesToCategories", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            articleId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "Articles", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "Categories", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down : async (queryInterface) => {
        await queryInterface.dropTable('Users');
        await queryInterface.dropTable('Articles');
        await queryInterface.dropTable('Categories');
        await queryInterface.dropTable('UsersToArticles');
        await queryInterface.dropTable('ArticlesToCategories');
    }
};
