/* Global Variables */
let zipcode = null;
let feelings = "";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";  // zip=94040,us
const apiKey = "&appid=8e9ebf06026c35df6438d11c7015ff23&units=imperial";
const genBtn = document.querySelector("#generate");
let updatingDiv = document.querySelector("#entryHolder");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// API GET Request Function
const getWeather = async (baseURL, zipcode, key) => {
  const res = await fetch(baseURL + zipcode + key);
  try {
    const data = await res.json();
    return data.main.temp;
  } catch (error) {
    console.log("error", error);
  }
};

// Server POST Request Function
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// GET Request Then Updating Page
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();

    // Updaing the Entry Div
    document.querySelector(
      "#entryHolder #date"
    ).innerHTML = `date: ${allData.date}`;

    document.querySelector(
      "#entryHolder #temp"
    ).innerHTML = `temp: ${allData.temperature}`;

    document.querySelector(
      "#entryHolder #content"
    ).innerHTML = `content: ${allData.userResponse}`;
    
  } catch (error) {
    console.log("error", error);
  }
};

// Chaining Requests
genBtn.addEventListener("click", function (e) {
  e.preventDefault();
  zipcode = document.querySelector('#zip').value;
  // zipcode = "94040,us";
  feelings = document.querySelector("#feelings").value;
  getWeather(baseURL, zipcode, apiKey)
    .then(function (data) {
      postData("/newEntry", {
        temperature: data,
        date: newDate,
        userResponse: feelings
      }).then(updateUI());
    });
});
