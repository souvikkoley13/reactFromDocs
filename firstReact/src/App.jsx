import { useState } from 'react'
import './App.css'

function MyButton({count, onClick}){

  function Clicked(){
    alert("clicked");
  }
  
  return(
    <>
      <button className='Button' onClick={Clicked}>This is a button</button>
      <button className='Button' onClick={onClick}>click</button>
      clicked {count} times
    </>
    
  )
}


const owner = {
  name: 'The Souvik Koley',
  age: 1500,
  id: 'sorceror_koley',
  imgPath: '/src/assets/mrBean.jpeg'
};

const basket = [
  {title : 'Kiwi', isFruit: true, id: 1 },
  {title : 'Mango', isFruit: true, id: 2 },
  {title : 'Cabbage', isFruit: false, id: 3 }
];

function ShoppingList(){
  const list = basket.map(
    item => 
      <li
      key={item.id}
      style={{
        color : item.isFruit? 'green' : 'yellow'
      }}>
        {item.title}
      </li>
    
  )
  return (
    <ul>{list}</ul>
  )

}

function App() {

  const [count, setCount] = useState(0)
  function Count(){
    setCount(count + 1);
  }

  return (
    <>
      <div>
        <h1>Welcome to my app</h1>
        <MyButton count = {count} onClick = {Count}/>
        <MyButton count = {count} onClick = {Count}/>
      </div>
        <ShoppingList />
      <div>
        <h1>Author: {owner.name}</h1>
        <div>
          Id : {owner.id}
        </div>
        <div>
          <img src={owner.imgPath} alt="{owner.name}" />
        </div>
      </div>
    </>
  )
}

export default App
