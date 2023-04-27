export default function resultado(indice, result) {
    return `
        <div class="containerResultado "id="result${indice}">
            <h2>${result.teste}</h2>
            <h3>Quantidade de perguntas: </h3>
            <p>${result.qtd_perguntas}</p>
            <h3>Quantidade de acertos:</h3>
            <p>${result.qtd_acertos}</p>
        </div>
    `
}
