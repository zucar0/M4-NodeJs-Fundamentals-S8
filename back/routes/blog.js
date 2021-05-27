const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all blog
router.get('/', permission('admin', 'client'), async (req, res) => {
  const blog = await sequelize.models.blog.findAndCountAll();
  return res.status(200).json({ data: blog });
});

// Create a new post
router.post('/', permission('admin', "client"), async (req, res) => {
  const { body } = req;
  const post = await sequelize.models.blog.create({
    title: body.title,
    mainImage: body.mainImage,
    author: body.author,
    review: body.review,
    intro: body.intro,
    content: body.content,
    contentImage: body.contentImage,
    close: body.close,
    keywords: body.keywords,
    SEOTitle: body.SEOTitle,
    metadescription: body.metadescription,
    internalLink1: body.internalLink1,
    internalLink2: body.internalLink2,
    internalLink3: body.internalLink3,
    category: body.category,
    tags: body.tags
  });
  await post.save();
  return res.status(201).json({ data: post })
});

// Update a post by id
router.put('/:id', permission('admin', "client"), async (req, res) => {
  const { body, params: { id } } = req;
  const post = await sequelize.models.blog.findByPk(id);
  if (!post) {
    return res.status(404).json({ code: 404, message: 'Post not found' });
  }
  const updatedPost = await post.update({
    title: body.title,
    mainImage: body.mainImage,
    author: body.author,
    review: body.review,
    intro: body.intro,
    content: body.content,
    contentImage: body.contentImage,
    close: body.close,
    keywords: body.keywords,
    SEOTitle: body.SEOTitle,
    metadescription: body.metadescription,
    internalLink1: body.internalLink1,
    internalLink2: body.internalLink2,
    internalLink3: body.internalLink3,
    category: body.category,
    tags: body.tags
  });
  return res.json({ data: updatedPost });
});

// Delete a service by id
router.delete('/:id', permission('admin', "client"), async (req, res) => {
  const { params: { id } } = req;
  const post = await sequelize.models.blog.findByPk(id);
  if (!post) {
    return res.status(404).json({ code: 404, message: 'Post not found' });
  }
  await post.destroy();
  return res.json();
});

module.exports = router;