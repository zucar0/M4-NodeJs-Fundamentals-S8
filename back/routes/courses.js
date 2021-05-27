const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all courses
router.get('/', permission('admin', 'client'), async (req, res) => {
  const courses = await sequelize.models.courses.findAndCountAll();
  return res.status(200).json({ data: courses });
});

// Create a new courses
router.post('/', permission('admin', "client"), async (req, res) => {
  const { body } = req;
  const course = await sequelize.models.courses.create({
    name: body.name,
    about: body.about,
    description: body.description,
    singlePrice: body.singlePrice,
    anualPrice: body.anualPrice,
    image: body.image,
    instructor: body.instructor,
    banner: body.banner,
    section1: body.section1,
    section1Videos: body.section1Videos,
    section1Lectures: body.section1Lectures,
    section1Time: body.section1Time,
    section2: body.section2,
    section2Videos: body.section2Videos,
    section2Lectures: body.section2Lectures,
    section2Time: body.section2Time,
    section3: body.section3,
    section3Videos: body.section3Videos,
    section3Lectures: body.section3Lectures,
    section3Time: body.section3Time,
    section4: body.section4,
    section4Videos: body.section4Videos,
    section4Lectures: body.section4Lectures,
    section4Time: body.section4Time,
    section5: body.section5,
    section5Videos: body.section5Videos,
    section5Lectures: body.section5Lectures,
    section5Time: body.section5Time,
    resource: body.resource,
    cta1: body.cta1,
    temary: body.temary,
    skills: body.skills,
    requirements: body.requirements,
    certificate: body.certificate,
    faqs: body.faqs,
    qualification: body.qualification,
    comments: body.comments
  });
  await course.save();
  return res.status(201).json({ data: course })
});

// Update a course by id
router.put('/:id', permission('admin', "client"), async (req, res) => {
  const { body, params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if (!course) {
    return res.status(404).json({ code: 404, message: 'Course not found' });
  }
  const updatedCourse = await course.update({
    name: body.name,
    about: body.about,
    description: body.description,
    singlePrice: body.singlePrice,
    anualPrice: body.anualPrice,
    image: body.image,
    instructor: body.instructor,
    banner: body.banner,
    section1: body.section1,
    section1Videos: body.section1Videos,
    section1Lectures: body.section1Lectures,
    section1Time: body.section1Time,
    section2: body.section2,
    section2Videos: body.section2Videos,
    section2Lectures: body.section2Lectures,
    section2Time: body.section2Time,
    section3: body.section3,
    section3Videos: body.section3Videos,
    section3Lectures: body.section3Lectures,
    section3Time: body.section3Time,
    section4: body.section4,
    section4Videos: body.section4Videos,
    section4Lectures: body.section4Lectures,
    section4Time: body.section4Time,
    section5: body.section5,
    section5Videos: body.section5Videos,
    section5Lectures: body.section5Lectures,
    section5Time: body.section5Time,
    resource: body.resource,
    cta1: body.cta1,
    temary: body.temary,
    skills: body.skills,
    requirements: body.requirements,
    certificate: body.certificate,
    faqs: body.faqs,
    qualification: body.qualification,
    comments: body.comments
  });
  return res.json({ data: updatedCourse });
});

// Delete a courses by id
router.delete('/:id', permission('admin', "client"), async (req, res) => {
  const { params: { id } } = req;
  const course = await sequelize.models.courses.findByPk(id);
  if (!course) {
    return res.status(404).json({ code: 404, message: 'Course not found' });
  }
  await course.destroy();
  return res.json();
});

module.exports = router;