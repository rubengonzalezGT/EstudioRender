module.exports = (sequelize, Sequelize) => {
    
  const Pedido = sequelize.define("pedido", {
    id_pedido: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fecha: {
      type: Sequelize.DATE
    },
    total: {
      type: Sequelize.FLOAT
    }
  });

  return Pedido;
};
