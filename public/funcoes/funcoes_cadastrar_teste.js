async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let pergunta of data) {
            console.log(pergunta.title)
        }
    } catch(erro) {
        console.log(erro);
    }
}

function setTeste() {
    const title = "title";

    fetch('http://localhost:8081/addTeste');
}

setTeste()
getTeste()