const mysql = require('mysql')
const dotenv = require('dotenv')


dotenv.config({path:__dirname+'/../.env'})

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


pool.connect((err) => {
    if(err) throw err
})

module.exports = {
    getDataPhotos(req,res){
        const request = req.params
        limit_page = (request.page-1) * 20
        const sql = `SELECT * FROM photos WHERE albumId = '${request.albumId}' LIMIT ${limit_page},20`
        pool.query(sql,(err,result) =>{
            if (err) throw err
            res.send(result)
        })
    },
    getDataPhotosByID(req,res){
        const request = req.params
        const sql = `SELECT * FROM photos WHERE id = '${request.id}'`
        pool.query(sql,(err,result) =>{
            if (err) throw err
            res.send(result)
        })
    },
    addDataPhotos(req,res){
        const request = req.body
        pool.query(`INSERT INTO photos
                (albumId,
                title,
                url,
                thumbnailUrl)
                values(
                    '${request.albumId}',
                    '${request.title}',
                    '${request.url}',
                    '${request.thumbnailUrl}')`,(err,result) =>{
                        if (err) throw err
                        res.send(result)
                    })
    },
    editDataPhotos(req,res){
        const request = req.body
        // pool.query(`UPDATE photos SET
        //                 albumId = '${request.id}',
        //                 title = '${request.title}',
        //                 url = '${request.url}',
        //                 thumbnailUrl = '${request.thumbnailUrl}'
        //             WHERE id = ${request.id}`,(err,result) =>{
        //                     if (err) throw err
        //                     res.send(result)
        //                 })
        for (const [key,value] of Object.entries(request)){
            if( key !== 'id') {
                pool.query(`UPDATE photos
                    SET ${key} = '${value}'
                    WHERE id = ${request.id}`,(err,result) => {
                        if(err) throw err
                        console.log(result)
                    })
            }
        }
        res.send(request)

    },
    deleteDataPhotos(req,res){
        const request = req.body
        pool.query(`DELETE FROM
                        photos
                    WHERE id = ${request.id}`,(err,result) => {
                        if (err) throw err;
                        res.send(result)
                    })
    },
    getAlbumList(req,res){
        const request = req.params
        limit_page = (request.page-1) * 20
        const sql = `SELECT DISTINCT albumId FROM photos`
        pool.query(sql,(err,result) =>{
            if (err) throw err
            res.send(result)
        })
    },
}