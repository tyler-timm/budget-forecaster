import postgres from 'postgres';
import { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } from '$env/static/private';

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion();

export default sql;