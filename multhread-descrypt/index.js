
const {
    Worker, isMainThread, parentPort, workerData, threadId
} = require('worker_threads')
const jimp = require('jimp')

if(isMainThread){
    module.exports = (img) => new Promise(async (resolve, reject) => {
        const worker = new Worker(__filename, {
            workerData: img
        })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if(code != 0){
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}else{
    console.log(`${threadId} Starting ${workerData}`)
   try{
        const outImg = workerData.replace('.jpeg', '__small.jpeg')
        async () => {
            const imgObj = await jimp.read(workerData)
            imgObj
                .scale(0.1)
                .quality(60)
                .write(outImg)
            console.log(`${threadId} Ending ${workerData}`)
            parentPort.postMessage(outImg)
        }
   }catch(error){
    console.error(`Error processing image: ${error.message}`);
    parentPort.postMessage(null)
   }

}