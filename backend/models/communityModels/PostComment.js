import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const PostComment = sequelize.define(
  'PostComment',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parent_comment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'post_comments',
        key: 'id',
      },
    },
  },
  {
    tableName: 'post_comments',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['fk_post_id', 'created_at'],
      },
      {
        fields: ['fk_user_id'],
      },
    ],
  },
);

export default PostComment;
