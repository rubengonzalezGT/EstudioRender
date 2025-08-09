const db = require("../models");
const Detalle = db.detalle_pedidos;
const Op = db.Sequelize.Op;

// Crear detalle de pedido
exports.create = (req, res) => {
    if (!req.body.id_pedido || !req.body.id_producto || !req.body.cantidad || !req.body.subtotal) {
        res.status(400).send({ message: "Todos los campos son obligatorios." });
        return;
    }

    const detalle = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    };

    Detalle.create(detalle)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al crear el detalle." }));
};

// Obtener todos los detalles
exports.findAll = (req, res) => {
    Detalle.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al obtener detalles." }));
};

// Obtener un detalle por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Detalle.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Detalle con id=${id} no encontrado.` });
        })
        .catch(err => res.status(500).send({ message: "Error al obtener detalle con id=" + id }));
};

// Actualizar detalle
exports.update = (req, res) => {
    const id = req.params.id;

    Detalle.update(req.body, { where: { id_detalle: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Detalle actualizado correctamente." });
            else res.send({ message: `No se pudo actualizar el detalle con id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error al actualizar detalle con id=" + id }));
};

// Eliminar detalle
exports.delete = (req, res) => {
    const id = req.params.id;

    Detalle.destroy({ where: { id_detalle: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Detalle eliminado correctamente." });
            else res.send({ message: `No se encontró detalle con id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "No se pudo eliminar detalle con id=" + id }));
};
