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
            botao.setAttribute("value", "Add Pergunta")
            //testando funcao
            botao.setAttribute("onclick", "alert("+numTest+")")

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
    
    // Read the JSON file
    fetch('http://localhost:8081/')
      .then(response => response.json())
      .then(data => {

        // Parse the JSON data into a JavaScript object
        data = JSON.parse(JSON.stringify(data));
    
        data.push(test);

        // Convert the JavaScript object back to JSON format
        const newJson = JSON.stringify(data);
    
        // Write the new JSON data back to the file
        fetch('http://localhost:8081/add', {
          method: 'PUT',
          body: newJson,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log('Data inserted successfully!'))
        .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
      
      numTest++;

      //cria o html com o nome do teste recem criado
      var art = document.createElement("article")
      art.setAttribute("id", "teste"+numTest)

      var botao = document.createElement("input")
      botao.type = "button"
      botao.setAttribute("value", "Add Pergunta")


      var htmlTeste = document.createElement("h1")
      var txtTeste = document.createTextNode(nome)
      htmlTeste.appendChild(txtTeste)

      art.appendChild(htmlTeste)
      art.appendChild(botao)
      sec.appendChild(art)
}
getTeste()