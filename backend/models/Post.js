// models/Post.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
  }
);

export default Post;
