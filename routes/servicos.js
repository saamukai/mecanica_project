const express = require('express');
const router = express.Router();
const Servico = require('../models/Servico');

// detalhe dos servicos -> view/1, view/2
router.get('/view/:id', (req, res) => Servico.findOne({
  where: { id: req.params.id }
}).then(servico => {

  res.render('view', {
    servico
  });

}).catch(err => console.log(err)));


// form da rota de envio
router.get('/add', (req, res) => {
  res.render('add');
})

// add servico via post
router.post('/add', (req, res) => {

  let { carro, valor, cliente, descricao, contato, novo_servico } = req.body;

  // insert
  Servico.create({
    carro,
    valor,
    cliente,
    descricao,
    contato,
    novo_servico
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));

});

router.delete('/servicos/:id', (req, res) => {
  let id = req.params.id;

  Servico.destroy({
    where: { id: id }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router
