'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teams_users.init({
    teams_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'teams_users',
  });
  return teams_users;
};