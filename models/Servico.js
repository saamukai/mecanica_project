const Sequelize = require('sequelize');
const db = require('../db/connection');

const Servico = db.define('servico', {
  carro: {
    type: Sequelize.STRING,
  },
  descricao: {
    type: Sequelize.STRING,
  },
  valor: {
    type: Sequelize.STRING,
  },
  cliente: {
    type: Sequelize.STRING,
  },
  contato: {
    type: Sequelize.STRING,
 },
  novo_servico: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Servico
