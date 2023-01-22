const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Servico = require('./models/Servico');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
  .authenticate()
  .then(() => {
    console.log("banco on fi");
  })
  .catch(err => {
    console.log("erro babaca", err);
  });

// routes
app.get('/', (req, res) => {

  let search = req.query.servico;
  let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Servico.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(servicos => {

      res.render('index', {
        servicos
      });

    })
    .catch(err => console.log(err));
  } else {
    Servico.findAll({
      where: {carro: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(servicos => {
      console.log(search);
      console.log(search);

      res.render('index', {
        servicos, search
      });

    })
    .catch(err => console.log(err));
  }


});

// rotas servicos
app.use('/servicos', require('./routes/servicos'));
