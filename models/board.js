import { Sequelize } from "sequelize";


class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    }, {
      sequelize,
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
}

export default Board;