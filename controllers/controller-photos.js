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
        limitBy = 20
        limitPage = (request.page-1) * limitBy
        const sqlPagination = `SELECT count(*) as numRows FROM photos WHERE albumId = ${request.albumId}`
        pool.query(sqlPagination, (err,resultPagination) => {
            if (err) throw err
            const sql = `SELECT * FROM photos WHERE albumId = ${request.albumId} LIMIT ${limitPage},20`
            const totalPage = Math.round(resultPagination[0].numRows/limitBy)
            pool.query(sql,(err,result) =>{
                if (err) throw err
                res.send({
                    page:parseInt(request.page),
                    totalPage:totalPage,
                    data:result
                })
            })
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
        const sql = `INSERT INTO photos
        (albumId,
        title,
        url,
        thumbnailUrl)
        values(
            '${request.albumId}',
            '${request.title}',
            '${request.url}',
            '${request.thumbnailUrl}')`
        pool.query(sql,(err,result) =>{
                        if (err) throw err
                        res.send(result)
                    })
    },
    editDataPhotos(req,res){
        const request = req.body
        for (const [key,value] of Object.entries(request)){
            if( key !== 'id') {
                const sql = `UPDATE photos
                    SET ${key} = '${value}'
                    WHERE id = ${request.id}`
                pool.query(sql,(err,result) => {
                        if(err) throw err
                        console.log(result)
                    })
            }
        }
        res.send(request)

    },
    deleteDataPhotos(req,res){
        const request = req.body
        const sql = `DELETE FROM
                photos
            WHERE id = ${request.id}`
        pool.query(sql,(err,result) => {
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