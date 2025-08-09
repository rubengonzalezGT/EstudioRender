module.exports = app => {
    const pedidos = require("../controllers/pedido.controller.js");
    var router = require("express").Router();

    // Crear nuevo pedido
    router.post("/create/", pedidos.create);

    // Obtener todos los pedidos
    router.get("/", pedidos.findAll);

    // Obtener un pedido por ID
    router.get("/:id", pedidos.findOne);

    // Actualizar pedido
    router.put("/update/:id", pedidos.update);

    // Eliminar pedido
    router.delete("/delete/:id", pedidos.delete);

    // Prefijo para las rutas
    app.use("/api/pedido", router);
};
