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

export async function getTransactions() {
    const result = await sql`select * from transaction`;
    console.log('sql result', result);
    return JSON.stringify(result); 
}

export async function deleteTransaction(id) {
    console.log(`deleting transaction ${id}`);
    const result = await sql`delete from transaction where id = ${id}`;
    console.log('sql result', result);
    return JSON.stringify(result);
}