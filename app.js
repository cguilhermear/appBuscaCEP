var zipCodeField = document.querySelector('#appBuscaCEP form input')
var submitButton = document.querySelector('#appBuscaCEP form button')
var content = document.querySelector('#appBuscaCEP main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.replace('-', '')  
    zipCode = zipCode.trim()

    axios
    .get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then( function (response) {
        if(response.data.erro) {
            throw new Error('CEP inválido')
        }

        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro)
    })
    .catch( function(error){
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text){
    var line = document.createElement('p')
    var textNode = document.createTextNode(text)

    line.appendChild(textNode) 
    content.appendChild(line)
}
