const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all services
router.get('/', permission('admin', 'client'), async (req, res) => {
  const services = await sequelize.models.services.findAndCountAll();
  return res.status(200).json({ data: services });
});

// Create a new service
router.post('/', permission('admin', "client"), async (req, res) => {
  const { body } = req;
  const service = await sequelize.models.services.create({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  });
  await service.save();
  return res.status(201).json({ data: service })
});

// Update a service by id
router.put('/:id', permission('admin', "client"), async (req, res) => {
  const { body, params: { id } } = req;
  const service = await sequelize.models.services.findByPk(id);
  if (!service) {
    return res.status(404).json({ code: 404, message: 'Service not found' });
  }
  const updatedService = await service.update({
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  });
  return res.json({ data: updatedService });
});

// Delete a service by id
router.delete('/:id', permission('admin', "client"), async (req, res) => {
  const { params: { id } } = req;
  const service = await sequelize.models.services.findByPk(id);
  if (!service) {
    return res.status(404).json({ code: 404, message: 'Service not found' });
  }
  await service.destroy();
  return res.json();
});

module.exports = router;