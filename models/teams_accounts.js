'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams_accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teams_accounts.init({
    teams_id: DataTypes.INTEGER,
    accounts_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'teams_accounts',
  });
  return teams_accounts;
};