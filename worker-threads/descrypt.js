const crypto = require('crypto')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const  targetHash = '900150983cd24fb0d6963f7d28e17f72'

const hashMd5 = (fullString) => {
    return crypto.createHash('md5').update(fullString).digest('hex')
}
const stringResult = []
const  findHash = (stringLength) => {

    if(stringLength === 0){
        const currentString= stringResult.join("")
        const hash = hashMd5(currentString)
        if(hash === targetHash){
            return `Achado! String ${currentString} - MD5: ${hash}`
            
        }
    }else{
        for(let i = 0; i < alphabet.length; i++){
            stringResult[stringLength - 1] = alphabet[i]
            findHash(stringLength - 1)
        }
        
    }  
}
findHash(3)
module.exports = findHash