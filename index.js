import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


let quix = [
  {country:"France", capital: "Paris"},
  {country:"United Kingdom", capital: "London"},
  {country:"United States of America", capital: "New York"},  
];


let totalCorrect = 0;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// so we can link into html and code
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
                          // Send the generative quest here
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  //                             👇🏼 trim to get rid of spaces user wrote
  let answer = req.body.answer.trim();
  let isCorrect = false;
      // Check to see if the capital they enter = Capital in the CurrentQuestion
                              // to lower their case to macth data
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    // Increase score
    totalCorrect++;
    // log total score
    console.log(totalCorrect);
    // set boolean to true
    isCorrect = true;
  }

  // Rendering this mexy
  nextQuestion();
  res.render("index.ejs", {
    // pulling new pair passing new quest
    question: currentQuestion,
    // prevAnswe
    wasCorrect: isCorrect,
    // Show answer frontEnd
    totalScore: totalCorrect,
  });
});

//----------------------------------------------------------
  // NEXT QUESTION Set to random
function nextQuestion() {
                        // Using randomization method to get hold of random object
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  // Set this to use and sent app.get
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
