import './App.css';
import { useState } from 'react';
import _0 from './0.png';
import _1 from './1.png';
import _2 from './2.png';
import _3 from './3.png';
import _4 from './4.png';
import _5 from './5.png';
import _6 from './6.png';

const sources = [_0,_1,_2,_3,_4,_5,_6];// deklaracja tabeli ze źródłami zdjęć dzieki temu omijamy dużo if-ów

function Kostka({num}){
  return(<img style={{border: 5,borderRadius: 2}} alt={num} src={sources[num]}/>)// deklaracja obiektu kostek
};

function Roll({onclick}){
  return(<button className='btn' onClick={onclick}>RZUĆ KOŚĆMI</button>);// deklaracja przycisku do rzucania kośćmi
};

function App({numOfDice}) { // deklaracja gry

  numOfDice = Number(numOfDice);      // zmiana typu danych ze string na number + nadpisanie wcześniejszej zmiennej
  const dispDices = [];               // stworzenie tablicy w którą włożymy kostki
  const [dices, setDices] = useState(Array(numOfDice).fill(0))      // tworzenie array który zapisuje wartości kostek
  for(var i = 0; i < numOfDice ; i++) dispDices.push(<Kostka num={dices[i]} key={i}></Kostka>);     // uzupelnianie tablicy z kostkami dispDices
  const [score, setScore] = useState(0);    // stworzenie zmiennej która pozwala na zpisywanie wyniyku rundy
  const [scoreGame, setScoreGame] = useState(0);  // stworzenie zmiennej która pozwala na zpisywanie wyniyku gry

  function clicked(){ // stworzenie funckji która sprawdza wynik i losuje kości
    var i = 0;
    var sum = 0;
    var j = 1;
    const nums = Array(6).fill(0);
    const randed = dices.slice();
    randed.forEach(() => {      // uzupełnienie tabeli randed która jest klonem tabeli dices
      randed[i] = Math.floor(Math.random()* 6+1);
      i++;
    });                         
    randed.forEach((element)=>{// przypisanie w tabeli nums odpowiedniej liczby odpowiadajacej ilosci wystapien danej kostki
      nums[element-1] = nums[element-1] + 1;
    });
    nums.forEach((element) => {// sprawdzenie ktore kosti sie powtrzaly i zapisanie wyniku w zmiennej sum
      if(element >= 2) sum += element*j;
      j++;
    });
    setScoreGame(scoreGame + sum);  // ustawnianie wynikow
    setScore(sum);
    setDices(randed);
  };

  const reloadPage = () => {window.location.reload()}; // funckja odświeżająca strone
 

  return (
    <div className="App">
      <h1>Kości</h1>
      
      <div className='split'></div>
      
      <div className='line'>Gra w kości. Autor. 00000000000</div>
  
      <Roll onclick={clicked}></Roll>
      
      <div>
        {dispDices}
      </div>  

      <p>wynik tego losowania</p>

      <p>{score}</p>
 
      <p>wynik gry</p>

      <p>{scoreGame}</p>
      <button className='btn' onClick={reloadPage}>RESETUJ WYNIK</button>
    </div>
  );
}

function Input({clicked}){// Element odpowiadajacy za start gry i podanie liczby kości
  return(<>
  <div className='input'>
    <input type="number" id="amount" min="1" max="10"></input>
    <button onClick={clicked}>Zaczynajmy!</button>
  </div>
  </>)
};

export default function Window(){   // głowny prop
  const [numOfDices, setNumOfDices] = useState(0);// stworzenie wartosci usestate numofdices

  function render(){
    setNumOfDices(document.getElementById('amount').value)    // pobranie wartości z pola o id amount
  };

  if(numOfDices === 0){ // wyrazenie logiczne odpowiadajace za wyswietlenie odpowiednmiego elementu
    return(<Input clicked={render}></Input>)
  }else if(numOfDices >= 1){
    return(<App numOfDice={numOfDices}></App>);
  };

};
