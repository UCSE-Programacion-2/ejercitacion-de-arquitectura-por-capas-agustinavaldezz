const Partido = require('../models/Partido');

// GET /partidos
const getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find().limit(20);
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener partidos', error });
  }
};

// GET /partidos/:id
const getPartidoById = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id);
    if (!partido) return res.status(404).json({ mensaje: 'Partido no encontrado' });
    res.json(partido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el partido', error });
  }
};

// POST /partidos
const crearPartido = async (req, res) => {
  try {
    const nuevo = new Partido(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear partido', error });
  }
};

// PUT /partidos/:id
const actualizarPartido = async (req, res) => {
  try {
    const actualizado = await Partido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Partido no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar partido', error });
  }
};

// DELETE /partidos/:id
const eliminarPartido = async (req, res) => {
  try {
    const eliminado = await Partido.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Partido no encontrado' });
    res.json({ mensaje: 'Partido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar partido', error });
  }
};

// GET /partidos/torneo/:torneo
const getPartidosByTorneo = async (req, res) => {
  try {
    const partidos = await Partido.find({ tournament: req.params.torneo });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar por torneo', error });
  }
};

// GET /partidos/equipo/:equipo
const getPartidosByEquipo = async (req, res) => {
  try {
    const partidos = await Partido.find({
      $or: [{ home_team: req.params.equipo }, { away_team: req.params.equipo }]
    });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar por equipo', error });
  }
};

// GET /partidos/fecha/:fechaInicio-:fechaFin
const getPartidosByFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;
    const partidos = await Partido.find({
      date: { $gte: fechaInicio, $lte: fechaFin }
    });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar por fecha', error });
  }
};

module.exports = {
  getPartidos,
  getPartidoById,
  crearPartido,
  actualizarPartido,
  eliminarPartido,
  getPartidosByTorneo,
  getPartidosByEquipo,
  getPartidosByFecha
};