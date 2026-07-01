const express = require('express');
const router = express.Router();
const {
  getPartidos,
  getPartidoById,
  crearPartido,
  actualizarPartido,
  eliminarPartido,
  getPartidosByTorneo,
  getPartidosByEquipo,
  getPartidosByFecha
} = require('../controllers/partidoController');

router.get('/torneo/:torneo', getPartidosByTorneo);
router.get('/equipo/:equipo', getPartidosByEquipo);
router.get('/fecha/:fechaInicio-:fechaFin', getPartidosByFecha);
router.get('/', getPartidos);
router.get('/:id', getPartidoById);
router.post('/', crearPartido);
router.put('/:id', actualizarPartido);
router.delete('/:id', eliminarPartido);

module.exports = router;