// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/
const btnAlert = document.querySelector(".alert-btn");
const hands = [...document.querySelectorAll(".select img")];
const divAlert = document.querySelector(".alert");

const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0px 0px 20px 0px white";
}
function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}
function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "nożyczki" && ai === "kamień") ||
    (player === "kamień" && ai === "papier") ||
    (player === "papier" && ai === "nożyczki")
  ) {
    return "loss";
  } else {
    return "win";
  }
}
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "draw") {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "REMIS";
    document.querySelector('[data-summary="who-win"]').style.color = "black";
  } else if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "WYGRAŁEŚ";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "PRZEGRAŁEŚ";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  }
}

function startGame() {
  if (!game.playerHand) return showAlert();
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  game.playerHand = "";
  hands.forEach((hand) => (hand.style.boxShadow = ""));
}

btnAlert.addEventListener("click", () => {
  console.log("działa");
  divAlert.classList.remove("show");
});
function showAlert() {
  divAlert.classList.add("show");
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
