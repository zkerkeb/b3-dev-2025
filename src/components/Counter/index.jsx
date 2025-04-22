import { useState, useEffect } from 'react'


const Counter = () => {
   const [count, setCount] = useState(10)

   useEffect(() =>{ 
    console.log(`le compteur est à ${count}`)
    //Call APi
    // SI la page change on rappelle l'api avec les nouvelles données
   },[count])



    const increment = () => {
        setCount(count + 1)

    }

    return (
        <div>
            <h1>Counter</h1>
            <h2>{count}</h2>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button>
            </div>
        </div>
    )
}

export default Counter