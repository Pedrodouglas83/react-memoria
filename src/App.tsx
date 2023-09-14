import { useEffect, useState } from 'react'; 
import * as C from './app.styles'; 
import logoImage from './asset/logo.png'; 
import restartIcon from './svgs/restart.png'; 
import { InfoItem } from './components/infoItem'; 
import { Button } from './components/Button';
import { griditemtype } from './types/griditemtypes';
import { items } from './data/items'; 
import { match } from 'assert';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimesElapsed';


const App = () => {
const [playing, setPlaying] = useState<boolean>(false);
const [timeElapsed, setTimeElapsed] = useState<number>(0);  
const [moveCount, setMoveCount] = useState<number>(0); 
const [showCount, setShownCount] = useState<number>(0);
const [griditems, setGridItems] = useState<griditemtype[]>([]);  

 useEffect(() => resetAndCreateGrid(), []);

 useEffect(() => {
   const timer = setInterval(() => {
   if (playing)  setTimeElapsed(timeElapsed + 1); 
    }, 1000); 
   return () => clearInterval(timer);  
 }, [playing, timeElapsed]);  

 
 //verificar se os abertos sao iguais
 useEffect(()=> {
  if(showCount === 2) {
    let opened = griditems.filter(item => item.shown === true);
    if(opened.length === 2) {    

     
 //v1 - se eles iguais, torna-los permanentes 
 let tmpGrid = [...griditems];    
 if(opened[0].item === opened[1].item)  {
      let tmpGrid = [...griditems]; 
      for(let i in tmpGrid) {
       if(tmpGrid[i].shown) {
          tmpGrid[i].permanentShown = true; 
          tmpGrid[i].shown = false; 
       }        
      }

    setGridItems(tmpGrid); 
    setShownCount(0); 
  
    } else {
      // v2 - se eles nao sao iguais eu vou fechar
      setTimeout(()=> {
      let tmpGrid = [...griditems]; 
     for(let i in tmpGrid) {
       tmpGrid[i].shown = false; 
     } 
     setGridItems(tmpGrid); 
     setShownCount(0); 
     }, 1000);  
    }

    
  setMoveCount(moveCount => moveCount + 1);  
  } 
  }

   }, [showCount, griditems]); 
  
   // verify if game is over 
   useEffect(()=>{
   if(moveCount > 0 && griditems.every(item => item.permanentShown === true)) {
    setPlaying(false);  
   }
   }, [moveCount, griditems]); 

   const resetAndCreateGrid = () => {    
     // passo 1 resetar o jogo 
      setTimeElapsed(0);       
      setMoveCount(0); 
      setShownCount(0); 
          
      // passo 2 resetar o jogo 
      // 2.1 
      let tmpGrid: griditemtype[] = []; 
      for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
    item: null, shown: false, permanentShown: false 
       
    });    
    //2.2 preencher o grid 
    for (let w = 0; w <2; w++) {
    for (let i = 0; i < items.length; i++) {
     let pos = -1; 
     while (pos < 0 || tmpGrid[pos].item !== null) { 
     pos = Math.floor(Math.random() * (items.length * 2)); 
    }
      tmpGrid[pos].item = i; 
     
    }
  }    

    //2.3  jogar no state 
      setGridItems(tmpGrid); 

    // passo 3 - começar o jogo
      setPlaying(true); 
         } 
 
   const handleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2 ) {
    let tmpGrid = [...griditems]; 
   
   if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
   tmpGrid[index].shown = true; 
   setShownCount(showCount + 1); 

   }
    setGridItems(tmpGrid);     
    } 
    }

return (
<C.Container>
<C.info>
 <C.LogoLink href="">
  <img src={logoImage} width="200"  alt="" />
  </C.LogoLink>
  
  <C.infoArea>
        
    <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} /> 
    <InfoItem label='Movimentos' value={moveCount.toString()} /> 
  </C.infoArea>
  
<Button label="Reiniciar" icon={restartIcon} onClick={resetAndCreateGrid}/>

</C.info>
<C.GridArea>
  <C.Grid>
   {griditems.map((item, index)=>(
    <GridItem
     key={index}
      item={item}
      onClick={() => handleItemClick(index)} 
      />
      ))}

 </C.Grid>  
 </C.GridArea> 
 
</C.Container>
);  

}

export default App;   