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

// hbs para agregar las novedades
router.get('/agregar', (req, res, next)=>{
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
}); // cierra get agregar

// Para insertar novedad en la tabla
router.post('/agregar', async (req, res, next)=>{
    try{
        if(req.body.calificacion != "" && req.body.titulo != "" && req.body.comentario != ""){
            await novedadesModel.insertCalificacion(req.body);
            res.redirect('/admin/novedades')
        } else{
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch(error){
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el comentario'
        })
    }
})

// Listar una sola novedad/comentario por id (para modificar)
router.get('/modificar/:id', async (req, res, next)=>{
    var id = req.params.id;
    var novedad = await novedadesModel.getCalificacionById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })
})

// Modificar la novedad/comentario
router.post('/modificar', async (req, res, next)=>{
    try{
        var obj = {
            calificacion: req.body.calificacion,
            titulo: req.body.titulo,
            comentario: req.body.comentario
        }

        await novedadesModel.modificarCalificacionById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch(error){
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico el comentario'
        })
    }
})

module.exports = router;