import postgres from 'postgres';
import { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } from '$env/static/private';

export const sql = postgres({
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
    return JSON.stringify(result);
}

export async function deleteTransaction(id) {
    const result = await sql`delete from transaction where id = ${id}`;
    console.log('delete result', result);
    return JSON.stringify(result);
}

export async function addTransaction(transaction) {
    if (transaction.amount <= 0) {
        throw new Error('amount must be greater than 0');
    }
    const result = await sql`insert into transaction
    (description, type, amount, date, recurring)
    values
    (${transaction.description}, ${transaction.type}, ${transaction.amount}, ${transaction.date}, ${transaction.recurring})`;
    console.log('create result', result);
    return JSON.stringify(result);
}

// TODO editTransaction(id) - update transaction

export async function createUser(id, username, password_hash) {
    const result = await sql`insert into auth_user (id, username, password_hash) values (${id}, ${username}, ${password_hash})`;
    console.log('create user result', result);
    return JSON.stringify(result);
}

export async function getUser(username) {
    const result = await sql`select username, password_hash from auth_user where username = ${username}`;
    console.log('get user result', result);
    return JSON.stringify(result);
}