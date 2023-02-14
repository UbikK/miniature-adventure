import postgres from "postgresjs";

const columnConverter = (value: unknown, col: postgres.Column<string>) => {
    switch(col.name) {
        case 'googleInfos' :
            return JSON.parse(value as string);
        case 'tags': 
            return (value as string).split(',');
        default:
            return value;
    }
}

const sql = postgres({
    host: 'localhost',
    port: 5431,
    database: 'postgres',
    username: 'admin',
    password:'admin',
    transform: {
        undefined: null,
        column: {
            from: postgres.toCamel,
            to: postgres.fromCamel
        },
        value: {
            from: columnConverter
        }
    }
})

export default sql;
