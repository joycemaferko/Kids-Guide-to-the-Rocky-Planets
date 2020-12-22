//Author: Matt Joyce
//Kids' Guide to the Solar System Project

//Set variable for api key
let apiKey = 'aSLymgNsXliifzwZwpBPyZKpriqXmfTwe1z2eF4i';

/* Description: Function to get the most recent Mars temperature data from Nasa's InSight Mars lander*/
function marsWeather(){
    
    let req = new XMLHttpRequest();
    
    //Set URL, set to asynchonous request
    req.open("GET", "https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0", true);
    req.addEventListener('load', function(){
        
        //if status is within this range, request successful.
        if(req.status >= 200 && req.status < 400){
            let response = JSON.parse(req.responseText);
            let sol = response.sol_keys; 
            let intSol = []; 
            console.log(intSol);

            if(intSol.length == 0){
              document.getElementById("resMin").textContent = "Sorry, Data from Nasa currently unavailable. Please check back later!";
            }

            else{
            //convert string numbers to ints IOT compare values
            for(let num of sol){
              intSol.push(parseInt(num)); 
            }
            
            //Get the most recent day for which data is available
            let mostRecent = Math.max.apply(null, intSol); 
            console.log(mostRecent); 
            
            //Set variables for max, min, avg temperatures, rounded to 1 decimal place
            let maxTemp = response[mostRecent].AT.mx.toFixed(1);
            let minTemp = response[mostRecent].AT.mn.toFixed(1);
            let avgTemp = response[mostRecent].AT.av.toFixed(1);
    
            //Set text of HTML elements to our selected data points
            document.getElementById("resMax").textContent = "Max: " + maxTemp + " degrees C"; 
            document.getElementById("resMin").textContent = "Min: " + minTemp + " degrees C"; 
            document.getElementById("resAvg").textContent = "Avg: " + avgTemp + " degrees C"; 
            }
        }
        //there was an error: display relevant error message
        else{
            console.log("Error in network request: " + req.statusText);
        }

    }); 
    req.send(null);
}   

/* Description: Function to post and validate user input for onsite quiz*/
function postIt(){
    let req = new XMLHttpRequest();
    let payload1 = {Q1: null, Q2: null, Q3: null};

    //set variables for correct answers
    let q1CorrectAnswer = "VENUS";
    let q2CorrectAnswer = "MARS";
    let q3CorrectAnswer = "MERCURY"
    
    //get user's answers
    payload1.Q1 = document.getElementById('Q1').value;
    payload1.Q2 = document.getElementById('Q2').value; 
    payload1.Q3 = document.getElementById('Q3').value;
    
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          
          //set variables for selected data points
          let q1Answer = response.json.Q1;
          let q2Answer = response.json.Q2;
          let q3Answer = response.json.Q3;

          //Make answer case insensitive
          q1Answer = q1Answer.toUpperCase(); 
          q2Answer = q2Answer.toUpperCase();
          q3Answer = q3Answer.toUpperCase(); 

          //Set text of HTML elements according to correct/incorrect answers
          if (q1Answer == q1CorrectAnswer){
            document.getElementById("res1").textContent = "Yahoo!! You got it!";
          }
          else{
            document.getElementById("res1").textContent = "Not quite. Try again.";
          }
          if (q2Answer == q2CorrectAnswer){
            document.getElementById("res2").textContent = "Yahoo!! You got it!";
          }
          else{
            document.getElementById("res2").textContent = "Not quite. Try again.";
          }
          if (q3Answer == q3CorrectAnswer){
            document.getElementById("res3").textContent = "Yahoo!! You got it!";
          }
          else{
            document.getElementById("res3").textContent = "Not quite. Try again.";
          }
        } 

        //there was an error: display relevant error message
        else {
          console.log("Error in network request: " + req.statusText);
        }});
    req.send(JSON.stringify(payload1));   
}


//Reference: https://stackoverflow.com/questions/11620698/how-to-trigger-a-file-download-when-clicking-an-html-button-or-javascript
function downLoad(){
    window.location = "SolarSystem.pdf";
}

//Slide show concept learned and code adapted from:
//https://www.w3schools.com/howto/howto_js_slideshow.asp

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); 
} 

document.getElementById("submitWeather").addEventListener('click', marsWeather); 
document.getElementById("submitPost").addEventListener('click', postIt); 
document.getElementById("downloadBtn").addEventListener('click', downLoad); 