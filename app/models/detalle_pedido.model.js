module.exports = (sequelize, Sequelize) => {
    
  const DetallePedido = sequelize.define("detalle_pedido", {
    id_detalle: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pedido: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: Sequelize.INTEGER
    },
    subtotal: {
      type: Sequelize.FLOAT
    }
  });

  return DetallePedido;
};
