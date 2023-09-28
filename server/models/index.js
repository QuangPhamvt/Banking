import {createPool} from "mysql2"


export const mysql = createPool({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "CNPM",
}).promise()