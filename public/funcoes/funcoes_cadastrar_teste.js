
async function getTeste() {
    try {
        const response = await fetch('http://localhost:8081')
        const data = await response.json();
        
        for(let teste of data) {
            console.log(teste.title)
        }
    } catch(erro) {
        console.log(erro);
    }
}

function setTeste() {
    const title = "title";

  // Get user input
    const test = "aaa";

    // Read the JSON file
    fetch('http://localhost:8081')
    .then(response => response.json())
  .then(data => {

    console.log(data[0].title)

    // Parse the JSON data into a JavaScript object
    data = JSON.parse(JSON.stringify(data));
    console.log(data)
    data.push(test);

    // Convert the JavaScript object back to JSON format
    const newJson = JSON.stringify(data);

    // Write the new JSON data back to the file
    fetch('http://localhost:8081/add', {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({"email": "email", "senha": "senha"})
    })
    // .then(response => console.log('Data inserted successfully!'))
    // .catch(error => console.error('Error:', error));
  })
  .catch(error => console.error('Error:', error));

}

// setTeste()