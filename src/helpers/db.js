import mysqlCon from 'mysql';
import dotenv from 'dotenv';
import util from 'util';

dotenv.config({ path: `${__dirname}/../.env` });

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const pool = () => mysqlCon.createPool(config);

const mysql = pool();

const makeDB = (configDB) => {
  const connection = mysqlCon.createPool(configDB);

  return {
    query(sql, args) {
      // eslint-disable-next-line prefer-reflect
      return util.promisify(connection.query)
        .call(connection, sql, args)
        .catch((err) => err);
    },
    close() {
      // eslint-disable-next-line prefer-reflect
      return util.promisify(connection.end).call(connection);
    },
  };
};

const mysqlProm = makeDB(config);

export {
  pool,
  mysqlProm,
  mysql,
};
