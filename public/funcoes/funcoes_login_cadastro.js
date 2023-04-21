function loginUsuario() {
    const email = document.getElementById("emailInputLogin").value;
    const senha = document.getElementById("senhaInputLogin").value;
    
    fetch('http://localhost:8080/auth/signin', {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({"email": email, "senha": senha})
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Response error');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Erro com a operação fetch', error);
    });
}