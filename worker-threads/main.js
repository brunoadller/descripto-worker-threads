const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const crypto = require('crypto')
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const  targetHash = '900150983cd24fb0d6963f7d28e17f72'
const stringResult = []

/**
 * UM PROCESSO ABRE MULTIPLAS THREADS
 */

const main = async () => {
    //SE EU ESTIVER NA MAIN THEREAD RODA ISTO
    if(isMainThread){
        console.time("performance")
        //desta forma a execução fica paralela
        const result = await Promise.all([
            execute(3)
        ])
        console.timeEnd("performance")

    }//SE NÃO ESTIVER NA MAINTHREAD ESTARÁ NO WORKER, PORTANTO QUALQUER NUMBER
    else{
        const result = findHash(workerData.number)
        parentPort.postMessage(result)
    }
}

//Esta promisse que foi criada e excutará o worker, fará o wrokerdata representar o number 
function execute(number){
    return new Promise(function(resolve){
        //ESTE NEW WORKER REPRESENTA A EXECUÇÃO DESTA THREAD
        const worker = new Worker(__filename, {workerData: {number}})
        worker.on('message', function(message){
            resolve(message)
        })
    })
}
const hashMd5 = (fullString) => {
    return crypto.createHash('md5').update(fullString).digest('hex')
}
const  findHash = (stringLength) => {

    if(stringLength === 0){
        const currentString= stringResult.join("")
        const hash = hashMd5(currentString)
        if(hash === targetHash){
            console.log( `Achado! String ${currentString} - MD5: ${hash}`)
            
        }
    }else{
        for(let i = 0; i < alphabet.length; i++){
            stringResult[stringLength - 1] = alphabet[i]
            findHash(stringLength - 1)
        }
        
    }  
}

//após isso chamar a função main para executar a multthread de forma asyncrona
main()