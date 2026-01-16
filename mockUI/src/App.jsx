import { useState } from 'react'
import './App.css'

let stock = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function Item({category, price, stocked, name}) {
  
  if(stocked == true){
    return (
    <>
      <td>{name}</td>
      <td>{price}</td>
    </>
  )} else {
      return (<>
      <td className='red'>{name}</td>
      <td>{price}</td>
    </>)
  }
}
function Menu({unavailAllow, searchWord}) {
  
  
  
  let itemsDisplayOrder = [];
  let fruits = [];
  let vegis = [];

  for (const element of stock) {
    if (element.name.toLowerCase().indexOf(searchWord.toLowerCase()) === -1) {
      continue;
    }
    if(element.category == "Fruits"){
      if(element.stocked || (unavailAllow || element.stocked)){      
        fruits.push(
          <tr>
            <Item category= {element.category} price= {element.price} stocked= {element.stocked} name= {element.name} />
          </tr>
        )
      }
    } else {
      if(element.stocked|| (unavailAllow || element.stocked)){      
        vegis.push(
          <tr>
            <Item category= {element.category} price= {element.price} stocked= {element.stocked} name= {element.name} />
          </tr>
        )
      }
    }
  }

  return (
    <>
      <div>
      <h4>Fruits</h4>
      {fruits}
      </div>
      <div>
      <h4>Vegetables</h4>
      {vegis}
      </div>
    </>
  );
}



function App() {
  const [unavailAllow,setUnavailAllow] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  return (
    <>
      <div className="searchBar">
        <input 
          type="text" 
          placeholder='Search...'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)} 
        />
      </div>
      
      <div className="checkBox">
        <input 
          type="checkbox" 
          name="Only show products in stock" 
          checked = {!unavailAllow}
          id="check" 
          onChange={()=>{
            setUnavailAllow((original) => !original)
          }}
        />
        <label for="check">Only show products in stock</label>
      </div>

      <div className="menu">
        <div className="head">
          <table>
            <th>Name</th>
            <th>Price</th>
          </table>
        </div>
        <table>
          < Menu unavailAllow = {unavailAllow} searchWord ={searchWord}/>
        </table>
      </div>
    </>
  )
}

export default App
