// import dados from '../dados/testes.json' assert { type: "json" };
// import funDados from '../../js/teste'
// const fs = require(".//fs")


// const dados = fs.readFile('../dados/teste.json')

// function cadastrarTeste(){
//     console.log(dados)
// }


// cadastrarTeste()

// console.log("dd")

async function getConection() {
    try {
        const response = await fetch('http://localhost:8081/')
       
        const data = await response.json();
        
        console.log(response) 
        console.log(data)

        // for(let vaga of data) {
        //     mudarStatus(vaga.idVaga, vaga.disponibilidade)
        // }
        
    } catch(erro) {
        console.log(erro);
    }
}

getConection()