export const errorHandler = (err, res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
};