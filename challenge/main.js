/* --------------------------- to draw the canvas --------------------------- */
function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}

let jet = document.getElementById("jet");
let board = document.getElementById("board");

addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 20 + "px";
  }
  /* -------------------- 460  =>  board width - jet width -------------------- */
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 20 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
  /* --------------------------- 32 is for space key -------------------------- */
    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    let movebullet = setInterval(() => {
      let rocks = document.getElementsByClassName("rocks");

      for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        if (rock != undefined) {
          let rockbound = rock.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();

  /*Condition to check whether the rock/alien and the bullet are at the same position..!*/
  /*                 If so,then we have to destroy that rock                            */

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Just removing that particular rock;
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

let generaterocks = setInterval(() => {
  let rock = document.createElement("div");
  rock.classList.add("rocks");
  /* --- Just getting the left of the rock to place it in random position... -- */
  let rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  /* -- generate value between 0 to 450 where 450 => board width - rock width - */
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);
}, 1000);

let moverocks = setInterval(() => {
  let rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (let i = 0; i < rocks.length; i++) {

  /* -- Now I have to increase the top of each rock,so that the rocks can move downwards -*/

      let rock = rocks[i]; //getting each rock
      let rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
 /* ------------------ 475 => boardheight - rockheight + 25 ------------------ */
      if (rocktop >= 365) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 800);