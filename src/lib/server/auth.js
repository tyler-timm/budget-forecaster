import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
// import postgres from "postgres";
import { dev } from "$app/environment";
import { sql } from "$lib/db";

// const sql = postgres();

const adapter = new PostgresJsAdapter(sql, {
	user: "auth_user",
	session: "user_session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username
		};
	}
});