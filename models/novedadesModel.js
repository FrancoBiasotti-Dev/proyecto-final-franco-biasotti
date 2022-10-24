var pool = require('./bd');

// Listar novedades/comentarios...
async function getCalificaciones(){
    var query = 'select * from calificaciones';
    var rows = await pool.query(query);
    return rows;
}

// Borrar novedades/comentarios...
async function deleteCalificacionById(id){
    var query = 'delete from calificaciones where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

// Insertar novedades/comentarios...
async function insertCalificacion(obj){
    try{
        var query = "insert into calificaciones set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}

// Listar novedad/comentario por id...
async function getCalificacionById(id){
    var query = 'select * from calificaciones where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

// Modificar novedad/comentario...
async function modificarCalificacionById(obj, id){
    try{
        var query = 'update calificaciones set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error){
        throw error;
    }
}

module.exports = {getCalificaciones, deleteCalificacionById, insertCalificacion, getCalificacionById, modificarCalificacionById}