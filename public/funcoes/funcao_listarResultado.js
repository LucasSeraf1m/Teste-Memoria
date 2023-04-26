import resultado  from "http://localhost:8080/componentes/resultado.js"

function getResult() {
    var htmlResultado=""

    fetch('http://localhost:8081/result')
    .then(response => response.json())
    .then(data => {
        for(let i=0; i<data.length; i++) {
            htmlResultado += resultado(i, data[i])
        }
        
        const resultados = document.getElementById('results')
        resultados.innerHTML = htmlResultado
    })
}

getResult() 