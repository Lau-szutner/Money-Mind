//models/Community.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Community = sequelize.define(
  'Community',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT, // Para descripciones largas
      allowNull: true,
    },
  },
  {
    tableName: 'communities',
    timestamps: true,
  }
);

export default Community;
