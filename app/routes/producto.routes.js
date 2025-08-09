module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();

    // Create a new Product
    router.post("/create/", productos.create);

    // Retrieve all Products
    router.get("/", productos.findAll);

    // Retrieve a single Product with id
    router.get("/:id", productos.findOne);

    // Update a Product with id
    router.put("/update/:id", productos.update);

    // Delete a Product with id
    router.delete("/delete/:id", productos.delete);

    // Podemos utilizar como una opción app.use("EndPoint", router) para simplificar el URI
    // Ej. http://localhost:Puerto/api/product/
    app.use("/api/producto", router);
};
