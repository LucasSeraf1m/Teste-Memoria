// pegar titulo dp teste passado na url
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[3]

// Pegear elemneto h1 para adiiconar o nome do teste no html
const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

//
var numPergunta = 0


// função para 
async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {
            if(teste.title === nomeTeste){
                
            }
        }
    }catch(erro) {
        console.log(erro);
    }
}

// funçao para adicionar novos campos de cadastro de perguntas no html
function addPergunta(){
    numPergunta++;

    const sec = document.getElementById("sec")
    const art = document.createElement("article")
    art.setAttribute("id", "art"+numPergunta)
    const formu = document.createElement("form")

    const titlePergunta = document.createElement("input")
    titlePergunta.type = "text"
    titlePergunta.setAttribute("id", "pergunta"+numPergunta)
    titlePergunta.setAttribute("class", "op"+numPergunta)
    const txtPergunta = document.createElement("label")
    const textPergunta = document.createTextNode("Pergunta "+numPergunta)
    txtPergunta.setAttribute("for", "titlePergunta")
    const opA = document.createElement("input")

    opA.type = "text"
    opA.setAttribute("id", "opA"+numPergunta)
    opA.setAttribute("class", "op"+numPergunta)
    const txtopA = document.createElement("label")
    const textopA = document.createTextNode("Opcão A")
    txtopA.setAttribute("for", "opA"+numPergunta)

    const opB = document.createElement("input")
    opB.type = "text"
    opB.setAttribute("id", "opB"+numPergunta)
    opB.setAttribute("class", "op"+numPergunta)
    const txtopB = document.createElement("label")
    const textopB = document.createTextNode("Opcão B")
    txtopB.setAttribute("for", "opB"+numPergunta)

    const opC = document.createElement("input")
    opC.type = "text"
    opC.setAttribute("id", "opC"+numPergunta)
    opC.setAttribute("class", "op"+numPergunta)
    const txtopC = document.createElement("label")
    const textopC = document.createTextNode("Opcão C")
    txtopC.setAttribute("for", "opC"+numPergunta)

    const opD = document.createElement("input")
    opD.type = "text"
    opD.setAttribute("id", "opD"+numPergunta)
    opD.setAttribute("class", "op"+numPergunta)
    const txtopD = document.createElement("label")
    const textopD = document.createTextNode("Opcão D")
    txtopD.setAttribute("for", "opD"+numPergunta)

    const opE = document.createElement("input")
    opE.type = "text"
    opE.setAttribute("id", "opE"+numPergunta)
    opE.setAttribute("class", "op"+numPergunta)
    const txtopE = document.createElement("label")
    const textopE = document.createTextNode("Opcão E")
    txtopE.setAttribute("for", "opE"+numPergunta)

    const opCerta = document.createElement("input")
    opCerta.type = "text"
    opCerta.setAttribute("id", "opCerta"+numPergunta)
    opCerta.setAttribute("class", "op"+numPergunta)
    const txtopCerta = document.createElement("label")
    const textopCerta = document.createTextNode("Resposta Correta")
    txtopCerta.setAttribute("for", "opCerta"+numPergunta)


    txtPergunta.appendChild(textPergunta)
    txtopA.appendChild(textopA)
    txtopB.appendChild(textopB)
    txtopC.appendChild(textopC)
    txtopD.appendChild(textopD)
    txtopE.appendChild(textopE)
    txtopCerta.appendChild(textopCerta)

    formu.appendChild(txtPergunta)
    formu.appendChild(titlePergunta)
    formu.appendChild(txtopA)
    formu.appendChild(opA)
    formu.appendChild(txtopB)
    formu.appendChild(opB)
    formu.appendChild(txtopC)
    formu.appendChild(opC)
    formu.appendChild(txtopD)
    formu.appendChild(opD)
    formu.appendChild(txtopE)
    formu.appendChild(opE)
    formu.appendChild(txtopCerta)
    formu.appendChild(opCerta)
    
    art.appendChild(formu)
    sec.appendChild(art)
}

function salvarPergunta(){
    let listPerguntas = [] // lista de perguntas

    //função para pergar valor da html e adicionar na lista, formato json
    for(let i=1; i<=numPergunta; i++) { //para cada pergunta criada faça
        var perguntas = document.querySelectorAll(".op"+numPergunta)
        const test = [ // salvar os valores nos campos coerentes
            {
                "tituloDaPergunta": perguntas[0].value,
                "opcaoA": perguntas[1].value,
                "opcaoB": perguntas[2].value,
                "opcaoC": perguntas[3].value,
                "opcaoD": perguntas[4].value,
                "opcaoE": perguntas[5].value,
                "resposta": perguntas[6].value
            }
        ]

        listPerguntas.push(test) // adiciona na lista
    }
    
    fetch('http://localhost:8081/')
    .then(response => response.json())
    .then(data => {

        // Parse the JSON data into a JavaScript object
        data = JSON.parse(JSON.stringify(data));
        // console.log(teste)
        for(let teste of data) {
            if(teste.title == nomeTeste)
            teste.perguntas = listPerguntas
            console.log(teste)
        }

        // Convert the JavaScript object back to JSON format
        const newJson = JSON.stringify(data);

        // Write the new JSON data back to the file
        fetch('http://localhost:8081/add', {
        method: 'PUT',
        body: newJson,
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => console.log('Data inserted successfully!'))
        .catch(error => console.error('Error:', error));
    }).then()
    .catch(error => console.error('Error:', error));

    

}   
getTeste()