import sql from "mssql";


const dbSettings = {
    user: 'pablox2_SQLLogin_1',
    password: 'w2axx8ii9r',
    server: 'AsilosAncianos.mssql.somee.com',
    database: 'AsilosAncianos',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
};
export async function getConnection() {

    try{
    const pool = await sql.connect(dbSettings);
    return pool;
    }catch(error){
        console.error(error);
    }
}

export { sql };