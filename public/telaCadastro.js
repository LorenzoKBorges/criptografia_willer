const btnCadastrar = document.getElementById('btnCadastro')

btnCadastrar.addEventListener('click', async () => {
    const response = await fetch ('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
        nome: document.getElementById('nome_cad').value,
        email: document.getElementById('email_cad').value,
        senha: document.getElementById('senha_cad').value
        })
    })
    const data = await response.json()
    alert("Cadastro Realizado")
})

