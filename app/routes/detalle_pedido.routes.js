module.exports = app => {
    const detalle = require("../controllers/detalle_pedido.controller.js");
    var router = require("express").Router();

    // Crear nuevo detalle
    router.post("/create/", detalle.create);

    // Obtener todos los detalles
    router.get("/", detalle.findAll);

    // Obtener detalle por ID
    router.get("/:id", detalle.findOne);

    // Actualizar detalle
    router.put("/update/:id", detalle.update);

    // Eliminar detalle
    router.delete("/delete/:id", detalle.delete);

    // Prefijo para las rutas
    app.use("/api/detalle", router);
};
