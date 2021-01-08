import { useContext } from 'react';
import { GlobalContext } from '../App';

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
