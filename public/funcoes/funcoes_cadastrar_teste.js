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

    // fetch('http://localhost:8081/addTeste', {
    //     method: "post",
    //     headers: {'Content-type': 'application/json'},
    //     body: JSON.stringify({"title": title})
    // }).then(response => {
    //     if(!response.ok){
    //         throw new Error('Response error');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.log('Erro com a operação fetch', error);
    // });

    // Get user input
    const userInput = "teste"

    // Read the JSON file
    fetch('../dados/testes.json')
    .then(response => response.json())
    .then(data => {
        // Parse the JSON data into a JavaScript object
        const json = JSON.parse(data);

        // Add the user input to the object
        json.data.push(userInput);

        // Convert the JavaScript object back to JSON format
        const newJson = JSON.stringify(json);

        // Write the new JSON data back to the file
        fetch('../dados/testes.json', {
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

}

setTeste()