import {Pool} from "pg"

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "senai",
    database: "criptografia",
    port: 5432
})

export default pool