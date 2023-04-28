// pegar titulo do teste passado na url
const url = window.location.pathname
const parts = url.split('/')
let nomeTesteVet = parts[3]
let nomeTeste = nomeTesteVet

// URL não aceita espaço, troca espaço por %20, if para trocar por espaço
if(nomeTesteVet.includes('%20')) {
    let partes = nomeTesteVet.split('%20')

    nomeTeste=""
    for(let i=0; i<partes.length; i++) {
        // console.log(nomeTesteVet[i]);
        if((partes.length-1) == i) {
            nomeTeste += partes[i]
        } else {
            nomeTeste += partes[i] + " "
        }
    }
}

const inputSalvar = document.getElementById('salvar')

// Pegar elemento h1 para adiciconar o nome do teste no html
const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

var numPerguntaNova = 0
var numPergunta = 0

var titulo
var opAT
var opBT
var opCT
var opDT
var opET
var opCertaT

// função para pegar as perguntas do teste
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
                        titulo = teste.perguntas[i].tituloDaPergunta
                        opAT = teste.perguntas[i].opcaoA
                        opBT = teste.perguntas[i].opcaoB
                        opCT = teste.perguntas[i].opcaoC
                        opDT = teste.perguntas[i].opcaoD
                        opET = teste.perguntas[i].opcaoE
                        opCertaT = teste.perguntas[i].resposta
                        addPergunta(true)
                    }
                }     
            }
        }
    }catch(erro) {
        console.log(erro);
    }
}

// funçao para adicionar novos campos de cadastro de perguntas no html
function addPergunta(b){
    

    // cria o html das perguntas
    const sec = document.getElementById("sec")
    const art = document.createElement("article")
    const formu = document.createElement("form")

    if(b){
      numPergunta++;

      art.setAttribute("id", "artT")
      const titlePergunta = document.createElement("input")
      titlePergunta.type = "text"
      titlePergunta.setAttribute("id", "pergunta")
      titlePergunta.setAttribute("class", "op")
      titlePergunta.setAttribute("class", "opE"+numPergunta)
      const txtPergunta = document.createElement("label")
      const textPergunta = document.createTextNode("Pergunta "+numPergunta)
      txtPergunta.setAttribute("for", "titlePergunta")
      const opA = document.createElement("input")
      txtPergunta.setAttribute("class", "labelPergunta") //lucas
  
      opA.type = "text"
      opA.setAttribute("id", "opA")
      opA.setAttribute("class", "op")
      opA.setAttribute("class", "opE"+numPergunta)
      const txtopA = document.createElement("label")
      const textopA = document.createTextNode("Opcão A")
      txtopA.setAttribute("for", "opA")
  
      const opB = document.createElement("input")
      opB.type = "text"
      opB.setAttribute("id", "opB")
      opB.setAttribute("class", "op")
      opB.setAttribute("class", "opE"+numPergunta)
      const txtopB = document.createElement("label")
      const textopB = document.createTextNode("Opcão B")
      txtopB.setAttribute("for", "opB")
  
      const opC = document.createElement("input")
      opC.type = "text"
      opC.setAttribute("id", "opC")
      opC.setAttribute("class", "op")
      opC.setAttribute("class", "opE"+numPergunta)
      const txtopC = document.createElement("label")
      const textopC = document.createTextNode("Opcão C")
      txtopC.setAttribute("for", "opC")
  
      const opD = document.createElement("input")
      opD.type = "text"
      opD.setAttribute("id", "opD")
      opD.setAttribute("class", "op")
      opD.setAttribute("class", "opE"+numPergunta)
      const txtopD = document.createElement("label")
      const textopD = document.createTextNode("Opcão D")
      txtopD.setAttribute("for", "opD")
  
      const opE = document.createElement("input")
      opE.type = "text"
      opE.setAttribute("id", "opE")
      opE.setAttribute("class", "op")
      opE.setAttribute("class", "opE"+numPergunta)
      const txtopE = document.createElement("label")
      const textopE = document.createTextNode("Opcão E")
      txtopE.setAttribute("for", "opE")
  
      const opCerta = document.createElement("input")
      opCerta.type = "text"
      opCerta.setAttribute("id", "opCerta")
      opCerta.setAttribute("class", "op")
      opCerta.setAttribute("class", "opE"+numPergunta)
      const txtopCerta = document.createElement("label")
      const textopCerta = document.createTextNode("Resposta Correta")
      txtopCerta.setAttribute("for", "opCerta")
      txtopCerta.setAttribute("class", "labelRespostaCerta") //lucas
  

      titlePergunta.setAttribute("value", titulo) 
      opA.setAttribute("value", opAT)
      opB.setAttribute("value", opBT)
      opC.setAttribute("value", opCT)
      opD.setAttribute("value", opDT)
      opE.setAttribute("value", opET)
      opCerta.setAttribute("value", opCertaT)

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

    }else{
      // Altera Valor da pergunta
      inputSalvar.setAttribute('value', 'Salvar Teste')

      numPerguntaNova++;

      art.setAttribute("id", "art"+numPerguntaNova)
      const titlePergunta = document.createElement("input")
      titlePergunta.type = "text"
      titlePergunta.setAttribute("id", "pergunta"+numPerguntaNova)
      titlePergunta.setAttribute("class", "op"+numPerguntaNova)
      const txtPergunta = document.createElement("label")
      const textPergunta = document.createTextNode("Pergunta "+(numPergunta+numPerguntaNova))
      txtPergunta.setAttribute("for", "titlePergunta")
      const opA = document.createElement("input")
      txtPergunta.setAttribute("class", "labelPergunta") //lucas
  
      opA.type = "text"
      opA.setAttribute("id", "opA"+numPerguntaNova)
      opA.setAttribute("class", "op"+numPerguntaNova)
      const txtopA = document.createElement("label")
      const textopA = document.createTextNode("Opcão A")
      txtopA.setAttribute("for", "opA"+numPerguntaNova)
  
      const opB = document.createElement("input")
      opB.type = "text"
      opB.setAttribute("id", "opB"+numPerguntaNova)
      opB.setAttribute("class", "op"+numPerguntaNova)
      const txtopB = document.createElement("label")
      const textopB = document.createTextNode("Opcão B")
      txtopB.setAttribute("for", "opB"+numPerguntaNova)
  
      const opC = document.createElement("input")
      opC.type = "text"
      opC.setAttribute("id", "opC"+numPerguntaNova)
      opC.setAttribute("class", "op"+numPerguntaNova)
      const txtopC = document.createElement("label")
      const textopC = document.createTextNode("Opcão C")
      txtopC.setAttribute("for", "opC"+numPerguntaNova)
  
      const opD = document.createElement("input")
      opD.type = "text"
      opD.setAttribute("id", "opD"+numPerguntaNova)
      opD.setAttribute("class", "op"+numPerguntaNova)
      const txtopD = document.createElement("label")
      const textopD = document.createTextNode("Opcão D")
      txtopD.setAttribute("for", "opD"+numPerguntaNova)
  
      const opE = document.createElement("input")
      opE.type = "text"
      opE.setAttribute("id", "opE"+numPerguntaNova)
      opE.setAttribute("class", "op"+numPerguntaNova)
      const txtopE = document.createElement("label")
      const textopE = document.createTextNode("Opcão E")
      txtopE.setAttribute("for", "opE"+numPerguntaNova)
  
      const opCerta = document.createElement("input")
      opCerta.type = "text"
      opCerta.setAttribute("id", "opCerta"+numPerguntaNova)
      opCerta.setAttribute("class", "op"+numPerguntaNova)
      const txtopCerta = document.createElement("label")
      const textopCerta = document.createTextNode("Resposta Correta")
      txtopCerta.setAttribute("for", "opCerta"+numPerguntaNova)
      txtopCerta.setAttribute("class", "labelRespostaCerta") //lucas

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
}

async function salvarPergunta(){
    let listPerguntas = [] // lista de perguntas
    let respostaExistente=false;

    // função para pegar valor da html e adicionar na lista, formato json
    for(let i=1; i<=numPergunta; i++) { //para cada pergunta criada faça
        var perguntas = document.querySelectorAll(".opE"+i)
        let test = {}
        respostaExistente=false;
        
        for(let j=0; j<6;j++) {
            if(perguntas[j].value=="") {
                //
            } else {
                if(perguntas[j].value == perguntas[6].value) {
                    test =  { // salvar os valores nos campos coerentes
                        "tituloDaPergunta": perguntas[0].value,
                        "opcaoA": perguntas[1].value,
                        "opcaoB": perguntas[2].value,
                        "opcaoC": perguntas[3].value,
                        "opcaoD": perguntas[4].value,
                        "opcaoE": perguntas[5].value,
                        "resposta": perguntas[6].value
                    }
                    respostaExistente=true
                }
            }
        }

        listPerguntas.push(test)
    }

    for(let i=1; i<=numPerguntaNova; i++) { //para cada pergunta criada faça
        var perguntas = document.querySelectorAll(".op"+i)
        let test = {}
        respostaExistente=false;
        
        for(let j=0; j<6;j++) {
            if(perguntas[j].value=="") {
                //
            } else {
                if(perguntas[j].value == perguntas[6].value) {
                    test =  { // salvar os valores nos campos coerentes
                        "tituloDaPergunta": perguntas[0].value,
                        "opcaoA": perguntas[1].value,
                        "opcaoB": perguntas[2].value,
                        "opcaoC": perguntas[3].value,
                        "opcaoD": perguntas[4].value,
                        "opcaoE": perguntas[5].value,
                        "resposta": perguntas[6].value
                    }
                    respostaExistente=true
                    
                }
            }
        }

        if(respostaExistente) {
            listPerguntas.push(test) // adiciona na lista
        }
    }

    if(respostaExistente) {
         fetch('http://localhost:8081/')
        .then(response => response.json())
        .then(data => {
    
            // Parse the JSON data into a JavaScript object
            data = JSON.parse(JSON.stringify(data));
            for(let teste of data) {
                if(teste.title == nomeTeste) {
                    if(teste.perguntas == "") {
                        teste.perguntas = listPerguntas
                    } else {
                        teste.perguntas = listPerguntas
                    }
                }
            }
    
            // Convert the JavaScript object back to JSON format
            const newJson = JSON.stringify(data);
            alert("Teste Salvo com Sucesso")
            // Write the new JSON data back to the file
            fetch('http://localhost:8081/add', {
                method: 'PUT',
                body: newJson,
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(response => alert("Teste Salvo com Sucesso"))
                .catch(error => console.error('Error:', error));
        }).then()
        .catch(error => console.error('Error:', error));
    
        window.location='http://localhost:8080/login/cadastrodetestes'
    } else {
        alert("Dados Incorretos")
    }
}   


getPerguntas()