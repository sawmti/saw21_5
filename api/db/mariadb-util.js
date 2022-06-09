const mariadb = require('mariadb');

const config = {
    host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vfd5ypq3v19j5od0',
    password: 'vqybj6kg7frt5g4s',
    database: 'tnfyqjrcd09evsxw',
    connectionLimit: 5,
    acquireTimeout: 300
}

class MariaDBConnector {

    dbConnector = mariadb.createPool( config );

    async countriesListDb(){
        let sql = "select * from COUNTRIES";
        return this.query( sql );
    }

    async countriesDetailDb( id ){
        let sql = "select * from COUNTRIES WHERE ID = id";
        return this.query( sql );
    }

    async insCountry( param ){

        let conn = await this.dbConnector.getConnection();
        let ret = null;

        conn.query("INSERT INTO COUNTRIES (id, name, flagUrl, wikidataUrl) values (?, ?, ?, ?)",
    ["Q299", "Chile","http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Chile.svg","http://www.wikidata.org/entity/Q298"], (res) => {
           console.log('insCountry:' + res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        })
        .then(() => {
            conn.commit();
            conn.release();
            conn.end();
        })
        .catch( err => {
           console.log(err);
           conn.release();
           conn.end();
           //dbConnector.end();
        })

        return ret;
    }

    async query( param ){

        let conn = await this.dbConnector.getConnection();
        let ret = null;

        conn.query( param )
            .then( data => {
                ret = data;
                console.log(data);
                conn.release();
                conn.end();
                //dbConnector.end();
            })
            .catch( err => {
                console.log(err);
                conn.release();
                conn.end();
                //dbConnector.end();
            })
        return ret;
    }
}

module.exports = new MariaDBConnector();