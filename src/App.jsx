import { useState } from 'react'
import './App.css'
import chuck from './assets/sinto.svg'
import DropDown from './components/DropDown'
import Buttons from './components/Buttons'
import Casella from './components/Casella'



function App() {
  const [categories, setCategories] = useState([])
  const [joke, setJoke] = useState("")
  const [userselection, setuserselection] = useState("")

  function loadCategories(){
      let url = 'https://api.chucknorris.io/jokes/categories'
    let promise = fetch(url)

    promise.then(
        response => response.json()
    ).then(
        data => {
          data.forEach(element => {
            let obj = data.map(function(item, index){
              return {
                id: index,
                value: item
              }
            })
            setCategories(obj)
          });
        }
    )
  }

  function loadJoke(){
    if(userselection != ""){
      let url = `https://api.chucknorris.io/jokes/random?category=${userselection}`
      let promise = fetch(url)
      
      promise.then(
        response => response.json()
      ).then(
        data => setJoke(data.value)
      ) 
    }else{
      let url = `https://api.chucknorris.io/jokes/random`
      let promise = fetch(url)
      
      promise.then(
        response => response.json()
      ).then(
        data => setJoke(data.value)
      ) 
      
    }
  }

  function selettore(e){
    setuserselection(e)
  }

  

  function copia(){
    if(joke != ""){
      navigator.clipboard.writeText(joke)
      alert("Il testo è stato copiato")
    }
  }

  return (
    <div className="App">
      <div id='container'>
      <h1 id='title'>Webapp API Chuck Norris</h1>
      <p id='paragraph'>Design di una pagina che utilizza la API di chucknorris.io per generare alla pressione di un pulsante una battuta del tipo che selezioni nel menu a tendina qui sotto.</p>
      <img id='chuck_img' src={chuck} alt="Beh, è chuck " />
      <DropDown categories={categories} clbk={loadCategories} handler={selettore} />
      {joke != "" &&
        <Casella joke={joke}/>
      } 
      <Buttons text="carica joke" variant={"active"}  styles={"margin-top-75"} clbk={() => loadJoke()}/>
      <Buttons text="copia testo" variant={joke === "" ? "disabled" : "active"} styles={"margin-top-20"} clbk={copia}/>
      </div>
    </div>
  )
}

export default App
