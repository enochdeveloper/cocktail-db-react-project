import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import authFetch from './axios/custom'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authFetch(`/search.php?s=${searchTerm}`);
      const data = response.data;
      const {drinks} = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])
  

  return <AppContext.Provider value={{
    loading,
    searchTerm,
    cocktails,
    setSearchTerm,  
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
