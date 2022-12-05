const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const argon2 = require("argon2");

module.exports = {
    up : async (queryInterface, Sequelize) => {
        const id = uuidv4();
        const passwordHash = await argon2.hash("123456789");
        await queryInterface.bulkInsert('Users', [{
            id: id,
            name: "Artem",
            password: passwordHash,
            email: "a.filatov.xxi@gmail.com",
            status: "VERIFIED",
            createdAt: new Date(),
            updatedAt: new Date()
    }]);
    },
    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
