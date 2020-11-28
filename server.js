const express = require("express");
const bodyParser = require("body-parser");
const multipart=require('connect-multiparty');
var cors = require('cors')
var xmlbuilder = require('xmlbuilder');
var doc = xmlbuilder.create('root');
const fs = require('fs');

const PORT= process.env.PORT || 3000
const sql = require("./app/models/db.js");
const Traduccion = require("./app/models/traducciones.model.js");


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
  let data = '';
  var jsonGalerada;
  
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    //console.log(JSON.parse(data)) // 'Buy the milk'
    jsonGalerada=JSON.parse(data);
    //console.log(data.TituloArticulo);
    
    var todosAutoresArray=[];
    var todosAutores=jsonGalerada.Autores.split(",")
    console.log(todosAutores);
    var contadorAutores=0;
    for(var i=0;i<todosAutores.length;i++){
      
      
        console.log(todosAutores[i]);
        var nombreSinEspacios=todosAutores[i].trim();
        nombreSinEspacios=nombreSinEspacios.replace("\n","")
        var nombreCompleto=nombreSinEspacios.split(" ");
        var surNames="";
        var givenNames="";
        if(nombreCompleto.length=="2"){
          surNames=nombreCompleto[1]
          givenNames=nombreCompleto[0];
        }else  if(nombreCompleto.length=="3"){
           surNames=nombreCompleto[1]+" "+nombreCompleto[2];
           givenNames=nombreCompleto[0];

          
        }else if(nombreCompleto.length=="4"){
          surNames=nombreCompleto[2]+" "+nombreCompleto[3];
          givenNames=nombreCompleto[0]+" "+nombreCompleto[1];
        }

        surNames=surNames.replace(i+1,"");

        todosAutoresArray[contadorAutores] = {
          'contrib': {
            '@contrib-type': 'author',
            'name': {
              'surname': surNames,
              'given-names': givenNames
            },
            'xref': {
              '@ref-type': 'aff',
              '@rid': 'aff1',
              'sup': i+1
            }
          }
        }
        contadorAutores++;
    
    }
    

    var todosContenido=[];
    for(var j=0;j<jsonGalerada.ContenidoIntroduccion.length;j++){
      todosContenido[j] = {
        'p': jsonGalerada.ContenidoIntroduccion[j]
      }
    }

    

    var todosContenido=[];
    for(var j=0;j<jsonGalerada.ContenidoIntroduccion.length;j++){
      todosContenido[j] = {
        'p': jsonGalerada.ContenidoIntroduccion[j]
      }
    }


    var todosContenidoConclusiones=[];
    for(var j=0;j<jsonGalerada.ContenidoConclusiones.length;j++){
      todosContenidoConclusiones[j] = {
        'p': jsonGalerada.ContenidoConclusiones[j]
      }
    }

    var arrayTituloCorrespondencia=jsonGalerada.TituloCorrespondencia.split(":");
    var arrayCorreosCorrespondencia=arrayTituloCorrespondencia[1].split(",");
    var todosTituloCorrespondencia=[];
    for(var j=0;j<arrayCorreosCorrespondencia.length;j++){
      console.log(arrayCorreosCorrespondencia[j]);
      todosTituloCorrespondencia[j] = {
        'email': arrayCorreosCorrespondencia[j]
      }
    }

    var todasAfiliaciones=[];
    for(var j=0;j<jsonGalerada.InformacionAutores.length;j++){
      var sinNumero=jsonGalerada.InformacionAutores[j].replace((j+1),"");
      todasAfiliaciones[j] = {
        'aff':{
          '@id': 'aff'+(j+1),
          '#text': sinNumero,
          
        } 
      }
    }



    var todasReferencias=[];
    for(var j=0;j<jsonGalerada.referencias.length;j++){
      var arrayRef=jsonGalerada.referencias[j].split(" ");
      var textoReferencia=jsonGalerada.referencias[j].replace( arrayRef[0],"");
      todasReferencias[j] = {
        'ref': {
        '@id': 'R'+(j+1),
        'label': arrayRef[0],
        'mixed-citation': textoReferencia//match(/(.*)([^;][^\r])/)[0] OR match(/(.*)([^\r])/)[0]
        }
      }
    }
    var palabrasClavesCar=jsonGalerada.PalabrasClavesCar.split(";")
    var todasPalabrasClaves=[];
    for(var p=0;p<palabrasClavesCar.length;p++){
      todasPalabrasClaves[p]={
        'kwd':palabrasClavesCar[p]
      }
    }

    var palabrasClavesCarEN=jsonGalerada.KeywordsCar.split(";")
    var todasPalabrasClavesEN=[];
    for(var p=0;p<palabrasClavesCarEN.length;p++){
      todasPalabrasClavesEN[p]={
        'kwd':palabrasClavesCarEN[p]
      }
    }

    


    var todosCuerpoDocumento=[];
    var bodyDocumentoCuerpoComplento=[];
    for(var i=0;i<jsonGalerada.BodyCuerpoCompleto.length;i++){


      todosCuerpoDocumento.push({'tittle':jsonGalerada.BodyCuerpoCompleto[i].titulo});

      for(var z=0;z<jsonGalerada.BodyCuerpoCompleto[i].ContenidoCuerpo.length;z++){
        todosCuerpoDocumento.push({'subtittle':jsonGalerada.BodyCuerpoCompleto[i].ContenidoCuerpo[z].SubtituloSeccion});
         

        for(var k=0;k<jsonGalerada.BodyCuerpoCompleto[i].ContenidoCuerpo[z].ContenidoSeccion.length;k++){
          todosCuerpoDocumento.push({'p':jsonGalerada.BodyCuerpoCompleto[i].ContenidoCuerpo[z].ContenidoSeccion[k]});
        }
      }
      bodyDocumentoCuerpoComplento.push({'sec':todosCuerpoDocumento});
    }

    var DOI=jsonGalerada.DOI.replace("\n","")
    var arrayDoi=DOI.split(":");
    console.log(arrayDoi);
    var textoDoiArticleId=arrayDoi[1];  
    var textoDoiJourlnalId=arrayDoi[1].split("/");
    var arrayTextoFinalJournal=textoDoiJourlnalId[1].split(".");
    var textoFinalJournalId=textoDoiJourlnalId[0]+"/"+arrayTextoFinalJournal[0];

    /*var textoDoiArticleId="dsadsa";
    var textoFinalJournalId="dsadsa";*/



    var fechasRecibidoAceptado=jsonGalerada.FechasEsp.split(".");
    var fechasRecibidoArray=fechasRecibidoAceptado[0].split(":");
    var fechasAceptadoArray=fechasRecibidoAceptado[1].split(":");;


    var dateHash = {
      Enero : 1,
      Febrero: 2,
      Marzo: 3,
      Abril: 4,
      Mayo: 5,
      Junio: 6,
      Julio: 7,
      Agosto: 8,
      Septiembre: 9,
      Octubre: 10,
      Noviembre: 11,
      Diciembre: 12
     };


     var fechaSeparada=fechasRecibidoArray[1].split("de");

     var mesNumberoRecibido=dateHash[fechaSeparada[1].trim()];
     var diaNumeroRecibido=fechaSeparada[0].trim();
     var anioNumerRoecibido=fechaSeparada[2].trim();
     //console.log(mesNumbero);

     var fechaAceptadoSeparada =fechasAceptadoArray[1].split("de");
     var mesNumberoAceptado=dateHash[fechaAceptadoSeparada[1].trim()];
     var diaNumeroAceptado=fechaAceptadoSeparada[0].trim();
     var anioNumeroAceptado=fechaAceptadoSeparada[2].trim();


     var fechaPublicacion=jsonGalerada.InformacionEdicion.fechaPublicacion.split("-");
     var mesPublicacion=fechaPublicacion[1];
     var anioPublicacion=fechaPublicacion[0];
     console.log(jsonGalerada.TituloConclusiones);




     
       console.log("dif null")
      var xml = xmlbuilder.create('article', { version: '1.0', encoding: 'UTF-8' }, { sysID: 'https://jats.nlm.nih.gov/archiving/1.0/JATS-archivearticle1.dtd' })
      .att('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .att('xmlns:mml', 'http://www.w3.org/1998/Math/MathML')
      .att('dtd-version', '1.0')
      .att('article-type', 'rapid-communication')
      .att('xml:lang', 'es')
    .com('FRONT')
    .ele('front')//Inicio FRONT
      .ele('journal-meta')//Inicio Journal Meta
        .ele('journal-id', { 'journal-id-type': 'doi' }, textoFinalJournalId).up()
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
        .ele('article-id', { 'pub-id-type': 'doi' },textoDoiArticleId).up()
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
          .ele(todosAutoresArray).up()//Imprime todos los autores
        .up()
        .com('AFILIACIONES')
    .ele(todasAfiliaciones)
        .ele('author-notes')
          .ele('corresp')
            .ele('label', 'Correo de correspondencia:').up()
            .ele(todosTituloCorrespondencia).up()
          .up()
        .up()
        .ele('abstract', { 'xml:lang': 'es' })
          .ele('sec')
          .ele('tittle', 'RESUMEN').up()
          .ele('p', jsonGalerada.ResumenCuerpo).up()
          .up()
        .up()
        .ele('kwd-group', { 'xml:lang': 'es' })
          .ele(todasPalabrasClaves).up()//Imprime todas las palabras claves
        .up()
        .ele('pub-date', { 'pub-type': 'epub-ppub' })
          .ele('month', mesPublicacion).up()
          .ele('year', anioPublicacion).up()
        .up()
        .ele('volume', jsonGalerada.InformacionEdicion.volumen).up()
        .ele('issue', jsonGalerada.InformacionEdicion.numero).up()
        .ele('history')
          .ele('date', { 'date-type': 'received' })
            .ele('day', diaNumeroRecibido).up()
            .ele('month', mesNumberoRecibido).up()
            .ele('year', anioNumerRoecibido).up()
          .up()
          .ele('date', { 'date-type': 'accepted' })
            .ele('day', diaNumeroAceptado).up()
            .ele('month', mesNumberoAceptado).up()
            .ele('year', anioNumeroAceptado).up()
          .up()
        .up()
        .ele('abstract', { 'xml:lang': 'en' })
          .ele('sec')
          .ele('tittle', 'ABSTRACT').up()
          .ele('p', jsonGalerada.Abstract).up()
          .up()
        .up()
        .ele('kwd-group', { 'xml:lang': 'en' })
          .ele(todasPalabrasClavesEN).up()//Imprime todas las palabras claves
        .up()
      .up()//Fin Article Meta
    .up()//FIN FRONT
    .com('BODY')
    .ele('body')//Inicio BODY
      .ele('sec')
        .ele('tittle', jsonGalerada.TituloIntroduccion).up()
        .ele(todosContenido).up()
      .up()  
      .ele('sec')
        .ele(todosCuerpoDocumento).up()
     .up()
     .ele('sec', { 'sec-type': 'conclusions' })
     .ele('title', jsonGalerada.TituloConclusiones).up()
      .ele(todosContenidoConclusiones).up()
     .up()
    .up()//Fin BODY
    .com('BACK')
    .ele('back')//Inicio BACK
      .ele('ack')
        .ele('title', jsonGalerada.TituloAgradecimientos).up()
        .ele('p', jsonGalerada.ContenidoAgradecimientos).up()
      .up()
      .com('REFERENCIAS')
      .ele('ref-list')
        .ele('title', 'REFERENCIAS').up()
        .ele(todasReferencias).up()
      .up()
    .up()//Fin BACK  
    .end({ pretty: true });
     
     


   
  
      const xmldoc = xml.toString({ pretty: true });

      const traduccion = new Traduccion({
        idEdicion: jsonGalerada.InformacionEdicion.idEdicion,
        tituloArticulo: jsonGalerada.TituloArticulo,
        fechaTraduccion: new Date(),
        xmlTraduccion: xmldoc
      });

      sql.query("INSERT INTO traducciones SET ?", traduccion, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        //console.log("created customer: ", { id: res.insertId, ...traduccion });
       // result(null, { id: res.insertId, ...traduccion });
      });
  
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
require("./app/routes/traducciones.routes.js")(app);
// set port, listen for requests

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.setHeader('Access-Control-Allow-Origin', 'https://traducciongaleradas.herokuapp.com');
    
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
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT);
});

