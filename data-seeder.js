const { response } = require('express');
const fetch = require("node-fetch");
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

con.connect((err) => {
    if(err) throw err
})

con.query(`CREATE TABLE IF NOT EXISTS bumi_ai.photos  (
    albumId int(0) NULL,
    id int(0) NOT NULL AUTO_INCREMENT,
    title varchar(255) NULL,
    url varchar(255) NULL,
    thumbnailUrl varchar(255) NULL,
    PRIMARY KEY (id),
    INDEX albumId(albumId),
    INDEX id(id))`,(err,result) =>{
    if(err) throw err
})

con.query(`TRUNCATE TABLE photos`,(err,result) =>{
    if(err) throw err
})

fetch(`https://jsonplaceholder.typicode.com/photos`)
    .then(response => response.json())
    .then(data=>{
        for(const value of data){
            // console.log(value.albumId)
            con.query(`INSERT INTO photos
                (albumId,
                id,
                title,
                url,
                thumbnailUrl)
                values(
                    '${value.albumId}',
                    '${value.id}',
                    '${value.title}',
                    '${value.url}',
                    '${value.thumbnailUrl}')`,(err,result) =>{
                if(err) throw err

                let percentage = Math.round((value.id/5000)*10000)/100
                process.stdout.write(`Inserting data ${percentage} %\r`);

                if(percentage == 100){
                    console.log(`Completed ${percentage}%`)
                    process.exit()
                }
            })
        }
})