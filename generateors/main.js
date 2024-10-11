//esta indicação coloca a função em uma espécie de suspenção
// dando poder para usar ela como abordagem
function* infinity () {
    let i = 0
    while(true){
        console.log(i++)
        yield
    }

}

function date(){
    console.log(new Date())
}

const infinityGenerator = infinity()
infinityGenerator.next()
infinityGenerator.next()
infinityGenerator.next()
infinityGenerator.next()
date(0)
infinityGenerator.next()
infinityGenerator.next()
infinityGenerator.next()
infinityGenerator.next()