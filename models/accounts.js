'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({teams}) {
      this.belongsToMany(teams, {foreignKey: 'accounts_id', through: 'teams_accounts' , as : 'teams',  onDelete: 'cascade'});
    }
  };
  accounts.init({
    name: DataTypes.STRING,
    client: DataTypes.STRING,
    manager: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};