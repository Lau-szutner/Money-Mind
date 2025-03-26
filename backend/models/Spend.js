// models/Spend.js
import { DataTypes } from 'sequelize'; // Importa los tipos de datos de Sequelize
import sequelize from '../config/database.js'; // Importa la conexión de la base de datos

const Spend = sequelize.define(
  'spend',
  {
    // Cambiar 'Spend' a 'spend' en minúsculas
    id_spend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_spend', // Asegura que la columna en la base de datos se llame 'id_spend'
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'title', // La columna en la base de datos será 'title'
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: 'description', // La columna en la base de datos será 'description'
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'category', // La columna en la base de datos será 'category'
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount', // La columna en la base de datos será 'amount'
    },
  },
  {
    tableName: 'spends', // Esto asegura que la tabla en la base de datos se llame 'spends'
    underscored: true, // Asegura que los nombres de las columnas sigan el formato snake_case
  }
);

export default Spend;
