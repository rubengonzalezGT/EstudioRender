// usamos la función require para cargar el módulo db.config.js para traer los parámetros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");

// cargamos el módulo sequelize "ORM" para el manejo de las entidades como objetos
const Sequelize = require("sequelize");

// creamos una variable sequelize y la inicializamos como un objeto Sequelize con la información de la BD
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,              // Indica que la conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false   // Acepta certificados autofirmados o no verificados (útil en entornos no productivos)
    }
  },
  // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});

// creamos un objeto db
const db = {};

// la variable db.Sequelize = módulo importado Sequelize que está declarado previamente donde se importa el módulo
db.Sequelize = Sequelize;

// se define una variable con la configuración de sequelize
db.sequelize = sequelize;

// se crea una variable clientes que importa el modelo que está dentro de la carpeta models/cliente.model.js
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);

// puede seguir agregando más modelos e importarlos de la siguiente manera
db.productos = require("./producto.model.js")(sequelize, Sequelize);
db.pedidos = require("./pedido.model.js")(sequelize, Sequelize);
db.detalle_pedidos = require("./detalle_pedido.model.js")(sequelize, Sequelize);

// Un cliente puede tener muchos pedidos
db.clientes.hasMany(db.pedidos, { foreignKey: 'id_cliente' });
db.pedidos.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

// Un pedido puede tener muchos detalles
db.pedidos.hasMany(db.detalle_pedidos, { foreignKey: 'id_pedido' });
db.detalle_pedidos.belongsTo(db.pedidos, { foreignKey: 'id_pedido' });

// Un producto puede estar en muchos detalles de pedido
db.productos.hasMany(db.detalle_pedidos, { foreignKey: 'id_producto' });
db.detalle_pedidos.belongsTo(db.productos, { foreignKey: 'id_producto' });

// se utiliza el export para que el objeto db pueda ser accedido a través de otras clases
module.exports = db;
