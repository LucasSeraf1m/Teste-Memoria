
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
            botao.setAttribute("value", "Editar Teste")
            //testando funcao
            botao.setAttribute("onclick", "window.location='http://localhost:8080/login/cadastrodetestes/"+teste.title+"/cadastrodeperguntas'")

            htmlTeste.appendChild(txtTeste)

            art.appendChild(htmlTeste)
            art.appendChild(botao)
            sec.appendChild(art)
        }
    } catch(erro) {
        console.log(erro);
    }
}

function setTeste() {
    var nome = document.getElementById("nometeste").value
    document.getElementById("nometeste").value = ""
    const test = {
        "title": nome,
        "perguntas" : ""
    }
    
    // Read the JSON file
    fetch('http://localhost:8081/')
    .then(response => response.json())
    .then(data => {
      var ex;
      // Parse the JSON data into a JavaScript object
      data = JSON.parse(JSON.stringify(data));
      
      for(let teste of data){
        if(teste.title != test.title){
          ex = true;
        }else{
          ex = false;
          break;
        }
      }
      
      if(ex){
        data.push(test);
        addHTML(nome)
        const newJson = JSON.stringify(data);
        numTest++;

        fetch('http://localhost:8081/add', {
          method: 'PUT',
          body: newJson,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log('Data inserted successfully!'))
        .catch(error => console.error('Error:', error));
      }else {
        alert("Teste ja esta salvo")
      }
      
      }).catch(error => console.error('Error:', error));
}

function addHTML(nome) {
  //cria o html com o nome do teste recem criado
  var art = document.createElement("article")
  art.setAttribute("id", "teste"+numTest)

  var botao = document.createElement("input")
  botao.type = "button"
  botao.setAttribute("value", "Editar Teste")
  botao.setAttribute("onclick", "window.location='http://localhost:8080/login/cadastrodetestes/"+nome+"/cadastrodeperguntas'")

  var htmlTeste = document.createElement("h1")
  var txtTeste = document.createTextNode(nome)
  htmlTeste.appendChild(txtTeste)

  art.appendChild(htmlTeste)
  art.appendChild(botao)
  sec.appendChild(art)
}

getTeste()