
const infinity = () => {
    let i = 0;

    setInterval(() => {
        console.log(i++)
    }, 500)
}

const date = () =>{
    console.log(new Date())
} 

infinity()
date()