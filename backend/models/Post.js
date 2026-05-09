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
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      comment: 'URL amigable del post',
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true, // Es opcional porque el post puede ser solo una imagen o un link
    },
    post_type: {
      type: DataTypes.ENUM('text', 'link', 'image', 'video'),
      defaultValue: 'text',
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true,
      },
      comment: 'URL externa si el post_type es link',
    },

    // Denormalización (Para rendimiento: evita hacer COUNTs costosos en cada consulta)
    vote_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Suma de upvotes - downvotes',
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
    paranoid: true, // Habilita borrado lógico (deleted_at). Ideal para foros.
    indexes: [
      {
        fields: ['slug'],
      },
    ],
  },
);

export default Post;
