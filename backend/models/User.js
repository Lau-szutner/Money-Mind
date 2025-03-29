// models/User.js
import { DataTypes } from 'sequelize'; // Importa los tipos de datos de Sequelize
import sequelize from '../config/database.js'; // Importa la conexión de la base de datos
import Transaction from './Transaction.js'; // Importa el modelo correcto

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users', // Se recomienda en minúsculas para evitar problemas
    freezeTableName: true, // Evita que Sequelize pluralice la tabla automáticamente
    underscored: true, // Convierte los nombres de las columnas a snake_case
  }
);

// Relaciones
User.hasMany(Transaction, { foreignKey: 'fk_user_id' }); // Un usuario tiene muchas transacciones
Transaction.belongsTo(User, { foreignKey: 'fk_user_id' }); // Cada transacción pertenece a un usuario

export default User;
