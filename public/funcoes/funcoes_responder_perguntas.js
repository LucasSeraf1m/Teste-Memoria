// pegar titulo dp teste passado na url
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[2]

console.log(nomeTeste);

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
                    }
                }     
            }
        }
    }catch(erro) {
        console.log(erro);
    }
}