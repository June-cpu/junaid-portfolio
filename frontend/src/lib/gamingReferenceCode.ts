// Reference code shown at /teaching/gaming/[lectureId]/code
// Each entry maps a session id → { title, summary, newConcepts, code }

export interface ReferenceDay {
  id: string;
  title: string;
  summary: string;
  newConcepts: string[];
  code: string;
}

export const REFERENCE_CODE: Record<string, ReferenceDay> = {

  day1: {
    id: 'day1',
    title: 'Day 1 — How Games Store Data',
    summary: 'Students write the maze array from their paper design and implement the drawMaze() if/else block. Nothing moves yet — the goal is a maze on screen.',
    newConcepts: [
      'const vs let',
      '2D array: maze[row][col]',
      'Nested for loop (rows × cols)',
      'Pixel conversion: x = col * TILE_SIZE',
      'fill() + rect() + circle()',
    ],
    code: `// ════════════════════════════════════════════════════════════
//  DAY 1 — How Games Store Data
//  Goal: draw a maze on screen using a 2D array
// ════════════════════════════════════════════════════════════

const TILE_SIZE = 20;
const COLS      = 21;
const ROWS      = 21;

const PATH   = 0;
const WALL   = 1;
const PELLET = 2;
const POWER  = 3;

// ── MAZE (students fill this in from their paper design) ─────
let maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,2,2,2,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

function setup() {
  createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE);
  frameRate(60);
  noSmooth();
}

function draw() {
  background(0);
  drawMaze();
}

// ── DRAW MAZE — students write this if/else block ─────────────
function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {

      let cell = maze[row][col];
      let x    = col * TILE_SIZE;
      let y    = row * TILE_SIZE;

      if (cell === WALL) {
        fill(0, 0, 180);
        noStroke();
        rect(x, y, TILE_SIZE, TILE_SIZE);

      } else if (cell === PELLET) {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 255, 200);
        noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 4);

      } else if (cell === POWER) {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 180, 0);
        noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 12);

      } else {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}`,
  },

  day2: {
    id: 'day2',
    title: 'Day 2 — Moving Pacman',
    summary: 'Students add Pacman with arrow key movement, wall collision, pellet eating, and a mouth animation using arc().',
    newConcepts: [
      'Variables for position: pacRow, pacCol',
      'keyPressed() event function',
      'Wall collision: maze[nextRow][nextCol] !== WALL',
      'arc() for the mouth wedge',
      'Eating: maze[row][col] = PATH',
    ],
    code: `// ════════════════════════════════════════════════════════════
//  DAY 2 — Moving Pacman
//  Adds: Pacman sprite, arrow key movement, wall collision,
//        pellet eating, score, mouth animation
// ════════════════════════════════════════════════════════════

const TILE_SIZE = 20;
const COLS      = 21;
const ROWS      = 21;
const PATH = 0, WALL = 1, PELLET = 2, POWER = 3;

let maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,2,2,2,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// NEW: Pacman state
let pacRow = 16, pacCol = 10;
let pacDir = 0;           // 0=right, 90=down, 180=left, 270=up
let mouthAngle = 0;
let mouthOpen  = true;
let score = 0;

function setup() {
  createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE);
  frameRate(60);
  noSmooth();
}

function draw() {
  background(0);
  drawMaze();
  animateMouth();   // NEW
  drawPacman();     // NEW
  drawScore();      // NEW
}

function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let cell = maze[row][col];
      let x = col * TILE_SIZE, y = row * TILE_SIZE;
      if (cell === WALL) {
        fill(0, 0, 180); noStroke(); rect(x, y, TILE_SIZE, TILE_SIZE);
      } else if (cell === PELLET) {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 255, 200); noStroke();
        circle(x + TILE_SIZE/2, y + TILE_SIZE/2, 4);
      } else if (cell === POWER) {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 180, 0); noStroke();
        circle(x + TILE_SIZE/2, y + TILE_SIZE/2, 12);
      } else {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

// NEW: oscillates mouth between 0 and 40 degrees
function animateMouth() {
  if (mouthOpen) { mouthAngle += 4; if (mouthAngle >= 40) mouthOpen = false; }
  else           { mouthAngle -= 4; if (mouthAngle <= 0)  mouthOpen = true;  }
}

// NEW: draws Pacman as a pie/wedge using arc()
function drawPacman() {
  let x = pacCol * TILE_SIZE + TILE_SIZE / 2;
  let y = pacRow * TILE_SIZE + TILE_SIZE / 2;
  fill(255, 220, 0); noStroke();
  arc(x, y, TILE_SIZE - 2, TILE_SIZE - 2,
    radians(pacDir + mouthAngle),
    radians(pacDir + 360 - mouthAngle),
    PIE
  );
}

function drawScore() {
  fill(255); noStroke(); textSize(12); textAlign(LEFT, TOP);
  text('SCORE: ' + score, 6, 4);
}

// NEW: move on arrow key press, check wall, eat pellet
function keyPressed() {
  let nextRow = pacRow, nextCol = pacCol;
  if (keyCode === UP_ARROW)    { nextRow -= 1; pacDir = 270; }
  if (keyCode === DOWN_ARROW)  { nextRow += 1; pacDir = 90;  }
  if (keyCode === LEFT_ARROW)  { nextCol -= 1; pacDir = 180; }
  if (keyCode === RIGHT_ARROW) { nextCol += 1; pacDir = 0;   }

  if (maze[nextRow][nextCol] !== WALL) {
    pacRow = nextRow; pacCol = nextCol;
    if (maze[pacRow][pacCol] === PELLET) {
      maze[pacRow][pacCol] = PATH; score += 10;
    } else if (maze[pacRow][pacCol] === POWER) {
      maze[pacRow][pacCol] = PATH; score += 50;
    }
  }
}`,
  },

  day3: {
    id: 'day3',
    title: 'Day 3 — Ghosts',
    summary: 'Students add 4 ghosts with random-walk AI, scared mode when a power pellet is eaten, and game-over collision detection.',
    newConcepts: [
      'Array of objects: ghosts[]',
      'for...of loop',
      'Random direction AI with wall avoidance',
      'Timer with frameCount: scaredTimer countdown',
      'Game state flag: gameOver',
    ],
    code: `// ════════════════════════════════════════════════════════════
//  DAY 3 — Ghosts
//  Adds: 4 ghosts, random-walk AI, scared mode, game over
// ════════════════════════════════════════════════════════════

const TILE_SIZE = 20;
const COLS = 21, ROWS = 21;
const PATH = 0, WALL = 1, PELLET = 2, POWER = 3;

let maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,2,2,2,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let pacRow = 16, pacCol = 10, pacDir = 0;
let mouthAngle = 0, mouthOpen = true;
let score = 0;

// NEW: ghost objects
let ghosts = [
  { row: 9,  col: 9,  color: [255, 0, 0],     dr: 0,  dc: 1  },
  { row: 9,  col: 11, color: [255, 184, 255],  dr: 0,  dc: -1 },
  { row: 11, col: 9,  color: [0, 255, 255],    dr: -1, dc: 0  },
  { row: 11, col: 11, color: [255, 184, 81],   dr: 1,  dc: 0  },
];

let scaredTimer = 0;
const SCARED_TIME = 300;
let ghostMoveTimer = 0;
const GHOST_SPEED  = 15;
let gameOver = false;

function setup() {
  createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE);
  frameRate(60); noSmooth();
}

function draw() {
  background(0);
  drawMaze();
  if (!gameOver) {
    ghostMoveTimer++;
    if (ghostMoveTimer >= GHOST_SPEED) { moveGhosts(); ghostMoveTimer = 0; }
    if (scaredTimer > 0) scaredTimer--;
    checkGhostCollision();
  }
  drawGhosts();
  animateMouth(); drawPacman();
  fill(255); noStroke(); textSize(12); textAlign(LEFT, TOP);
  text('SCORE: ' + score, 6, 4);
  if (gameOver) {
    fill(0, 0, 0, 160); rect(0, 0, width, height);
    fill(255, 0, 0); textSize(28); textAlign(CENTER, CENTER);
    text('GAME OVER', width/2, height/2);
    fill(255); textSize(14);
    text('Score: ' + score, width/2, height/2 + 28);
  }
}

function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let cell = maze[row][col], x = col*TILE_SIZE, y = row*TILE_SIZE;
      if (cell===WALL)   { fill(0,0,180); noStroke(); rect(x,y,TILE_SIZE,TILE_SIZE); }
      else if (cell===PELLET) { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); fill(255,255,200); noStroke(); circle(x+TILE_SIZE/2,y+TILE_SIZE/2,4); }
      else if (cell===POWER)  { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); fill(255,180,0); noStroke(); circle(x+TILE_SIZE/2,y+TILE_SIZE/2,12); }
      else { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); }
    }
  }
}

// NEW: draw ghost body + eyes
function drawGhosts() {
  for (let g of ghosts) {
    let x = g.col*TILE_SIZE, y = g.row*TILE_SIZE;
    let cx = x+TILE_SIZE/2, cy = y+TILE_SIZE/2;
    let col = g.color;
    if (scaredTimer > 0)
      col = (scaredTimer < 60 && frameCount%20 < 10) ? [255,255,255] : [0,0,200];
    noStroke(); fill(col[0], col[1], col[2]);
    arc(cx, cy, TILE_SIZE-2, TILE_SIZE-2, PI, 0, CHORD);
    rect(x+1, cy, TILE_SIZE-2, TILE_SIZE/2-1);
    let w = (TILE_SIZE-2)/3;
    for (let i = 0; i < 3; i++)
      arc(x+1+i*w+w/2, y+TILE_SIZE-2, w, w*1.2, 0, PI, PIE);
    if (scaredTimer <= 0) {
      fill(255); ellipse(cx-3,cy-1,5,6); ellipse(cx+3,cy-1,5,6);
      fill(0,0,180); ellipse(cx-2,cy-1,2,3); ellipse(cx+4,cy-1,2,3);
    }
  }
}

// NEW: random-walk AI
function moveGhosts() {
  const dirs = [{dr:-1,dc:0},{dr:1,dc:0},{dr:0,dc:-1},{dr:0,dc:1}];
  for (let g of ghosts) {
    if (maze[g.row+g.dr][g.col+g.dc] === WALL) {
      let s = [...dirs].sort(() => random(-1,1));
      for (let d of s) {
        if (maze[g.row+d.dr][g.col+d.dc] !== WALL) { g.dr=d.dr; g.dc=d.dc; break; }
      }
    }
    let nr=g.row+g.dr, nc=g.col+g.dc;
    if (maze[nr][nc] !== WALL) { g.row=nr; g.col=nc; }
  }
}

// NEW: ghost hits Pacman → game over (or eat ghost if scared)
function checkGhostCollision() {
  for (let g of ghosts) {
    if (g.row===pacRow && g.col===pacCol) {
      if (scaredTimer > 0) {
        g.row = 9+floor(random(3)); g.col = 9+floor(random(3)); score += 200;
      } else { gameOver = true; }
    }
  }
}

function animateMouth() {
  if (mouthOpen) { mouthAngle+=4; if (mouthAngle>=40) mouthOpen=false; }
  else           { mouthAngle-=4; if (mouthAngle<=0)  mouthOpen=true;  }
}

function drawPacman() {
  let x=pacCol*TILE_SIZE+TILE_SIZE/2, y=pacRow*TILE_SIZE+TILE_SIZE/2;
  fill(255,220,0); noStroke();
  arc(x,y,TILE_SIZE-2,TILE_SIZE-2,radians(pacDir+mouthAngle),radians(pacDir+360-mouthAngle),PIE);
}

function keyPressed() {
  if (key==='r'||key==='R') { window.location.reload(); return; }
  if (gameOver) return;
  let nr=pacRow, nc=pacCol;
  if (keyCode===UP_ARROW)    { nr-=1; pacDir=270; }
  if (keyCode===DOWN_ARROW)  { nr+=1; pacDir=90;  }
  if (keyCode===LEFT_ARROW)  { nc-=1; pacDir=180; }
  if (keyCode===RIGHT_ARROW) { nc+=1; pacDir=0;   }
  if (maze[nr][nc] !== WALL) {
    pacRow=nr; pacCol=nc;
    if (maze[pacRow][pacCol]===PELLET) { maze[pacRow][pacCol]=PATH; score+=10; }
    else if (maze[pacRow][pacCol]===POWER) { maze[pacRow][pacCol]=PATH; score+=50; scaredTimer=SCARED_TIME; }
  }
}`,
  },

  day4: {
    id: 'day4',
    title: 'Day 4 — Polish & Make It Yours',
    summary: 'Students add lives, level progression (maze resets, ghosts speed up), a HUD bar, and put their own design stamp on the game.',
    newConcepts: [
      'Deep copy array: ORIGINAL_MAZE.map(row => [...row])',
      'Multiple game states: gameOver, won',
      'Lives system with respawn',
      'Level counter — speed increases each level',
      'HUD with score, level, and life icons',
    ],
    code: `// ════════════════════════════════════════════════════════════
//  DAY 4 — Polish & Make It Yours
//  Adds: 3 lives, level reset, HUD bar, speed scaling
// ════════════════════════════════════════════════════════════

const TILE_SIZE = 20;
const COLS = 21, ROWS = 21;
const PATH = 0, WALL = 1, PELLET = 2, POWER = 3;

// Keep the original so we can reset each level
const ORIGINAL_MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,2,2,2,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let maze;
function resetMaze() { maze = ORIGINAL_MAZE.map(r => [...r]); }

let pacRow, pacCol, pacDir, mouthAngle, mouthOpen;
let score = 0, lives = 3, level = 1;
let gameOver = false;
let scaredTimer = 0, ghostMoveTimer = 0, ghostSpeed;
let ghosts;

function resetPositions() {
  pacRow=16; pacCol=10; pacDir=0; mouthAngle=0; mouthOpen=true;
  scaredTimer=0; ghostMoveTimer=0;
  ghostSpeed = Math.max(5, 15 - (level-1)*2);  // faster each level
  ghosts = [
    { row:9,  col:9,  color:[255,0,0],    dr:0,  dc:1  },
    { row:9,  col:11, color:[255,184,255],dr:0,  dc:-1 },
    { row:11, col:9,  color:[0,255,255],  dr:-1, dc:0  },
    { row:11, col:11, color:[255,184,81], dr:1,  dc:0  },
  ];
}

function setup() {
  createCanvas(COLS*TILE_SIZE, ROWS*TILE_SIZE+24);  // +24 for HUD
  frameRate(60); noSmooth();
  resetMaze(); resetPositions();
}

function draw() {
  background(0);
  push(); translate(0, 24);  // shift maze down for HUD
  drawMaze();
  if (!gameOver) {
    ghostMoveTimer++;
    if (ghostMoveTimer >= ghostSpeed) { moveGhosts(); ghostMoveTimer=0; }
    if (scaredTimer > 0) scaredTimer--;
    checkGhostCollision();
    checkWin();
  }
  drawGhosts(); animateMouth(); drawPacman();
  pop();
  drawHUD();
  if (gameOver) { fill(0,0,0,160); rect(0,0,width,height); fill(255,0,0); textSize(28); textAlign(CENTER,CENTER); text('GAME OVER',width/2,height/2); fill(255); textSize(14); text('Press R',width/2,height/2+28); }
}

// NEW: HUD bar at top — score, level, lives
function drawHUD() {
  fill(20); noStroke(); rect(0,0,width,24);
  fill(255); textSize(12); textAlign(LEFT,CENTER);  text('SCORE: '+score, 8, 12);
  textAlign(CENTER,CENTER); text('LVL '+level, width/2, 12);
  textAlign(RIGHT,CENTER);  text('LIVES:', width-8-lives*16, 12);
  fill(255,220,0); noStroke();
  for (let i=0;i<lives;i++) arc(width-8-i*16, 12, 12, 12, radians(30), radians(330), PIE);
}

function drawMaze() {
  for (let row=0;row<ROWS;row++) for (let col=0;col<COLS;col++) {
    let cell=maze[row][col], x=col*TILE_SIZE, y=row*TILE_SIZE;
    if (cell===WALL)        { fill(0,0,180); noStroke(); rect(x,y,TILE_SIZE,TILE_SIZE); }
    else if (cell===PELLET) { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); fill(255,255,200); noStroke(); circle(x+TILE_SIZE/2,y+TILE_SIZE/2,4); }
    else if (cell===POWER)  { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); let p=map(sin(frameCount*0.15),-1,1,8,14); fill(255,180,0); noStroke(); circle(x+TILE_SIZE/2,y+TILE_SIZE/2,p); }
    else { fill(0); rect(x,y,TILE_SIZE,TILE_SIZE); }
  }
}

function drawGhosts() {
  for (let g of ghosts) {
    let x=g.col*TILE_SIZE,y=g.row*TILE_SIZE,cx=x+TILE_SIZE/2,cy=y+TILE_SIZE/2;
    let col=g.color;
    if (scaredTimer>0) col=(scaredTimer<60&&frameCount%20<10)?[255,255,255]:[0,0,200];
    noStroke(); fill(col[0],col[1],col[2]);
    arc(cx,cy,TILE_SIZE-2,TILE_SIZE-2,PI,0,CHORD); rect(x+1,cy,TILE_SIZE-2,TILE_SIZE/2-1);
    let w=(TILE_SIZE-2)/3;
    for (let i=0;i<3;i++) arc(x+1+i*w+w/2,y+TILE_SIZE-2,w,w*1.2,0,PI,PIE);
    if (scaredTimer<=0) { fill(255); ellipse(cx-3,cy-1,5,6); ellipse(cx+3,cy-1,5,6); fill(0,0,180); ellipse(cx-2,cy-1,2,3); ellipse(cx+4,cy-1,2,3); }
  }
}

function moveGhosts() {
  const dirs=[{dr:-1,dc:0},{dr:1,dc:0},{dr:0,dc:-1},{dr:0,dc:1}];
  for (let g of ghosts) {
    if (maze[g.row+g.dr][g.col+g.dc]===WALL) {
      let s=[...dirs].sort(()=>random(-1,1));
      for (let d of s) { if (maze[g.row+d.dr][g.col+d.dc]!==WALL){g.dr=d.dr;g.dc=d.dc;break;} }
    }
    let nr=g.row+g.dr,nc=g.col+g.dc;
    if (maze[nr][nc]!==WALL){g.row=nr;g.col=nc;}
  }
}

// NEW: respawn on death, lose game when lives = 0
function checkGhostCollision() {
  for (let g of ghosts) {
    if (g.row===pacRow&&g.col===pacCol) {
      if (scaredTimer>0) { g.row=9+floor(random(3)); g.col=9+floor(random(3)); score+=200; }
      else { lives--; if (lives<=0) gameOver=true; else resetPositions(); }
    }
  }
}

// NEW: all pellets gone → next level
function checkWin() {
  for (let r of maze) for (let c of r) if (c===PELLET||c===POWER) return;
  level++; score+=1000; resetMaze(); resetPositions();
}

function animateMouth() {
  if (mouthOpen){mouthAngle+=4;if(mouthAngle>=40)mouthOpen=false;}
  else          {mouthAngle-=4;if(mouthAngle<=0) mouthOpen=true; }
}

function drawPacman() {
  let x=pacCol*TILE_SIZE+TILE_SIZE/2, y=pacRow*TILE_SIZE+TILE_SIZE/2;
  fill(255,220,0); noStroke();
  arc(x,y,TILE_SIZE-2,TILE_SIZE-2,radians(pacDir+mouthAngle),radians(pacDir+360-mouthAngle),PIE);
}

function keyPressed() {
  if (key==='r'||key==='R'){window.location.reload();return;}
  if (gameOver) return;
  let nr=pacRow,nc=pacCol;
  if (keyCode===UP_ARROW)    {nr-=1;pacDir=270;}
  if (keyCode===DOWN_ARROW)  {nr+=1;pacDir=90; }
  if (keyCode===LEFT_ARROW)  {nc-=1;pacDir=180;}
  if (keyCode===RIGHT_ARROW) {nc+=1;pacDir=0;  }
  if (maze[nr][nc]!==WALL) {
    pacRow=nr;pacCol=nc;
    if (maze[pacRow][pacCol]===PELLET){maze[pacRow][pacCol]=PATH;score+=10;}
    else if (maze[pacRow][pacCol]===POWER){maze[pacRow][pacCol]=PATH;score+=50;scaredTimer=300;}
  }
}`,
  },
};
