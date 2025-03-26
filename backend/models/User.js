// models/User.js
import { DataTypes } from 'sequelize'; // Importa los tipos de datos de Sequelize
import sequelize from '../config/database.js'; // Importa la conexión de la base de datos
import Spend from './Spend.js';

// Convención para transformar los nombres de las tablas y las columnas a snake_case
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: INTEGER (equivalente a INT en SQL)
      allowNull: false, // El campo no puede ser nulo
      autoIncrement: true, // Se incrementa automáticamente
      primaryKey: true, // Es la clave primaria
    },
    name: {
      type: DataTypes.STRING(45), // Tipo de dato: STRING con un tamaño de 45 caracteres
      allowNull: false, // El campo no puede ser nulo
      unique: true, // El valor debe ser único
    },
    email: {
      type: DataTypes.STRING(100), // Tipo de dato: STRING con un tamaño de 100 caracteres
      allowNull: false, // El campo no puede ser nulo
      unique: true, // El valor debe ser único
    },
    password: {
      type: DataTypes.STRING(255), // Tipo de dato: STRING con un tamaño de 255 caracteres
      allowNull: false, // El campo no puede ser nulo
    },
    register_date: {
      type: DataTypes.DATE, // Tipo de dato: DATE
      allowNull: false, // El campo no puede ser nulo
      defaultValue: DataTypes.NOW, // Valor por defecto: la fecha y hora actuales
    },
  },
  {
    tableName: 'users', // Especifica explícitamente el nombre de la tabla en minúsculas
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla automáticamente
    underscored: true, // Convierte los nombres de las columnas en snake_case (por ejemplo, 'idUsers' a 'id_users')
  }
);

User.hasMany(Spend, { foreignKey: 'user_id' }); // Establece el FK para Spend
Spend.belongsTo(User, { foreignKey: 'user_id' }); // Establece el FK para Spend

export default User;
