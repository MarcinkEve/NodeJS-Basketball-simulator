const play = () => {
  fetch("http://localhost:3001/checkscore")
    .then((response) => response.json())
    .then((jsonObjektas) => {
      //console.log("checkscore", jsonObjektas);
      //console.log(jsonObjektas.kelinys);

      document.querySelector(".f-scores").style.color = "#fff";
      document.querySelector(".s-scores").style.color = "#fff";

      document.querySelector(".f-scores").innerHTML =
        jsonObjektas.rezultatas.komanda1;
      document.querySelector(".s-scores").innerHTML =
        jsonObjektas.rezultatas.komanda2;
      //document.querySelector(".one").innerHTML = `<img class="logo one" src="${jsonObjektas.obj.logo.flogo}" alt="logo">`;
      //document.querySelector(".two").innerHTML = `<img class="logo two" src="${jsonObjektas.obj.logo.slogo}" alt="logo">`;

      if (jsonObjektas.komanda1 === jsonObjektas.rezultatas.komanda2) {
        document.querySelector(".f-scores").style.color = "#fff";
        document.querySelector(".s-scores").style.color = "#fff";
      } else if (jsonObjektas.komanda1 > jsonObjektas.rezultatas.komanda2) {
        document.querySelector(".f-scores").style.color = "#00F2A7";
      } else {
        document.querySelector(".s-scores").style.color = "#00F2A7";
      }

      if (jsonObjektas.rezultatas.kelinys === 1) {
        document.querySelector(
          ".match-stage"
        ).innerHTML = `${jsonObjektas.rezultatas.kelinys}st quarter`;
      } else if (jsonObjektas.rezultatas.kelinys === 2) {
        document.querySelector(
          ".match-stage"
        ).innerHTML = `${jsonObjektas.rezultatas.kelinys}nd quarter`;
      } else if (jsonObjektas.rezultatas.kelinys === 3) {
        document.querySelector(
          ".match-stage"
        ).innerHTML = `${jsonObjektas.rezultatas.kelinys}rd quarter`;
      } else if (jsonObjektas.rezultatas.kelinys === 4) {
        document.querySelector(
          ".match-stage"
        ).innerHTML = `${jsonObjektas.rezultatas.kelinys}th quarter`;
      }
      //console.log(jsonObjektas.quarter);
    });

  //console.log('test Zodis')
  setTimeout(() => {
    play();
  }, 6000);
};
play();

document.querySelector(".button").addEventListener("click", () => {
  //console.log('clicked')  //spaudziam mygtuka narsyklej ir patikrinam konsolej, ar pajungtas eventListener
  play();
});

document.querySelector(".renew").style.display = "none";
document.querySelector(".one").style.display = "none";
document.querySelector(".two").style.display = "none";
document.querySelector(".match-stage").style.display = "none";
document.querySelector(".scores").style.display = "none";

document.querySelector(".start-match").addEventListener("click", () => {
  //console.log("test");
  //if (document.querySelector("#naujas-macas").style.display === "none") {
  document.querySelector("#naujas-macas").style.display = "block";
  // } else {
  //   document.querySelector("#naujas-macas").style.display = "none";
  //}

  document.querySelector('#naujas-macas input[name="round"]').value = "";
  document.querySelector('#naujas-macas input[name="date"]').value = "";
  document.querySelector('#naujas-macas select[name="location"]').value = "";
  document.querySelector('#naujas-macas input[name="time"]').value = "";
  document.querySelector('#naujas-macas select[name="team-1"]').value = "";
  document.querySelector('#naujas-macas select[name="team-2"]').value = "";
  document.querySelector(".renew").innerHTML = "";
  document.querySelector(".round").innerText = "";
  document.querySelector(".date").innerHTML = "";
  document.querySelector(".stadium").innerHTML = "";
  document.querySelector(".time").innerHTML = "";
  document.querySelector(".bottom").style.display = "none";
});

document.querySelector("#run-match").addEventListener("click", (event) => {
  if (document.querySelector("#naujas-macas").style.display === "block") {
    document.querySelector("#naujas-macas").style.display = "none";
  } else {
    document.querySelector("#naujas-macas").style.display = "display";
  }

  event.preventDefault(); //skirtas sustabdyti standartini HTML elementu veikima

  let round = document.querySelector('#naujas-macas input[name="round"]').value; //paimama ivesta i input reiksme
  document.querySelector('#naujas-macas input[name="round"]').value = ""; //padarom tuscias reiksmes, kad paspaudus mygtuka "SEARCH" visos input reiksmes "nusinulintu'
  let date = document.querySelector('#naujas-macas input[name="date"]').value;
  document.querySelector('#naujas-macas input[name="date"]').value = "";
  let loc = document.querySelector('#naujas-macas select[name="location"]').value;
  document.querySelector('#naujas-macas select[name="location"]').value = "";
  let time = document.querySelector('#naujas-macas input[name="time"]').value;
  document.querySelector('#naujas-macas input[name="time"]').value = "";
  let team1 = document.querySelector('#naujas-macas select[name="team-1"]').value;
  document.querySelector('#naujas-macas select[name="team-1"]').value = "";
  let team2 = document.querySelector('#naujas-macas select[name="team-2"]').value;
  document.querySelector('#naujas-macas select[name="team-2"]').value = "";

  fetch("http://localhost:3001/post-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if(resp.pavyko) {
        //console.log("resp", resp);
      
        document.querySelector(".round").innerText = `Round ${round}`;
        document.querySelector(".date").innerHTML = date;
        document.querySelector(".stadium").innerHTML = loc;
        document.querySelector(".time").innerHTML = time;

        if (team1 === "Olympiacos Piraeus") {
          document.querySelector(".one").innerHTML = `<img class="logo" src="${resp.obj.logo.flogo}" alt="logo">`;
          document.querySelector(".two").innerHTML = `<img class="logo" src="${resp.obj.logo.slogo}" alt="logo">`;
        } else {
          document.querySelector(".two").innerHTML = `<img class="logo" src="${resp.obj.logo.flogo}" alt="logo">`;
          document.querySelector(".one").innerHTML = `<img class="logo" src="${resp.obj.logo.slogo}" alt="logo">`;
        }

        document.querySelector(".first").innerHTML = team1;
        document.querySelector(".second").innerHTML = team2;

        document.querySelector(".bottom").style.display = "flex";
        document.querySelector(".renew").style.display = "none";
        document.querySelector(".one").style.display = "block";
        document.querySelector(".two").style.display = "block";
        document.querySelector(".match-stage").style.display = "block";
        document.querySelector(".scores").style.display = "flex";
        document.querySelector(".message").style.display = "none";

      } else {
        document.querySelector(".message").innerHTML = `<h1>${resp.message}`;
        document.querySelector(".top-line").style.display = "none";  
        document.querySelector(".run-match").style.display = "display";

      }
    
    });
});
