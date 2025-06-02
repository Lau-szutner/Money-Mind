// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Transaction from './Transaction.js';
import Post from './Post.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    freezeTableName: true,
    underscored: true,
  }
);

// 🔗 Relaciones
User.hasMany(Transaction, { foreignKey: 'fk_user_id' });
Transaction.belongsTo(User, { foreignKey: 'fk_user_id' });

User.hasMany(Post, { foreignKey: 'fk_user_id' });
Post.belongsTo(User, { foreignKey: 'fk_user_id' });

export default User;
