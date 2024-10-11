import React from 'react'
import Realranavbar from './Realranavbar'
import { raNavLinks} from '../../constants';
import useSticky from './useSticky';
const Ranavbar = () => {
  const { isSticky, element } = useSticky()
  return (
   <Realranavbar navLinks={raNavLinks} sticky={isSticky}/>
  )
}

export default Ranavbar