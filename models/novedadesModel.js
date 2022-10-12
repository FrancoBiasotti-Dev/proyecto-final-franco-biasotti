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

module.exports = {getCalificaciones, deleteCalificacionById}