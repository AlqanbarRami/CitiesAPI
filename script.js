// Main div will appem every other div
const MainContianer = document.createElement("div");

//I need all id just for css 
MainContianer.id = "MainContianer";

//Create button and div for Cities I visited
const citiesVisitedbutton = document.createElement("button");
citiesVisitedbutton.id ="citiesVisitedbutton";
const citiesDiv = document.createElement("div");
citiesDiv.id = "citiesDiv";




//Get the data from land 
const getLand = async()=>{
    const response = await fetch("land.json");
    const landData = await response.json();
    return landData;
    };

//Get the data from stad 
    const getStad = async()=>{
        const response = await fetch("stad.json");
        const StadData = await response.json();
        return StadData;
        };
        

        // this function will work whenever we open the page
        const showCountry = async() =>{
        //receiving data
        const myLandData = await getLand();
        const myStadData = await getStad();

        //this loop will take the first country and append it
        //and then go to the second loop and search for the matching cities
        for(i=0; i<myLandData.length; i++){
        //create the button some take the country name
        const countryButton =  document.createElement("button");
        //just for css
        countryButton.id = "countryButton";
        // create the div some appen the button
        const countryDiv=  document.createElement("div");
        //just for CSS
        countryDiv.id = "countryDiv"
        // save the id in button value . I need it later
        countryButton.value = myLandData[i].id;

        countryButton.innerHTML = myLandData[i].countryname;
        countryDiv.append(countryButton);
        citiesVisitedbutton.innerHTML = "Cities I visited";

        //append them inside main div
        MainContianer.append(countryDiv,citiesVisitedbutton);
        
        // Now the second loop inside the first one ( nested loop) 
        for(j=0; j<myStadData.length;j++){

            // create first ul
            const myUl = document.createElement("ul");
            //id for Css
            myUl.id="myUl"
            // To hide and show on click
            myUl.style.display = "none";
            //create li some take the city name
            const myLi = document.createElement("li");
            //create another unorder list some take 2 list for population and facts 
            const myUlInfo = document.createElement("ul");
            //Css id 
            myUlInfo.id = "myUlInfo";
            myLi.id = "myLi";
            // To hide and show on click
            myUlInfo.style.display="none";
            // population and facts 
            const myLiInfo1 = document.createElement("li");
            const myLiInfo2 = document.createElement("li");
            //button for select the city that I visited
            const buttonVisited = document.createElement("button");
            buttonVisited.id = "buttonVisited";
            buttonVisited.innerHTML = "Visited";

            //Now we need to pass this condition to append and write our city info
            if(countryButton.value == myStadData[j].countryid){  // if ok!
                    // I will save the id inside li value , I need it later inside another function
                    myLi.value = myStadData[j].id;
                    //write city name and appen to ul
                    myLi.innerHTML = myStadData[j].stadname;
                    myUl.append(myLi);
            //write some facts about city and Population if I pass again and append them
            if(myLi.value == myStadData[j].id){
                myLiInfo1.innerHTML = "Population : " + myStadData[j].population;
                myLiInfo2.innerHTML = "Facts : " + "Some Facts!";
                myUlInfo.append(myLiInfo1,myLiInfo2,buttonVisited);
                myLi.append(myUlInfo);
            }

            // add to localStorage 
            buttonVisited.addEventListener("click", function(){
                // object with city id 
                var myVistiesId ={id:myLi.value};
                // get the key and value before setting and add array []  
                var addToLocalStorage = JSON.parse(localStorage.getItem("citiesId")) || [];
                // push our object inside []
                addToLocalStorage.push(myVistiesId);
                // save it to LocalStorage and make it string
                localStorage.setItem("citiesId", JSON.stringify(addToLocalStorage));                           
            })
            countryDiv.append(myUl);
        }

        // hide and show for city .. show info about city 
        myLi.addEventListener("click", function(){
            if(myUlInfo.style.display == "none"){
                myUlInfo.style.display = "block";
            }
            else{
                myUlInfo.style.display = "none";
            }
        })

        //hide and show for country .. show cities 
        countryButton.addEventListener("click", function(){
            if(myUl.style.display == "none"){
                myUl.style.display = "block";
            }
            else{
                myUl.style.display = "none";
            }        
        })
        }            
        }
        document.body.appendChild(MainContianer);    
    }
    
        
    // Show me the cities that I visited
         citiesVisitedbutton.addEventListener("click", async () =>{
             //Clearing div at start , to update info if there is a new city 
            citiesDiv.innerHTML = "";
            //Array for Population count
            const array = [];
            let sumOfArray = 0;
            // receiving data again 
            const myStadData = await getStad();
            // get the cities id from localStorage
            const myObjectFromStorage = localStorage.getItem("citiesId");
            //object again
            const changeMyObjects = JSON.parse(myObjectFromStorage);
            //Nested loop depending on length
            for(i = 0 ; i <changeMyObjects.length ; i++){ // length localStorage
                for(j = 0; j<myStadData.length; j++){  // length data from stad.json
                    // if we find a similar id 
                    if(changeMyObjects[i].id == myStadData[j].id ){ // yes
            
                        // add and append the info
                        const citiesUl = document.createElement("ul");
                        const citiesIl = document.createElement("li");
                        citiesUl.innerHTML = myStadData[j].stadname;
                        citiesIl.innerHTML = "Population in this City : " + myStadData[j].population + " Persons";
                        array.push(myStadData[j].population);
                        citiesUl.append(citiesIl);
                        citiesDiv.append(citiesUl);
                        MainContianer.append(citiesDiv)
                    
                    }
                }
            }
             // population count
            for (let i = 0; i < array.length; i++) {
                sumOfArray += array[i];
            }   
            //Clearing button with function 
        const clearingButton = document.createElement("button");
        clearingButton.id = "clearingButton"; 
        clearingButton.innerHTML = "Clear my list"
        clearingButton.addEventListener("click", function(){
            localStorage.clear();
            citiesDiv.innerHTML =""; // To clear the Div too 
            citiesDiv.remove(); // Remove it 
        
        })
        // adding meeting info 
        const totalMeetings = document.createElement("span");
        totalMeetings.id = "totalMeetings"
        totalMeetings.innerHTML = "Total number of people that you may had met : " + sumOfArray + "<br>";
        citiesDiv.append(totalMeetings);
        citiesDiv.append(clearingButton);
        MainContianer.append(citiesDiv);
       
         
        });
    
   
   
       showCountry();
    
  