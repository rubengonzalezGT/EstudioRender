const db = require("../models");
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

// Crear nuevo pedido
exports.create = (req, res) => {
    if (!req.body.id_cliente || !req.body.fecha || !req.body.total) {
        res.status(400).send({ message: "id_cliente, fecha y total son requeridos." });
        return;
    }

    const pedido = {
        id_cliente: req.body.id_cliente,
        fecha: req.body.fecha,
        total: req.body.total
    };

    Pedido.create(pedido)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al crear el pedido." }));
};

// Obtener todos los pedidos
exports.findAll = (req, res) => {
    Pedido.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al obtener pedidos." }));
};

// Obtener un pedido por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Pedido con id=${id} no encontrado.` });
        })
        .catch(err => res.status(500).send({ message: "Error al obtener pedido con id=" + id }));
};

// Actualizar un pedido
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, { where: { id_pedido: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Pedido actualizado correctamente." });
            else res.send({ message: `No se pudo actualizar el pedido con id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error al actualizar pedido con id=" + id }));
};

// Eliminar un pedido
exports.delete = (req, res) => {
    const id = req.params.id;

    Pedido.destroy({ where: { id_pedido: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Pedido eliminado correctamente." });
            else res.send({ message: `No se encontró pedido con id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "No se pudo eliminar pedido con id=" + id }));
};
