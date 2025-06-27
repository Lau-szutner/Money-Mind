// models/index.js
import sequelize from '../config/database.js';

import User from './User.js';
import Post from './Post.js';
import Transaction from './Transaction.js';
import PostVote from './PostVote.js';
import Community from './Community.js';

// Relaciones

// Usuario - Transacciones
// Usuario - Transacciones

// Crea una relación de 1:N. hasMany indica que un User tiene muchas Transactions.
// La foreign key 'fk_user_id' se define en el modelo Transaction (target model).
User.hasMany(Transaction, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
// Crea una relación inversa de N:1. Cada Transaction pertenece a un User.
// También usa 'fk_user_id' como foreign key en Transaction.
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

// Relación N:M → Muchos usuarios pueden pertenecer a muchas comunidades.
// belongsToMany define una relación muchos-a-muchos entre los modelos User y Community.
// Sequelize crea automáticamente una tabla intermedia (pivot) llamada 'UserCommunities'.
// En esta tabla se definen las claves foráneas que referencian a ambos modelos.
User.belongsToMany(Community, { through: 'UserCommunities' });
Community.belongsToMany(User, { through: 'UserCommunities' });

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
export { sequelize, User, Post, Transaction, PostVote, Community }; // 👈 exportar PostVote
