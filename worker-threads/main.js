const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const fibonacci = require('./fibonacci')
const  findHash = require('./descrypt')
/**
 * UM PROCESSO ABRE MULTIPLAS THREADS
 */

const main = async () => {
    //SE EU ESTIVER NA MAIN THEREAD RODA ISTO
    if(isMainThread){
        console.time("performance")
        //desta forma a execução fica paralela
        const result = await Promise.all([execute(3)])
            .then((res) => {
                console.log(execute(3))
            })
        console.timeEnd("performance")

    }//SE NÃO ESTIVER NA MAINTHREAD ESTARÁ NO WORKER, PORTANTO QUALQUER NUMBER
    else{
        const result = fibonacci(workerData.number)
        
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
main()
