const DoLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await createSpendModel(email, password);
    res.status(201).json({ message: 'Gasto creado', spendId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

export { DoLoginController };
