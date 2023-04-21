async function getTeste() {
    try {
        const response = await fetch('http://localhost:8080')
        const data = await response.json();
        
        for(let pergunta of data) {
            console.log(pergunta.title)
            console.log(pergunta.perguntas.tituloDaPergunta)
            console.log(pergunta.perguntas.opcaoA)
            console.log(pergunta.perguntas.opcaoB)
            console.log(pergunta.perguntas.opcaoC)
            console.log(pergunta.perguntas.opcaoD)
            console.log(pergunta.perguntas.opcaoE)
            console.log(pergunta.perguntas.resporta)
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