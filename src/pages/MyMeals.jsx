import React, { useEffect, useState } from "react";
import axios from 'axios'

import useApp from "../context/context";
import Nav from "../components/Nav";
import "../CSS/myMeal.css"

import { useUpdateMeals } from "../utils/helperFunctions";

function MyMeals(){
    const {user, myMeals, setMyMeals} = useApp()
    const {removeMeal} = useUpdateMeals();
    const [originalMealButton, setOriginalMealButton] = useState(false)
    const [originalMeals, setOriginalMeals] = useState([])
    const[meal, setMeal] = useState({})
    const [file, setFile] = useState({})


    useEffect(()=>{
        // const meals = localStorage.getItem('myMeals')
        // setMyMeals(meals)
    }, [])

    useEffect(()=>{
        console.log(myMeals)
    }, [myMeals])

    const addToMyMeals = async (meal) => {
        setMyMeals(prevMyMeals => prevMyMeals.concat(meal))
        // call the api to send data to django 

    }

    const handleNameChange =(e)=> {
        e.preventDefault()
        const {name, value} = e.target
        console.log(value)
        setMeal(meal=> ({
            ...meal,
            [name] : value
        }))
    
    }
    const handleFileChange = (e) => {
        // console.log(e.target.files[0].name)
        setFile(file=> ({
            ...file,
            "image_url" : e.target.files[0].name,
            'file' : e.target.files[0]
        }))
    }

     // On file upload (click the upload button)
     const onFileUpload = () => {
 
        // Create an object of formData
        const formData = new FormData();
 
        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
 
        // Details of the uploaded file
        console.log(this.state.selectedFile);
 
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };
 

    return(
        <div className = "myMeals">
            <Nav link = "/" name = "Search"/>
            <h1 id = "title">My Meals</h1>
            {myMeals.length == 0 && <h1 id = "no-meals-message">You have not added any meals yet...</h1>}
            {/* add own meal here */}
            <button onClick = {() => setOriginalMealButton(!originalMealButton)}> + add your own original meal</button>
            {originalMealButton && (
                <div>
                    <form>
                        <input value = {meal.name} type = "text" name = "strMeal" placeholder="name" onChange={handleNameChange}></input> 
                        <br></br>
                        {/* picture */}
                        <input name = "image_url" type="file" onChange={handleFileChange}/>
                        <button>submit</button>
                    </form>
                </div>
            )}

            <div className="container">
                {myMeals && myMeals.map((meal) => {
                    return(
                        <div id = "eachMeal" key = {meal.idMeal}>
                            <div className="Meal">
                                <div className="pic">
                                    <img src = {meal.strMealThumb}></img>
                                </div>
                                <div className="title">
                                    <h1>{meal.strMeal}</h1>
                                </div>

                                <div className="cap">
                                    <button onClick={() => removeMeal(meal, meal.idMeal)} >remove from my meals</button>

                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>

        

    )
}

export default MyMeals