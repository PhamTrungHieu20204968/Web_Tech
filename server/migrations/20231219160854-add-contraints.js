"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint(
        "blogs",
        {
          type: "foreign key",
          name: "fk_blogs_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );
      await queryInterface.addConstraint(
        "comments",
        {
          type: "foreign key",
          name: "fk_comments_users_id",
          fields: ["userId"],
          references: {
            table: "users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

      await queryInterface.addConstraint(
        "comments",
        {
          type: "foreign key",
          name: "fk_comments_blogs_id",
          fields: ["blogId"],
          references: {
            table: "blogs",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        transaction
      );

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
     

      await queryInterface.removeConstraint("blogs", "fk_blogs_users_id", {
        transaction,
      });

      await queryInterface.removeConstraint(
        "comments",
        "fk_comments_users_id",
        {
          transaction,
        }
      );

      await queryInterface.removeConstraint(
        "comments",
        "fk_comments_blogs_id",
        {
          transaction,
        }
      );
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};
