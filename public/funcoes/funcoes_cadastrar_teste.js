async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {
            console.log(teste.title)
        }
    } catch(erro) {
        console.log(erro);
    }
}

function setTeste() {
    const title = "title";

    fetch('http://localhost:8081/addTeste', {
        method: "post",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({"title": title})
    }).then(response => {
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

setTeste()