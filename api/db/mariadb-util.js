const mariadb = require('mariadb');

const config = {
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'h5cggq78o2k3gyvt',
    password: 'e62ujskuugm5vbqz',
    database: 'irlibi0wp60foa8y',
    connectionLimit: 5,
    acquireTimeout: 300
}

class MariaDBConnector {
    dbConnector = mariadb.createPool( config );
    async query( param ){
        var conn = await this.dbConnector.getConnection();
        var ret = null;

        conn.query( param )
            .then( data => {
                ret = data;
                console.log(data);
                conn.end();
            })
            .catch( err => {
                console.log(err);
                conn.end();
            })
        return ret;
    }
}

module.exports = new MariaDBConnector();