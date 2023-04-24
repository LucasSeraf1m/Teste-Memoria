// pegar titulo dp teste passado na url
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[2]

// Pegar elemento h1 para adiciconar o nome do teste no html
const nome = document.createTextNode(nomeTeste)
const h = document.getElementById("nome")

h.appendChild(nome)

var pergunta = [];


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
                    }
                }     
            }
        }
    }catch(erro) {
        console.log(erro);
    }
}

getPerguntas();

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        console.log(array)
    }
}

shuffleArray(pergunta);