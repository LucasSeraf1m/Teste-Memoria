function getResult() {
    fetch('http://localhost:8081/result')
    .then(response => response.json())
    .then(data => {
        
    })
}

getResult() 