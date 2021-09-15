'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({teams}) {
      this.belongsToMany(teams,{foreignKey: 'users_id', through: 'teams_users', as : 'teams',  onDelete: 'cascade'});
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING,
      unique: true
      },
    password: DataTypes.STRING,
    role:{
      type: DataTypes.ENUM,
      values: ['super', 'admin', 'users']
    },
    name: DataTypes.STRING,
    english: DataTypes.STRING,
    skills: DataTypes.STRING,
    cv_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};