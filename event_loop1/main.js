//EXEMPLO MUITO BOM EXPLICAR O MODO DE PROCESSAMENTO DE JAVASCRIPT
//SENDO SINGLE-THREAD

const infinity =  () => {
    let i = 0
    while(true){
        console.log(i++)
    }
}

const date  = () => {
    console.log(new Date())
}

infinity()
date()