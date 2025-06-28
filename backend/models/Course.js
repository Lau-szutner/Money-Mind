import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // para precios con decimales
      allowNull: false,
    },
  },
  {
    tableName: 'courses',
    timestamps: true,
    underscored: true,
  }
);

export default Course;
