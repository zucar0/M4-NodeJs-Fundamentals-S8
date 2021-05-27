const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all releases
router.get('/', permission('admin', 'client'), async (req, res) => {
  const releases = await sequelize.models.releases.findAndCountAll();
  return res.status(200).json({ data: releases });
});

// Create a new release
router.post('/', permission('admin', "client"), async (req, res) => {
  const { body } = req;
  const release = await sequelize.models.releases.create({
    title: body.title,
    author: body.author,
    key: body.key,
    objetive : body.objetive,
    image: body.image,
    content: body.content,
    sign: body.sign,
    category: body.category
  });
  await release.save();
  return res.status(201).json({ data: release })
});

// Update a release by id
router.put('/:id', permission('admin', "client"), async (req, res) => {
  const { body, params: { id } } = req;
  const release = await sequelize.models.releases.findByPk(id);
  if (!release) {
    return res.status(404).json({ code: 404, message: 'Release not found' });
  }
  const updatedRelease = await release.update({
    title: body.title,
    author: body.author,
    key: body.key,
    objetive : body.objetive,
    image: body.image,
    content: body.content,
    sign: body.sign,
    category: body.category
  });
  return res.json({ data: updatedRelease });
});

// Delete a release by id
router.delete('/:id', permission('admin', "client"), async (req, res) => {
  const { params: { id } } = req;
  const release = await sequelize.models.releases.findByPk(id);
  if (!release) {
    return res.status(404).json({ code: 404, message: 'Release not found' });
  }
  await release.destroy();
  return res.json();
});

module.exports = router;