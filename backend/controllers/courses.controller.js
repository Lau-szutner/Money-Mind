import { Course } from '../models/index.js';

//obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(
      {
        message: 'error al obtenes los cursos',
      },
      error
    );
  }
};

// obtenes cursos solo por id

export const getCourseById = async (req, res) => {
  try {
    const courses = await Course.findByPk(req.params.id);

    if (courses === null) {
      console.log('Courses not found!');
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(
      {
        message: 'error al obtener el cursos',
      },
      error
    );
  }
};
