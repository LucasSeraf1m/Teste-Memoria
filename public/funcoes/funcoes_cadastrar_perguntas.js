
const url = window.location.pathname
const parts = url.split('/')
const nomeTeste = parts[3]

console.log(nomeTeste)

async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {
            
        }
    }catch(erro) {
        console.log(erro);
    }
}