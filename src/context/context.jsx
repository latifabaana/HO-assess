import React, {useState, useEffect, createContext, useContext} from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

  const [dataSet, setDataSet] = useState(false)
  
  const [myMeals, setMyMeals] = useState([])

  const [login, setLogin] = useState({
    'username': '',
    'password': ''
  })

  return (
    <AppContext.Provider value={{ login, setLogin, setDataSet, myMeals, setMyMeals }}>
      {children}
    </AppContext.Provider>
  );

};

  const useApp = () => {
    const context = useContext(AppContext);
  
    if (context === undefined) {
      throw new Error("useTheme must be used within a AppProvider");
    }
    return context;
  };
  
  export default useApp;