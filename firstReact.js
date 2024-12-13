import './App.css';
import { useState } from 'react';

function Btn({count,onClick}){

    //const [count, setCount] = useState(1);
  return(
    <button onClick={onClick}>Przycisk</button>
  );
}

function Hider({onClick,countHide}){
  var text = "ukryj";

  if(countHide % 2 === 0) text = "ukryj";
  else text = "pokaż";

  return(
    <button onClick={onClick}>{text}</button>
  );
};


function ImageS({flaged}){
  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };

  if(flaged % 2 === 0) return( 
    <img
    className="avatar"
    src={user.imageUrl}
    alt ={"img"}
    />
  ); else return null;

 
};

function List(){
  const products = [
    { title: 'Rózga', goodLvl: 0 , id: 1 },
    { title: 'Ubranie', goodLvl: 1 , id: 2 },
    { title: 'Super prezent', goodLvl: 2, id: 3 },
  ];

  const itlist = products.map(product => 
    <li key = {product.id}
      style = {{
        color: product.goodLvl === 2 ? 'green' : 'red'
      }}
    >
      {product.title}
    </li>
  );

  return(
    <ul>{itlist}</ul>
  );
};

function App() {
  const [count, setCount] = useState(1);
  const [countHide, setCountHide] = useState(0);

  function handleClick(){
    alert(count);
    setCount(count +1);
  };

  function handleClickHide() {
    setCountHide(countHide + 1);
  }

  return (
    <>
    <ImageS flaged={countHide}></ImageS>
    <br></br>
    <Btn count={count} onClick={handleClick}/>
    <Btn count={count} onClick={handleClick}/>
    <List></List>
    <Hider countHide={countHide} onClick={handleClickHide} />
    </>
  );
}

export default App;
