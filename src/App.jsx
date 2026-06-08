import s from './App.module.css'
import { api } from './constants/api'
import { useState, useEffect } from 'react'
import logo from '/logodb.webp'

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [page, setPage] = useState("")



  useEffect(() => {
    api.get(`/characters?page=${page}`).then((response) => {
      setData(response.data.items)
    }).catch((error) => {
      console.error("Deu ruim!!!", error)
    })
  }, [page])
  

  return (
    <>
      <div className={s.wrapimg}>
        <img className={s.logo} src={logo} alt="Logo Rick and Morty" />
        <h2>Dragon Ball API</h2>
      <div>
        <label>Page</label>
        <input type="text" placeholder='1/6' min='1' max='6' value={page} onChange={(e) => setPage(e.target.value)}/>
      </div>

      </div>
      <main>
        {data.map((item, index) => {
          return(
            <div key={index} className={s.card}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.race}{item.gender}</p>
              <p>Base KI: {item.ki}</p>
              <p>Total KI: {item.maxKi}</p>
              <p>Afiliation: {item.afiliation}</p>
              
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
