console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const open = document.querySelector('#open')
const close = document.querySelector('#close')
const date = document.querySelector('#date')
const volume = document.querySelector('#volume')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...'
    open.innerHTML =  ''
    close.innerHTML =  ''
    date.innerHTML =  ''
    volume.innerHTML =  ''

    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O ativo deve ser informado'
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText = `Alguma coisa deu errado`
                price.innerHTML =  `${data.error.mensage} | código ${data.error.code}`
            }else{
                mainMensage.innerText = data.symbol
                open.innerText = `Open: ${data.open}`
                close.innerText = `Close: ${data.close}`
                date.innerText = `Date: ${data.date}`
                volume.innerText = `Volume: ${data.volume}`
            }
        })
    })
})