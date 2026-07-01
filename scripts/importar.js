const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Partido = require('../models/Partido');

const importarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');

    const datos = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/data.json'), 'utf-8')
    );

    await Partido.insertMany(datos);
    console.log(`${datos.length} partidos importados correctamente`);

    process.exit(0);
  } catch (error) {
    console.error('Error al importar:', error.message);
    process.exit(1);
  }
};

importarDatos();