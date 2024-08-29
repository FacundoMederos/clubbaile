// Efecto de rastro del mouse
document.addEventListener("mousemove", function (e) {
  const trail = document.createElement("div");
  trail.className = "trail";
  document.body.appendChild(trail);

  // Posicionar el rastro en el lugar del cursor
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;

  // Remover el rastro después de que la animación termine
  trail.addEventListener("animationend", function () {
    trail.remove();
  });
});

// Funcionalidad del botón "Play" y juego de la viborita
document.getElementById("play-button").addEventListener("click", function () {
  document.getElementById("play-button").style.display = "none";
  const canvas = document.getElementById("snake-game");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  // Obtener valores de las variables CSS
  const rootStyles = getComputedStyle(document.documentElement);
  const colorNeonVerde = rootStyles
    .getPropertyValue("--color-neon-verde")
    .trim();
  const colorNeonRosa = rootStyles.getPropertyValue("--color-neon-rosa").trim();

  const box = 10;
  let snake = [{ x: box * 5, y: box * 5 }];
  let food = {
    x: Math.floor((Math.random() * canvas.width) / box) * box,
    y: Math.floor((Math.random() * canvas.height) / box) * box,
  };
  let dir;
  let score = 0;

  document.getElementById("score").textContent = score; // Actualiza el puntaje en la UI
  document.addEventListener("keydown", direction);

  function direction(event) {
    // Prevenir que las flechas muevan la página
    if ([37, 38, 39, 40].includes(event.keyCode)) {
      event.preventDefault();
    }

    if (event.keyCode == 37 && dir != "RIGHT") dir = "LEFT";
    else if (event.keyCode == 38 && dir != "DOWN") dir = "UP";
    else if (event.keyCode == 39 && dir != "LEFT") dir = "RIGHT";
    else if (event.keyCode == 40 && dir != "UP") dir = "DOWN";
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i == 0 ? colorNeonVerde : "#fff";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = colorNeonRosa;
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir == "LEFT") snakeX -= box;
    if (dir == "UP") snakeY -= box;
    if (dir == "RIGHT") snakeX += box;
    if (dir == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      document.getElementById("score").textContent = score; // Actualiza el puntaje en la UI
      food = {
        x: Math.floor((Math.random() * canvas.width) / box) * box,
        y: Math.floor((Math.random() * canvas.height) / box) * box,
      };
    } else {
      snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
      snakeX < 0 ||
      snakeY < 0 ||
      snakeX >= canvas.width ||
      snakeY >= canvas.height ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
      alert(`Game Over! Score: ${score}`);
      document.getElementById("play-button").style.display = "block";
      canvas.style.display = "none";
      snake = [{ x: box * 5, y: box * 5 }];
      dir = null;
      score = 0;
      document.getElementById("score").textContent = score; // Resetea el puntaje en la UI
    }

    snake.unshift(newHead);
  }

  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  let game = setInterval(draw, 100);
});

// Funcionalidad del menú desplegable en móviles
document.getElementById("toggle-menu").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});
