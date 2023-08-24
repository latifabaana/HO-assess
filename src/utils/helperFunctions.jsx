import axios from 'axios'
import useApp from '../context/context'

export const useUpdateMeals= () => {
    const {user, myMeals, setMyMeals}  = useApp();

    const removeMeal = async(meal, id) => {
        
        console.log(meal)
        const indexOfObject = myMeals.findIndex(object => {
            return object === meal
        })
    
        setMyMeals(prevMyMeals => {
            const tempMeals = [...prevMyMeals]
            tempMeals.splice(indexOfObject, 1)
            return (tempMeals )
        })
    }

    const addMeal = async(data) => {
        setMyMeals(prevMyMeals => prevMyMeals.concat(data.meal))
       
    }

     // return data and updater functions 
     // so they can be accessed in components
     return {
        removeMeal, addMeal
     };
}
