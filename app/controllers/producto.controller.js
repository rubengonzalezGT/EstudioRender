// Importamos los modelos desde db
const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validamos que el nombre y precio vengan en el request
    if (!req.body.nombre || req.body.precio === undefined) {
        res.status(400).send({
            message: "El nombre y precio del producto son obligatorios."
        });
        return;
    }

    // Creamos el objeto producto con los datos recibidos
    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    };

    // Guardamos el producto en la base de datos
    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el producto."
            });
        });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los productos."
            });
        });
};

// Find a single Product by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Producto con id=${id} no encontrado.` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el producto con id=" + id
            });
        });
};

// Update a Product by ID
exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id_producto: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el producto con id=${id}. Tal vez no existe o el cuerpo está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el producto con id=" + id
            });
        });
};

// Delete a Product by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({
        where: { id_producto: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el producto con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el producto con id=" + id
            });
        });
};
