import postgres from "postgresjs";

const sql = postgres({
    host: 'localhost',
    port: 5431,
    database: 'postgres',
    username: 'admin',
    password:'admin',
})

export default sql;
