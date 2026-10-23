import pool from "./db.js"
import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"


const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.get('/usuarios', async (req, res) =>{
    const usuarios = await pool.query("SELECT * FROM usuarios")
    res.json(usuarios)
})

app.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(senha, salt)

        const novoUsuario = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *', [nome, email, hashedPassword])
        res.json(novoUsuario.rows[0])
    } catch {
        res.status(401).json({error: "cadastro invalido"})
    }

})

app.post('/login', async (req, res) => {
    const { nome, email, senha } = req.body

    const queryText = 'SELECT * FROM usuarios WHERE nome = $1 AND email = $2'
    const response = await pool.query(queryText, [nome, email])
    const user = await response.rows[0]
    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if (!isPasswordValid) {
        res.status(401).json({ error: "Credenciais incorretas" })
    }

    res.json('logado com sucesso')
})


app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:3000")
})