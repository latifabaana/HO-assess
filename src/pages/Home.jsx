import React, { useEffect, useState } from "react";
import Meal from "../components/Meal";
import "../CSS/Home.css"
import useApp from "../context/context";
// import MoreInfo from "../components/MoreInfo";
import Nav from "../components/Nav";


function Home(){

    const [search, setSearch] = useState("")
    const [meals, setMeals] = useState([])
    const {dataSet} = useApp()

    useEffect(()=>{
        console.log(meals)
    },[meals])


    function handleChange(e){
        setSearch(e.target.value)
    }

    function getMeals(e){
        if (e.key == "Enter"){
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
            .then(res=> res.json())
            .then(data=>{
                console.log(data.meals)
                setMeals(data.meals)
            })
            .catch(
                setMeals(null)
            );
        }
    }

    function sortAscending () {
        // sort the names in ass
        let result = meals.sort((a,b) => a.strMeal.localeCompare(b.strMeal))
        setMeals([...result])
        console.log(result)
    }

    function sortDescending() {
        // sort the names in ass
        let result = meals.sort((a,b) => b.strMeal.localeCompare(a.strMeal))
        setMeals([...result])
        console.log(result)
    }

    return(
        <div className="home">
            <Nav link = "/myMeals" name = "my meals"/>
            <h1 id= "title">Find Meals For Your Ingredients</h1>
            <div className="search-input">
                {/* put a search icon in there */}
                <input type = "text" placeholder = "Search an Ingredient" onChange = {handleChange} onKeyUp = {getMeals}></input>
            </div>

            

            {meals && meals.length>0 && <h1 id = "all-recipes-title">All Recipes</h1>}
            {meals && meals.length>0 && (
                <div>
                    <button onClick= {sortAscending}>Ascending</button>
                    <button onClick={sortDescending}>Descending</button>
                </div>
            )}
            
            {/* <div className="moreInfo-container">
                <div className = "inside-container">
                    {dataSet == true && <MoreInfo />}
                </div>
            </div> */}
            <div className="container">
                { (meals==null)? <p>no meals with that ingredient, try again...</p> : meals.map((meal)=>{
                    return(
                        <div id="meal" key = {meal.idMeal}>
                            <Meal meal = {meal}/>
                        </div>
                    )
                })} 
            </div>

        </div>

    )
}

export default Home