'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, accounts}) {
      this.belongsToMany(users, {foreignKey: 'teams_id', through: 'teams_users' , as : 'users', onDelete: 'cascade'});
      this.belongsToMany(accounts, {foreignKey: 'teams_id', through: 'teams_accounts' , as : 'accounts', onDelete: 'cascade'});
    }
  };
  teams.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};