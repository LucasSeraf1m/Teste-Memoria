// pegar titulo dp teste passado na url
const url = window.location.pathname
const parts = url.split('/')
let nomeTeste = parts[2]

// URL não aceita espaço, troca espaço por %20, if para trocar por espaço
if(nomeTeste.includes('%20')) {
    let partes = nomeTeste.split('%20')

    nomeTeste=""
    for(let par of partes) {
        nomeTeste += par + " "
    }
}

// Pegar elemento h1 para adiciconar o nome do teste no html
const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

var pergunta = [];
let indice=0;
let acertos=0;
let respondidas = 0

async function getPerguntas() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();

        // pega as perguntas e alternativas do teste selecionado e chama a funcao de perguntas como true
        for(let teste of data) {
            if(teste.title === nomeTeste){ 
                var i;
                for(i=0; i<teste.perguntas.length; i++){
                    if(teste.perguntas[i].tituloDaPergunta != ''){
                        const test =  { // salvar os valores nos campos coerentes
                            "tituloDaPergunta": teste.perguntas[i].tituloDaPergunta,
                            "opcaoA": teste.perguntas[i].opcaoA,
                            "opcaoB": teste.perguntas[i].opcaoB,
                            "opcaoC": teste.perguntas[i].opcaoC,
                            "opcaoD": teste.perguntas[i].opcaoD,
                            "opcaoE": teste.perguntas[i].opcaoE,
                            "resposta": teste.perguntas[i].resposta
                        }
                        pergunta.push(test);
                        indice = i;
                    }
                }     
            }
        }
    }catch(erro) {
        console.log(erro);
    }

    pergunta = randomizarPerguntas(pergunta);

    setPergunta();
}

getPerguntas();
// setPergunta()

function randomizarPerguntas(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function setPergunta() {
    if(indice >= 0) {
        const titulo = document.getElementById("pergunta");
        const inputs = document.querySelectorAll('input');
        const labels = document.querySelectorAll('label');
    
        let j=0 
        for(let label of labels) {    
            switch (j) {
                case 0:
                    label.innerHTML= pergunta[indice].opcaoA
                break;
                case 1:
                    label.innerHTML= pergunta[indice].opcaoB
                break;
                case 2:
                    label.innerHTML= pergunta[indice].opcaoC
                break;
                case 3:
                    label.innerHTML= pergunta[indice].opcaoD
                break;
                case 4:
                    label.innerHTML= pergunta[indice].opcaoE
                break;
                default:
                //Instruções executadas quando o valor da expressão é diferente de todos os cases
                break;
            } 
            j++
        }

        j=0 
        for(let input of inputs) {    
            switch (j) {
                case 0:
                    input.setAttribute('value', pergunta[indice].opcaoA)
                break;
                case 1:
                    input.setAttribute('value', pergunta[indice].opcaoB)
                break;
                case 2:
                    input.setAttribute('value', pergunta[indice].opcaoC)
                break;
                case 3:
                    input.setAttribute('value', pergunta[indice].opcaoD)
                break;
                case 4:
                    input.setAttribute('value', pergunta[indice].opcaoE)
                break;
                default:
                //Instruções executadas quando o valor da expressão é diferente de todos os cases
                break;
            } 
            j++
        }
        titulo.innerText = pergunta[indice].tituloDaPergunta
    } 
    if(indice == 0){
        const btnProx = document.getElementById('prox')
        btnProx.setAttribute('value', "Encerrar teste")
        btnProx.setAttribute('onclick', "testFinalizado()")
    }
}

function getReposta() {


    if(indice >= 0) {
        var resposta = document.querySelector('input[name="opcao"]:checked').value
        console.log(indice);
        console.log(pergunta[indice].resposta);
        console.log(resposta);
        if(resposta == pergunta[indice].resposta) {
            console.log("certou");
            acertos++
        } else {
            console.log("Errou");
        }

        indice--
        setPergunta()
        respondidas++
    } else {
        salvarResult()
    }
    var button = document.querySelector('input[name="opcao"]:checked');
    button.checked = false;
}

function salvarResult() {
    test = {
        "teste": nomeTeste,
        "qtd_perguntas": respondidas,
        "qtd_acertos": acertos
    }

    fetch('http://localhost:8081/result')
    .then(response => response.json())
    .then(data => {

        // Parse the JSON data into a JavaScript object
        data = JSON.parse(JSON.stringify(data));
        data.push(test);
        
        // Convert the JavaScript object back to JSON format
        const newJson = JSON.stringify(data);
        
        // Write the new JSON data back to the file
        fetch('http://localhost:8081/addResult', {
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

function testFinalizado(){

    getReposta()
    salvarResult()

    var sec = document.getElementById("sec")
    var formu = document.getElementById("formu")
    var botaos = document.getElementById("botao") 
    sec.removeChild(formu)
    sec.removeChild(botaos)

    var txtH2 = document.createElement("h2")
    var txt = document.createTextNode("Acertos: "+acertos)

    var txtQ = document.createElement("h2")
    var txt2 = document.createTextNode("Perguntas Respondidas: "+respondidas)

    var botao = document.createElement("button")
    botao.setAttribute("onclick", "window.location='http://localhost:8080/resultados'")
    var txtB = document.createTextNode("Lista de Resultados")
    botao.appendChild(txtB)
    botao.setAttribute("class", "btn")
    botao.setAttribute("id", "botaoTest")


    txtQ.appendChild(txt2)
    sec.appendChild(txtQ)

    txtH2.appendChild(txt)
    sec.appendChild(txtH2)

    sec.appendChild(botao)
}
