var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

// para listar las novedades
router.get('/', async function (req, res, next){

    var novedades = await novedadesModel.getCalificaciones();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
}); // cierra inicial

// para eliminar las novedades
router.get('/eliminar/:id', async (req, res, next)=>{
    var id = req.params.id;
    await novedadesModel.deleteCalificacionById(id);
    res.redirect('/admin/novedades');
}); //cierra get de eliminar

module.exports = router;