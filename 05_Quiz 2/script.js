document.addEventListener('DOMContentLoaded', () => {

    const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        question: "Who wrote 'Hamlet'?",
        choices: [
          "Charles Dickens",
          "Jane Austen",
          "William Shakespeare",
          "Mark Twain",
        ],
        answer: "William Shakespeare",
      },
    ];
    
    const startBtn = document.getElementById('start-btn')
    const NextBtn = document.getElementById('next-btn')
    const restartBtn = document.getElementById('restart-btn')
    const questionContainer = document.getElementById('question-container')
    const questionText = document.getElementById('question-text')
    const choicesList = document.getElementById('choices-list')
    const resultContainer = document.getElementById('result-container')
    const scoreDisplay = document.getElementById('score')
    
  
    let currentQuestionIndex = 0;
    let score = 0;
  
    startBtn.addEventListener('click', startQuiz)
  
    NextBtn.addEventListener('click', nextQuestion)
  
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
  
      startBtn.classList.add('hidden')
      questionContainer.classList.remove('hidden')
  
      showQuestion()
      showOptions()
      
    }
  
    function showQuestion() {
      NextBtn.classList.add('hidden')
      questionText.textContent = questions[currentQuestionIndex].question
    }
  
    function showOptions() {
       choicesList.innerText = ''
       const options = (questions[currentQuestionIndex].choices)
       console.log(options);
      
       options.forEach((option) => {
            const choice = document.createElement('li')
            choice.innerText = option
            choicesList.appendChild(choice)
            choice.addEventListener('click', (e) => {
                  // Pass the selected option to handleAnswer
                  handleAnswer(option);
                console.log(choice);
                
                
                const allChoices = document.querySelectorAll('li')
                allChoices.forEach((e) => {
                    e.style.backgroundColor = ''
                    
                })
                choice.style.backgroundColor = '#6200ea';
            });
       })
    
    //    choicesList.addEventListener('click', (e) => {
    //         if (e.target.tagName === 'LI') {
    //             handleAnswer()
    //         }
            
       
     

    }
  
      
  
      function handleAnswer(choice) {
          NextBtn.classList.remove('hidden')
          console.log(score);
          
          if(questions[currentQuestionIndex].answer === choice){ 
              if(currentQuestionIndex < questions.length){
                  score++;
              }else{
                  showresult()
              }
          }
      }
  
      function nextQuestion() {
              currentQuestionIndex++
          if(currentQuestionIndex >= questions.length){
              showresult()
          }
          showQuestion()
          showOptions()
      }
  
      
  
      function showresult() {
          
          questionContainer.classList.add('hidden')
          choicesList.classList.add('hidden')
          resultContainer.classList.remove('hidden')          
          scoreDisplay.innerText = score
              
      }
  
      function restart() {
        currentQuestionIndex = 0;
        score = 0;
        startBtn.classList.remove('hidden')
        resultContainer.classList.add('hidden')    
        choicesList.classList.remove('hidden')

      }
  
      restartBtn.addEventListener('click',restart)
  
      
  })