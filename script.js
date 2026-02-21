/* ================= QUIZ DATA ================= */
const quizData = [
  {
    category: "Programming",
    questions: [
      { question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark Language","Home Tool Markup Language"],
        answer: "Hyper Text Markup Language" },
      { question: "Which is a JavaScript framework?",
        options: ["React","Laravel","Django","Flask"],
        answer: "React" }
    ]
  },
  {
    category: "General Tech",
    questions: [
      { question: "Who founded Microsoft?",
        options: ["Bill Gates","Steve Jobs","Elon Musk","Mark Zuckerberg"],
        answer: "Bill Gates" },
      { question: "1 Byte = ?",
        options: ["8 bits","16 bits","4 bits","2 bits"],
        answer: "8 bits" }
    ]
  }
];

let currentQuiz=[],currentIndex=0,score=0,timerInterval,timeLeft=15;

/* ===== Initialize Categories ===== */
const categorySelect=document.getElementById("categorySelect");
quizData.forEach((quiz,i)=>{
  let option=document.createElement("option");
  option.value=i;
  option.textContent=quiz.category;
  categorySelect.appendChild(option);
});

/* ===== Start Quiz ===== */
function startQuiz(){
  currentQuiz=quizData[categorySelect.value].questions;
  currentIndex=0;
  score=0;
  document.getElementById("category-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  loadQuestion();
}

/* ===== Load Question ===== */
function loadQuestion(){
  resetTimer();
  let q=currentQuiz[currentIndex];
  document.getElementById("question").textContent=q.question;
  document.getElementById("progressText").textContent=`Question ${currentIndex+1}/${currentQuiz.length}`;
  document.getElementById("progressBar").style.width=((currentIndex)/currentQuiz.length)*100+"%";

  let answers=document.getElementById("answers");
  answers.innerHTML="";
  q.options.forEach(opt=>{
    let btn=document.createElement("button");
    btn.textContent=opt;
    btn.onclick=()=>selectAnswer(opt);
    answers.appendChild(btn);
  });
  startTimer();
}

/* ===== Timer ===== */
function startTimer(){
  timeLeft=15;
  document.getElementById("timer").textContent=`⏳ ${timeLeft}s`;
  timerInterval=setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").textContent=`⏳ ${timeLeft}s`;
    if(timeLeft<=0){
      clearInterval(timerInterval);
      nextQuestion();
    }
  },1000);
}
function resetTimer(){ clearInterval(timerInterval); }

/* ===== Answer ===== */
function selectAnswer(selected){
  if(selected===currentQuiz[currentIndex].answer) score++;
  nextQuestion();
}

/* ===== Next Question ===== */
function nextQuestion(){
  currentIndex++;
  if(currentIndex<currentQuiz.length) loadQuestion();
  else endQuiz();
}

/* ===== End Quiz ===== */
function endQuiz(){
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
  document.getElementById("scoreText").textContent=`Score: ${score}/${currentQuiz.length}`;
  loadLeaderboard();
}

/* ===== Leaderboard ===== */
function saveScore(){
  let name=document.getElementById("username").value;
  if(!name) return alert("Enter team name!");
  let board=JSON.parse(localStorage.getItem("leaderboard"))||[];
  board.push({name,score});
  board.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard",JSON.stringify(board));
  loadLeaderboard();
}
function loadLeaderboard(){
  let board=JSON.parse(localStorage.getItem("leaderboard"))||[];
  let list=document.getElementById("leaderboard");
  list.innerHTML="";
  board.slice(0,5).forEach(entry=>{
    let li=document.createElement("li");
    li.textContent=`${entry.name} - ${entry.score}`;
    list.appendChild(li);
  });
}
function restartQuiz(){ location.reload(); }

/* ===== Theme Toggle ===== */
document.getElementById("toggleTheme").onclick=()=>{
  document.body.classList.toggle("light");
};

/* ===== 3D PARTICLE BACKGROUND ===== */
const canvas=document.getElementById("bgCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.dx=(Math.random()-0.5)*1;
    this.dy=(Math.random()-0.5)*1;
    this.radius=2;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle="#00f5ff";
    ctx.fill();
  }
  update(){
    this.x+=this.dx;
    this.y+=this.dy;
    if(this.x<0||this.x>canvas.width) this.dx*=-1;
    if(this.y<0||this.y>canvas.height) this.dy*=-1;
    this.draw();
  }
}

function initParticles(){
  particles=[];
  for(let i=0;i<80;i++) particles.push(new Particle());
}

function connect(){
  for(let a=0;a<particles.length;a++){
    for(let b=a;b<particles.length;b++){
      let dx=particles[a].x-particles[b].x;
      let dy=particles[a].y-particles[b].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.strokeStyle="rgba(0,245,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>p.update());
  connect();
  requestAnimationFrame(animate);
}

window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  initParticles();
});

initParticles();
animate();