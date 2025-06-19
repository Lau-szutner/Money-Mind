// models/index.js
import sequelize from '../config/database.js';

import User from './User.js';
import Post from './Post.js';
import Transaction from './Transaction.js';
import PostVote from './PostVote.js';

// Relaciones

// Usuario - Transacciones
// Usuario - Transacciones
User.hasMany(Transaction, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });

// Usuario - Posts
User.hasMany(Post, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });

// Usuario - PostVotes
User.hasMany(PostVote, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
PostVote.belongsTo(User, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });

// Post - PostVotes
Post.hasMany(PostVote, { foreignKey: 'fk_post_id', onDelete: 'CASCADE' });
PostVote.belongsTo(Post, { foreignKey: 'fk_post_id', onDelete: 'CASCADE' });

/*
  Métodos generados por Sequelize para las relaciones:

  // Para un usuario:
  const user = await User.findByPk(1);
  const transactions = await user.getTransactions();
  const posts = await user.getPosts();
  const votes = await user.getPostVotes();

  // Para una transacción:
  const transaction = await Transaction.findByPk(10);
  const ownerUser = await transaction.getUser();

  // Para un post:
  const post = await Post.findByPk(5);
  const ownerUserPost = await post.getUser();
  const votes = await post.getPostVotes();

  // Para un voto:
  const vote = await PostVote.findByPk(2);
  const user = await vote.getUser();
  const post = await vote.getPost();
*/

// Exportar modelos y sequelize para usar en app
export { sequelize, User, Post, Transaction, PostVote }; // 👈 exportar PostVote
