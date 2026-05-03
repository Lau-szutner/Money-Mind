// models/UserCommunity.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserCommunity = sequelize.define(
  'UserCommunity',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    community_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'communities',
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'moderator', 'member'),
      allowNull: false,
      defaultValue: 'member',
    },
    status: {
      type: DataTypes.ENUM('active', 'pending', 'banned'),
      allowNull: false,
      defaultValue: 'pending',
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'user_communities',
    timestamps: true,
  },
);

export default UserCommunity;
