import slugify from 'slugify';
import { Course } from '../models/index.js';

// obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          association: 'instructor',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: 'error al obtenes los cursos',
      error: error?.message ?? error,
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const instructorId = req.userId;
    const courses = await Course.findAll({
      where: { fk_instructor_id: instructorId },
      include: [
        {
          association: 'instructor',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener tus cursos',
      message: error?.message ?? error,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          association: 'instructor',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found!' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: 'error al obtener el curso',
      error: error?.message ?? error,
    });
  }
};

export const createCourse = async (req, res) => {
  const {
    title,
    slug,
    description,
    shortDescription,
    thumbnailUrl,
    videoUrl,
    topics,
    isFree = true,
    price = 0,
    currency = 'ARS',
    status = 'draft',
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const courseSlug =
      slug?.trim() ||
      `${slugify(title, { lower: true, strict: true })}-${Date.now()}`;

    const newCourse = await Course.create({
      title,
      slug: courseSlug,
      description,
      shortDescription,
      thumbnailUrl,
      videoUrl,
      topics: Array.isArray(topics)
        ? topics
        : typeof topics === 'string'
          ? topics
              .split(',')
              .map((topic) => topic.trim())
              .filter(Boolean)
          : [],
      isFree,
      price: isFree ? 0 : price,
      currency,
      status,
      publishedAt: status === 'published' ? new Date() : null,
      fk_instructor_id: req.userId,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: 'El slug ya existe, elige otro título o slug' });
    }
    res.status(500).json({
      error: 'Error al crear el curso',
      message: error?.message ?? error,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    shortDescription,
    thumbnailUrl,
    videoUrl,
    topics,
    isFree = true,
    price = 0,
    currency = 'ARS',
    status = 'draft',
  } = req.body;

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (course.fk_instructor_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'No tienes permiso para editar este curso' });
    }

    await course.update({
      title: title || course.title,
      description: description || course.description,
      shortDescription: shortDescription || course.shortDescription,
      thumbnailUrl:
        thumbnailUrl !== undefined ? thumbnailUrl : course.thumbnailUrl,
      videoUrl: videoUrl !== undefined ? videoUrl : course.videoUrl,
      topics: topics
        ? Array.isArray(topics)
          ? topics
          : typeof topics === 'string'
            ? topics
                .split(',')
                .map((topic) => topic.trim())
                .filter(Boolean)
            : course.topics
        : course.topics,
      isFree: isFree !== undefined ? isFree : course.isFree,
      price: isFree ? 0 : price || course.price,
      currency: currency || course.currency,
      status: status || course.status,
      publishedAt:
        status === 'published' && !course.publishedAt
          ? new Date()
          : course.publishedAt,
    });

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: 'El slug ya existe, elige otro título o slug' });
    }
    res.status(500).json({
      error: 'Error al actualizar el curso',
      message: error?.message ?? error,
    });
  }
};

export const deleteCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (course.fk_instructor_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'No tienes permiso para eliminar este curso' });
    }

    await course.destroy();
    res.status(200).json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al eliminar el curso',
      message: error?.message ?? error,
    });
  }
};

export const getCourseBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const course = await Course.findOne({
      where: { slug },
      include: [
        {
          association: 'instructor',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found!' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error al obtener el curso por slug',
      error: error?.message ?? error,
    });
  }
};
