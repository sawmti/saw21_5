const mariadb = require('mariadb');

const config = {
    host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vfd5ypq3v19j5od0',
    password: 'vqybj6kg7frt5g4s',
    database: 'tnfyqjrcd09evsxw',
    connectionLimit: 10000,
    acquireTimeout: 10000
}

class MariaDBConnector {

    async getDbCountries(){
        const dbConnector = mariadb.createPool( config );
        console.log( 'getDbCountries' ) ;
        const conn = await dbConnector.getConnection();
        const promise = new Promise((resolve, reject) => {
            var ret = null;
            conn.query( 'SELECT * FROM COUNTRIES', (error, result) => {
                if (error) reject(error);
                resolve( result );
            } );
        });
        conn.end();
        return promise;


        /*conn.query( {rowAsArray:true, sql: param} ).then(
            data => {
                ret = data;
                //console.log(data);
                conn.end();
            })
            .catch( err => {
                console.log(err);
                conn.end();
        })*/
    }
}

module.exports = new MariaDBConnector();