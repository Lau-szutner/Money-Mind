//models/PostVote.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PostVote = sequelize.define(
  'PostVote',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_type: {
      type: DataTypes.ENUM('up', 'down'),
      allowNull: false,
    },
  },
  {
    tableName: 'Post_Votes',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

export default PostVote;
