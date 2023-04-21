
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[3]

const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

var numPergunta = 0

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
function addPergunta(){

    numPergunta++;

    const sec = document.getElementById("sec")
    const art = document.createElement("article")
    art.setAttribute("id", "art"+numPergunta)
    const formu = document.createElement("form")
    const titlePergunta = document.createElement("input")
    titlePergunta.type = "text"
    titlePergunta.setAttribute("id", "pergunta"+numPergunta)
    const txtPergunta = document.createElement("label")
    const textPergunta = document.createTextNode("Pergunta "+numPergunta)
    txtPergunta.setAttribute("for", "titlePergunta")
    const opA = document.createElement("input")

    opA.type = "text"
    opA.setAttribute("id", "opA"+numPergunta)
    const txtopA = document.createElement("label")
    const textopA = document.createTextNode("Opcão A")
    txtopA.setAttribute("for", "opA"+numPergunta)

    const opB = document.createElement("input")
    opB.type = "text"
    opB.setAttribute("id", "opB"+numPergunta)
    const txtopB = document.createElement("label")
    const textopB = document.createTextNode("Opcão B")
    txtopB.setAttribute("for", "opB"+numPergunta)

    const opC = document.createElement("input")
    opC.type = "text"
    opC.setAttribute("id", "opC"+numPergunta)
    const txtopC = document.createElement("label")
    const textopC = document.createTextNode("Opcão C")
    txtopC.setAttribute("for", "opC"+numPergunta)

    const opD = document.createElement("input")
    opD.type = "text"
    opD.setAttribute("id", "opD"+numPergunta)
    const txtopD = document.createElement("label")
    const textopD = document.createTextNode("Opcão D")
    txtopD.setAttribute("for", "opD"+numPergunta)

    const opE = document.createElement("input")
    opE.type = "text"
    opE.setAttribute("id", "opE"+numPergunta)
    const txtopE = document.createElement("label")
    const textopE = document.createTextNode("Opcão E")
    txtopE.setAttribute("for", "opE"+numPergunta)

    const opCerta = document.createElement("input")
    opCerta.type = "text"
    opCerta.setAttribute("id", "opCerta"+numPergunta)
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

    var perguntas = document.getElementById("").value
    console.log(perguntas)
    const test = {
        "title": nomeTeste,
        "perguntas" : {
            "tituloDaPergunta": "",
            "opcaoA": "",
            "opcaoB": "",
            "opcaoC": "",
            "opcaoD": "",
            "opcaoE": "",
            "resposta": ""
        }
    }
}
getTeste()