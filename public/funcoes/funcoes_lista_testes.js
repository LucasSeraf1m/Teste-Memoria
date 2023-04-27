const sec = document.getElementById("sec")
var numTest = 0

async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {

            numTest++;

            //cria o html com o nome dos testes
            var art = document.createElement("article")
            art.setAttribute("id", "teste"+numTest)

            var htmlTeste = document.createElement("h1")
            var txtTeste = document.createTextNode(teste.title)

            var botao = document.createElement("input")
            botao.type = "button"
            botao.setAttribute("value", "Responder Teste")
            botao.setAttribute("onclick", "window.location='http://localhost:8080/listadetestes/"+teste.title+"/responderteste'")

            htmlTeste.appendChild(txtTeste)

            art.appendChild(htmlTeste)
            art.appendChild(botao)
            sec.appendChild(art)
        }
    } catch(erro) {
        console.log(erro);
    }
}
getTeste()