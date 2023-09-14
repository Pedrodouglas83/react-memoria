import { griditemtype } from '../../types/griditemtypes';
import * as C from './styles'; 
import atencao from '../../svgs/atencao.webp'; 
import { items } from '../../data/items';

type Props = {
   item: griditemtype, 
   onClick: () => void

}
export const GridItem = ({ item, onClick }: Props ) => {
   return (      
   <C.Container 
     showBackground={item.permanentShown || item.shown}
     
     onClick={onClick}>
      {item.permanentShown === false && item.shown === false &&    
       <C.Icon src={atencao} alt="" opacity={.1} />
      }
  {(item.permanentShown || item.shown) && item.item !== null &&
     
  <C.Icon src={items[item.item].icon} alt="" />

  }
   </C.Container>
);

} 