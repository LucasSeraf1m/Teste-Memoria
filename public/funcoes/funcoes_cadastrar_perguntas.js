
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[3]

const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

var numPergunta = 1

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
    const ori = document.getElementById("art1")
    const clone = ori.cloneNode(true)

    ori.setAttribute("id", "art"+numPergunta)

    sec.appendChild(clone)

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