// models/index.js
import sequelize from '../config/database.js';

import User from './User.js';
import Post from './Post.js';
import Transaction from './Transaction.js';
import PostVote from './PostVote.js';
import Community from './Community.js';
import Course from './Course.js';
import Category from './Category.js';
import UserCommunity from './UserCommunity.js';

/**
 * RELACIONES DE USUARIO
 */

// Usuario - Transacciones (1:N)
User.hasMany(Transaction, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'fk_user_id' });

// Usuario - Posts (1:N)
User.hasMany(Post, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'fk_user_id' });

// Usuario - PostVotes (1:N)
User.hasMany(PostVote, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
PostVote.belongsTo(User, { foreignKey: 'fk_user_id' });

// Usuario - Categorías (1:N) - Para categorías personalizadas de finanzas
User.hasMany(Category, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'fk_user_id' });

/**
 * RELACIONES DE COMUNIDAD
 */

// Dueño de la comunidad (1:N)
User.hasMany(Community, { foreignKey: 'owner_id', as: 'ownedCommunities' });
Community.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Relación N:M Usuario - Comunidad (Miembros)
User.belongsToMany(Community, {
  through: UserCommunity,
  foreignKey: 'user_id',
  otherKey: 'community_id',
});
Community.belongsToMany(User, {
  through: UserCommunity,
  foreignKey: 'community_id',
  otherKey: 'user_id',
});

// Relaciones directas con el modelo Pivot (Para consultas de roles/status)
User.hasMany(UserCommunity, { foreignKey: 'user_id' });
UserCommunity.belongsTo(User, { foreignKey: 'user_id' });
Community.hasMany(UserCommunity, { foreignKey: 'community_id' });
UserCommunity.belongsTo(Community, { foreignKey: 'community_id' });

/**
 * RELACIONES DE POSTS
 */

// Post - Community (N:1) - Todo post pertenece a una comunidad
Community.hasMany(Post, { foreignKey: 'fk_community_id', onDelete: 'CASCADE' });
Post.belongsTo(Community, { foreignKey: 'fk_community_id' });

// Post - PostVotes (1:N)
Post.hasMany(PostVote, { foreignKey: 'fk_post_id', onDelete: 'CASCADE' });
PostVote.belongsTo(Post, { foreignKey: 'fk_post_id' });

/**
 * RELACIONES DE TRANSACCIONES Y CURSOS
 */

// Transacción - Categoría (N:M)
Transaction.belongsToMany(Category, { through: 'Transaction_categories' });
Category.belongsToMany(Transaction, { through: 'Transaction_categories' });

// Usuario - Cursos (1:N) - Asumiendo que un usuario crea cursos o es instructor
User.hasMany(Course, { foreignKey: 'fk_instructor_id', onDelete: 'SET NULL' });
Course.belongsTo(User, { foreignKey: 'fk_instructor_id', as: 'instructor' });

/**
 * EXPORTACIÓN DE MODELOS
 */
export {
  sequelize,
  User,
  Post,
  Transaction,
  PostVote,
  Community,
  Course,
  Category,
  UserCommunity,
};
