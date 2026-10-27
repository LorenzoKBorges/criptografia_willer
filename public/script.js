const btnLogar = document.getElementById ('btnLogin')


btnLogar.addEventListener('click', async () => {
    const response = await fetch ('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
        nome: document.getElementById('nome_login').value,
        email: document.getElementById('email_login').value,
        senha: document.getElementById('senha_login').value
        })
        
    })
    const data = await response.json()
    if(data != "Usuário Logado com Sucesso"){
        alert("Credenciais Inválidas")
    }else{
        window.location.replace('http://127.0.0.1:5501/front/telainicial.html')
    }
})





