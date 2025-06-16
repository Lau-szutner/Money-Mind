// models/index.js
import sequelize from '../config/database.js';

import User from './User.js';
import Post from './Post.js';
import Transaction from './Transaction.js';

// Relaciones

// Usuario - Transacciones
User.hasMany(Transaction, { foreignKey: 'fk_user_id' });
Transaction.belongsTo(User, { foreignKey: 'fk_user_id' });

// Usuario - Posts
User.hasMany(Post, { foreignKey: 'fk_user_id' });
Post.belongsTo(User, { foreignKey: 'fk_user_id' });

/*
  Métodos generados por Sequelize para las relaciones:

  // Para un usuario:
  const user = await User.findByPk(1);

  // Obtener todas las transacciones de un usuario
  const transactions = await user.getTransactions();

  // Obtener todos los posts de un usuario
  const posts = await user.getPosts();

  // Para una transacción:
  const transaction = await Transaction.findByPk(10);

  // Obtener el usuario dueño de la transacción
  const ownerUser = await transaction.getUser();

  // Para un post:
  const post = await Post.findByPk(5);

  // Obtener el usuario dueño del post
  const ownerUserPost = await post.getUser();
*/

// Exportar modelos y sequelize para usar en app
export { sequelize, User, Post, Transaction };
