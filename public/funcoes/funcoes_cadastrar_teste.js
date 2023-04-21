const art = document.getElementById("art")

async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {

            var htmlTeste = document.createElement("h1")
            var txtTeste = document.createTextNode(teste.title)
            htmlTeste.appendChild(txtTeste)

            art.appendChild(htmlTeste)
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

      var htmlTeste = document.createElement("h1")
      var txtTeste = document.createTextNode(nome)
      htmlTeste.appendChild(txtTeste)

    art.appendChild(htmlTeste)
}
getTeste()