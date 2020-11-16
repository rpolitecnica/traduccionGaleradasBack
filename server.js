const express = require("express");
const bodyParser = require("body-parser");
const multipart=require('connect-multiparty');
var cors = require('cors')
var xmlbuilder = require('xmlbuilder');
var doc = xmlbuilder.create('root');
const fs = require('fs');


const app = express();
app.use(cors());

const multiPartMiddleware=multipart({
  uploadDir:'./subidas'
})

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post('/api/traducir',(req,res)=>{
  console.log("reqquestttttttttt------------------")
  let data = '';
  var jsonGalerada;
  
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    //console.log(JSON.parse(data)) // 'Buy the milk'
    jsonGalerada=JSON.parse(data);
    //console.log(data.TituloArticulo);
    console.log(jsonGalerada.ContenidoIntroduccion[0]);

    var xml = xmlbuilder.create('root', { version: '1.0', encoding: 'UTF-8' }, { sysID: 'https://jats.nlm.nih.gov/archiving/1.0/JATS-archivearticle1.dtd' })
    .att('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .att('xmlns:mml', 'http://www.w3.org/1998/Math/MathML')
    .att('dtd-version', '1.0')
    .att('article-type', 'rapid-communication')
    .att('xml:lang', 'es')
  .com('FRONT')
  .ele('front')//Inicio FRONT
    .ele('journal-meta')//Inicio Journal Meta
      .ele('journal-id', { 'journal-id-type': 'doi' }, '10.33571/rpolitec').up()
      .ele('journal-title-group')
        .ele('journal-title', 'Revista Politécnica').up()
        .ele('abbrev-journal-title', {'abbrev-type': 'publisher'}, 'Revista Politécnica').up()
      .up()
      .ele('issn', { 'pub-type': 'ppub' }, '1900-2351').up()
      .ele('issn', { 'pub-type': 'epub' }, '2256-5353').up()
      .ele('publisher')
        .ele('publisher-name', 'Politécnico Colombiano Jaime Isaza Cadavid').up()
      .up()
    .up()//Fin Journal Meta
    .ele('article-meta')//Inicio Article Meta
      .ele('article-id', { 'pub-id-type': 'doi' },'s').up()
      .ele('article-categories')
        .ele('subj-group', { 'subj-group-type': 'contenido' })
          .ele('subject', 'Artículo').up()
        .up()
      .up()
      .ele('title-group')
        .ele('article-title', {'xml:lang': 'es'}, jsonGalerada.TituloArticulo).up()
      .up()
      .com('AUTORES')
      .ele('contrib-group')
        .ele('s').up()//Imprime todos los autores
      .up()
      .com('AFILIACIONES')
  .ele('aff', {'id': 'aff1'})
    .ele('label', '1').up()
  .up()
      .ele('author-notes')
        .ele('corresp')
          .ele('label', 'Correspondencia | Correspondence').up()
          .ele('email', 's').up()
        .up()
      .up()
      .ele('pub-date', { 'pub-type': 'epub-ppub' })
        .ele('month', 's').up()
        .ele('year', 's').up()
      .up()
      .ele('volume', 's').up()
      .ele('issue', 's').up()
      .ele('fpage', 's').up()
      .ele('lpage', 's').up()
      .ele('history')
        .ele('date', { 'date-type': 'received' })
          .ele('day', 's').up()
          .ele('month', 's').up()
          .ele('year', 's').up()
        .up()
        .ele('date', { 'date-type': 'accepted' })
          .ele('day', 's').up()
          .ele('month', 's').up()
          .ele('year', 's').up()
        .up()
      .up()
      .ele('abstract', { 'xml:lang': 'es' })
        .ele('p', 's').up()
      .up()
      .ele('kwd-group', { 'xml:lang': 'es' })
        .ele('s').up()//Imprime todas las palabras claves
      .up()
      .ele('counts')
        .ele('fig-count', {'count': '5'}).up()
        .ele('ref-count', {'count': 's'}).up()
        .ele('page-count', {'count': ('s').toString()}).up()
      .up()
    .up()//Fin Article Meta
  .up()//FIN FRONT
  .com('BODY')
  .ele('body')//Inicio BODY
    .ele('sec')
      .ele('tittle', jsonGalerada.TituloIntroduccion).up()
      .ele('p', jsonGalerada.ContenidoIntroduccion[0]).up()
    .up()  
    .ele('sec')
      .ele('tittle', '2.	MATERIALES Y METODO').up()
      .ele('subtitle', '2.1.	Caracterización de los materiales').up()
      .ele('p', 'Para la preparación de las mezclas se utilizó cemento portland de uso general con una densidad espe-cifica de 3150 Kg/m3 y agua del acueducto. La caracterización de los materiales pétreos se realizó de acuerdo a').up()
      .ele('subtitle', '2.2.	Diseño de la mezcla').up()
      .ele('p', 'La mezcla de concreto tradicional se diseñó para alcanzar una resistencia a la compresión de 21 MPa (a los 28 días), tal como la describe la metodología ACI 211.18 (American Concrete Institute) [22]. Se d').up()
      .ele('subtitle', '2.6.	Evaluación de las propiedades físicas y mecánicas de los concretos elaborados').up()
      .ele('p', 'La resistencia a compresión f’c se realizó ').up()
   .up() 
    .ele('sec')
    .ele('tittle', '3.	RESULTADOS Y ANALISIS').up()
    .ele('p', 'Los resultados de la caracterización de los agregados de muestran en la tabla 1').up()
  .up()//Fin BODY
  .com('BACK')
  .ele('back')//Inicio BACK
    .ele('ack')
      .ele('title', 'AGRADECIMIENTOS').up()
      .ele('p', 's').up()
    .up()
    .com('REFERENCIAS')
    .ele('ref-list')
      .ele('title', 'REFERENCIAS').up()
      .ele('s').up()
    .up()
  .up()//Fin BACK
  .com('EN INGLES')
  .ele('sub-article')
    .att('article-type', 'translation')
    .att('id', 'TRen')
    .att('xml:lang', 'en')
    .ele('front-stub')
      .ele('article-categories')
        .ele('subj-group', {'subj-group-type': 'content'})
    .ele('subject', 'Paper').up()
    .up()
      .up()
      .ele('title-group')
        .ele('article-title', {'xml:lang': 'en'}, 's').up()
      .up()
      .ele('abstract', { 'xml:lang': 'en' })
        .ele('p', 's').up()
      .up()
      .ele('kwd-group', { 'xml:lang': 'en' })
        .ele('s').up()//Imprime todas las keywords
      .up()
    .up()
    .ele('body')
      .ele('p', 'Not in english').up()
    .up()
    .ele('back')
    .up()
  .up()
  .end({ pretty: true });
  
      const xmldoc = xml.toString({ pretty: true });
  
      fs.writeFileSync('./subidas/prueba'+'articleId'+1+'.xml', xmldoc, function (err) { //
        if (err) { return console.log(err); }
      });
    res.json({
      'message':'Fichero subido'
    });
  })

  
 
  console.log("traducir");
})

app.post('/api/subir',multiPartMiddleware,(req,res)=>{
  console.log(req);
  res.json({
    'message':'Fichero subido'
  });
})

require("./app/routes/usuario.routes.js")(app);
require("./app/routes/edicion.routes.js")(app);
require("./app/routes/periodo.routes.js")(app);
require("./app/routes/correo.routes.js")(app);
// set port, listen for requests

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

