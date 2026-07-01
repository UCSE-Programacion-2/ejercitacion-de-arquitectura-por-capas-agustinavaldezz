const mongoose = require('mongoose');
require('dotenv').config();

const dns = require('dns');

dns.setServers(['8.8.8.8']);

const conectarDB = async () => {
  console.log('URI:', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;