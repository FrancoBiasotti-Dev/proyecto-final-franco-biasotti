var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer'); // Necesita de la dependencia nodemailer

var contactoModel = require('../models/contactoModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto');
});

/* POST Envio de mensaje/mail */
router.post('/', async (req, res, next) =>{
  // console.log(req.body)  Para chequear que llegue la data

  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var passengers = req.body.passengers;
  var message = req.body.message;

  var obj = {
    to: 'francobiasottidev@gmail.com',
    subject: 'Contacto desde la web',
    html: `${name} se contacto a traves de la web y quiere mas info a este correo: "${email}". <br> Ademas hizo el siguiente comentario: "${message}". <br> Es una consulta por ${passengers} pasajeros. <br> Su telefono es: ${phone}.`
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  // transporter crea el transporte de la info, y en vez de poner los datos dados por mailtrap directo, se los conecta con el archivo .env para mas simplicidad

  var info = await transporter.sendMail(obj); // Funcion que manda el mail/mensaje

  var contacto = await contactoModel.insertContacto(req.body); // Se guarda en base de datos

  res.render('contacto',{
    message: 'Mensaje enviado correctamente.'
  }) // Funcion que muestra al usuario que el mensaje fue enviado correctamente


})

module.exports = router;