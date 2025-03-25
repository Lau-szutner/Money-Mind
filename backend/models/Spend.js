// models/Spend.js
import { DataTypes } from 'sequelize'; // Importa los tipos de datos de Sequelize
import sequelize from '../config/database.js'; // Importa la conexión de la base de datos

const Spend = sequelize.define('Spend', {
  id_spend: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // FALTA AGREGAR LOS FK
});

export default Spend;
