// Sky Runner - Platform Game Engine

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Game state
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 0;

        // Game objects
        this.player = null;
        this.platforms = [];
        this.coins = [];
        this.enemies = [];
        this.flag = null;
        this.particles = [];

        // Camera offset for scrolling
        this.cameraX = 0;

        // Input handling
        this.keys = {};
        this.setupInputHandlers();

        // Levels
        this.levels = this.createLevels();

        // Animation frame
        this.animationId = null;
        this.lastTime = 0;
    }

    setupInputHandlers() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
            if (e.code === 'KeyP') {
                this.togglePause();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    createLevels() {
        return [
            // Level 1 - Introduction
            {
                playerStart: { x: 50, y: 350 },
                platforms: [
                    { x: 0, y: 480, width: 300, height: 20 },
                    { x: 250, y: 400, width: 150, height: 20 },
                    { x: 450, y: 350, width: 100, height: 20 },
                    { x: 600, y: 300, width: 150, height: 20 },
                    { x: 800, y: 350, width: 200, height: 20 },
                    { x: 1050, y: 280, width: 100, height: 20 },
                    { x: 1200, y: 350, width: 150, height: 20 },
                    { x: 1400, y: 480, width: 200, height: 20 },
                ],
                coins: [
                    { x: 300, y: 360 },
                    { x: 480, y: 310 },
                    { x: 650, y: 260 },
                    { x: 700, y: 260 },
                    { x: 900, y: 310 },
                    { x: 1080, y: 240 },
                    { x: 1250, y: 310 },
                ],
                enemies: [
                    { x: 850, y: 320, patrolStart: 800, patrolEnd: 980 },
                ],
                flag: { x: 1500, y: 420 }
            },
            // Level 2 - More Challenge
            {
                playerStart: { x: 50, y: 350 },
                platforms: [
                    { x: 0, y: 480, width: 200, height: 20 },
                    { x: 180, y: 380, width: 80, height: 20 },
                    { x: 320, y: 300, width: 80, height: 20 },
                    { x: 450, y: 380, width: 100, height: 20 },
                    { x: 600, y: 450, width: 150, height: 20 },
                    { x: 800, y: 380, width: 80, height: 20 },
                    { x: 950, y: 300, width: 80, height: 20 },
                    { x: 1100, y: 220, width: 80, height: 20 },
                    { x: 1250, y: 300, width: 100, height: 20 },
                    { x: 1400, y: 380, width: 80, height: 20 },
                    { x: 1550, y: 480, width: 250, height: 20 },
                ],
                coins: [
                    { x: 200, y: 340 },
                    { x: 340, y: 260 },
                    { x: 480, y: 340 },
                    { x: 650, y: 410 },
                    { x: 700, y: 410 },
                    { x: 830, y: 340 },
                    { x: 980, y: 260 },
                    { x: 1130, y: 180 },
                    { x: 1280, y: 260 },
                    { x: 1430, y: 340 },
                ],
                enemies: [
                    { x: 620, y: 420, patrolStart: 600, patrolEnd: 730 },
                    { x: 1270, y: 270, patrolStart: 1250, patrolEnd: 1330 },
                ],
                flag: { x: 1700, y: 420 }
            },
            // Level 3 - Expert
            {
                playerStart: { x: 50, y: 350 },
                platforms: [
                    { x: 0, y: 480, width: 150, height: 20 },
                    { x: 200, y: 420, width: 60, height: 20 },
                    { x: 320, y: 350, width: 60, height: 20 },
                    { x: 440, y: 280, width: 60, height: 20 },
                    { x: 560, y: 350, width: 100, height: 20 },
                    { x: 720, y: 280, width: 60, height: 20 },
                    { x: 840, y: 200, width: 60, height: 20 },
                    { x: 960, y: 280, width: 100, height: 20 },
                    { x: 1120, y: 350, width: 60, height: 20 },
                    { x: 1240, y: 280, width: 60, height: 20 },
                    { x: 1360, y: 200, width: 60, height: 20 },
                    { x: 1480, y: 280, width: 80, height: 20 },
                    { x: 1620, y: 350, width: 100, height: 20 },
                    { x: 1800, y: 480, width: 200, height: 20 },
                ],
                coins: [
                    { x: 220, y: 380 },
                    { x: 340, y: 310 },
                    { x: 460, y: 240 },
                    { x: 590, y: 310 },
                    { x: 740, y: 240 },
                    { x: 860, y: 160 },
                    { x: 990, y: 240 },
                    { x: 1140, y: 310 },
                    { x: 1260, y: 240 },
                    { x: 1380, y: 160 },
                    { x: 1500, y: 240 },
                    { x: 1650, y: 310 },
                ],
                enemies: [
                    { x: 580, y: 320, patrolStart: 560, patrolEnd: 640 },
                    { x: 980, y: 250, patrolStart: 960, patrolEnd: 1040 },
                    { x: 1640, y: 320, patrolStart: 1620, patrolEnd: 1700 },
                ],
                flag: { x: 1900, y: 420 }
            }
        ];
    }

    loadLevel(levelIndex) {
        const level = this.levels[levelIndex];
        if (!level) return false;

        // Reset camera
        this.cameraX = 0;

        // Create player
        this.player = new Player(level.playerStart.x, level.playerStart.y);

        // Create platforms
        this.platforms = level.platforms.map(p => new Platform(p.x, p.y, p.width, p.height));

        // Create coins
        this.coins = level.coins.map(c => new Coin(c.x, c.y));

        // Create enemies
        this.enemies = level.enemies.map(e => new Enemy(e.x, e.y, e.patrolStart, e.patrolEnd));

        // Create flag
        this.flag = new Flag(level.flag.x, level.flag.y);

        // Clear particles
        this.particles = [];

        return true;
    }

    start() {
        if (this.isRunning) return;

        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('winScreen').classList.add('hidden');

        this.isRunning = true;
        this.isPaused = false;
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 0;

        this.updateUI();
        this.loadLevel(this.currentLevel);

        this.lastTime = performance.now();
        this.gameLoop();
    }

    restart() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
        this.start();
    }

    togglePause() {
        if (!this.isRunning) return;
        this.isPaused = !this.isPaused;

        if (!this.isPaused) {
            this.lastTime = performance.now();
            this.gameLoop();
        }
    }

    gameLoop(currentTime = performance.now()) {
        if (!this.isRunning || this.isPaused) return;

        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        // Update player
        this.player.update(dt, this.keys, this.platforms, this.width, this.height);

        // Update camera to follow player
        const targetCameraX = this.player.x - this.width / 3;
        this.cameraX = Math.max(0, targetCameraX);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(dt));

        // Update particles
        this.particles = this.particles.filter(p => {
            p.update(dt);
            return p.life > 0;
        });

        // Check coin collection
        this.coins = this.coins.filter(coin => {
            if (this.player.collidesWith(coin)) {
                this.score += 10;
                this.updateUI();
                this.createParticles(coin.x + coin.width/2, coin.y + coin.height/2, '#FFD700', 10);
                return false;
            }
            return true;
        });

        // Check enemy collision
        this.enemies.forEach(enemy => {
            if (this.player.collidesWith(enemy)) {
                // Check if player is jumping on enemy
                if (this.player.vy > 0 && this.player.y + this.player.height - 10 < enemy.y) {
                    enemy.isDead = true;
                    this.player.vy = -300;
                    this.score += 50;
                    this.updateUI();
                    this.createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '#FF4444', 15);
                } else if (!this.player.isInvincible) {
                    this.playerHit();
                }
            }
        });

        // Remove dead enemies
        this.enemies = this.enemies.filter(e => !e.isDead);

        // Check flag collision (level complete)
        if (this.player.collidesWith(this.flag)) {
            this.nextLevel();
        }

        // Check if player fell off
        if (this.player.y > this.height + 100) {
            this.playerHit();
        }
    }

    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    playerHit() {
        this.lives--;
        this.updateUI();
        this.createParticles(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#FF6B6B', 20);

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Reset player position
            const level = this.levels[this.currentLevel];
            this.player.x = level.playerStart.x;
            this.player.y = level.playerStart.y;
            this.player.vx = 0;
            this.player.vy = 0;
            this.player.makeInvincible();
            this.cameraX = 0;
        }
    }

    nextLevel() {
        this.currentLevel++;
        this.score += 100; // Bonus for completing level
        this.updateUI();

        if (this.currentLevel >= this.levels.length) {
            this.win();
        } else {
            this.loadLevel(this.currentLevel);
        }
    }

    gameOver() {
        this.isRunning = false;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }

    win() {
        this.isRunning = false;
        document.getElementById('winScore').textContent = this.score;
        document.getElementById('winScreen').classList.remove('hidden');
    }

    updateUI() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('lives').textContent = `Lives: ${this.lives}`;
        document.getElementById('level').textContent = `Level: ${this.currentLevel + 1}`;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw background elements
        this.drawBackground();

        // Save context for camera translation
        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        // Draw platforms
        this.platforms.forEach(platform => platform.render(this.ctx));

        // Draw coins
        this.coins.forEach(coin => coin.render(this.ctx));

        // Draw enemies
        this.enemies.forEach(enemy => enemy.render(this.ctx));

        // Draw flag
        this.flag.render(this.ctx);

        // Draw player
        this.player.render(this.ctx);

        // Draw particles
        this.particles.forEach(p => p.render(this.ctx));

        // Restore context
        this.ctx.restore();

        // Draw pause overlay
        if (this.isPaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.width / 2, this.height / 2);
        }
    }

    drawBackground() {
        // Draw gradient sky
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(1, '#1a1a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw stars
        this.ctx.fillStyle = '#ffffff';
        const starPositions = [
            [100, 50], [200, 80], [350, 30], [500, 90], [650, 40],
            [750, 70], [50, 120], [300, 150], [450, 100], [600, 130]
        ];
        starPositions.forEach(([x, y]) => {
            const offsetX = (this.cameraX * 0.1) % this.width;
            const drawX = (x - offsetX + this.width) % this.width;
            this.ctx.beginPath();
            this.ctx.arc(drawX, y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw distant mountains
        this.ctx.fillStyle = '#16213e';
        this.ctx.beginPath();
        const mountainOffset = this.cameraX * 0.2;
        this.ctx.moveTo(0, this.height);
        for (let x = 0; x <= this.width + 100; x += 100) {
            const baseX = x - (mountainOffset % 200);
            this.ctx.lineTo(baseX, this.height - 100 - Math.sin(baseX * 0.02) * 50);
        }
        this.ctx.lineTo(this.width, this.height);
        this.ctx.fill();
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 40;
        this.vx = 0;
        this.vy = 0;

        // Physics constants
        this.speed = 250;
        this.jumpForce = -450;
        this.gravity = 1000;
        this.friction = 0.85;

        // State
        this.isGrounded = false;
        this.isInvincible = false;
        this.invincibleTimer = 0;
        this.facingRight = true;

        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
    }

    update(dt, keys, platforms, canvasWidth, canvasHeight) {
        // Horizontal movement
        if (keys['ArrowLeft'] || keys['KeyA']) {
            this.vx = -this.speed;
            this.facingRight = false;
        } else if (keys['ArrowRight'] || keys['KeyD']) {
            this.vx = this.speed;
            this.facingRight = true;
        } else {
            this.vx *= this.friction;
        }

        // Jump
        if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && this.isGrounded) {
            this.vy = this.jumpForce;
            this.isGrounded = false;
        }

        // Apply gravity
        this.vy += this.gravity * dt;

        // Update position
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Platform collision
        this.isGrounded = false;
        platforms.forEach(platform => {
            if (this.collidesWithPlatform(platform)) {
                // Landing on top
                if (this.vy > 0 && this.y + this.height - this.vy * dt <= platform.y + 5) {
                    this.y = platform.y - this.height;
                    this.vy = 0;
                    this.isGrounded = true;
                }
                // Hitting from below
                else if (this.vy < 0 && this.y - this.vy * dt >= platform.y + platform.height - 5) {
                    this.y = platform.y + platform.height;
                    this.vy = 0;
                }
                // Side collision
                else {
                    if (this.vx > 0) {
                        this.x = platform.x - this.width;
                    } else if (this.vx < 0) {
                        this.x = platform.x + platform.width;
                    }
                    this.vx = 0;
                }
            }
        });

        // Keep player in bounds (left side only)
        if (this.x < 0) this.x = 0;

        // Update invincibility
        if (this.isInvincible) {
            this.invincibleTimer -= dt;
            if (this.invincibleTimer <= 0) {
                this.isInvincible = false;
            }
        }

        // Animation
        this.animationTimer += dt;
        if (this.animationTimer > 0.1) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 4;
        }
    }

    collidesWithPlatform(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y < platform.y + platform.height &&
               this.y + this.height > platform.y;
    }

    collidesWith(obj) {
        return this.x < obj.x + obj.width &&
               this.x + this.width > obj.x &&
               this.y < obj.y + obj.height &&
               this.y + this.height > obj.y;
    }

    makeInvincible() {
        this.isInvincible = true;
        this.invincibleTimer = 2;
    }

    render(ctx) {
        // Blink when invincible
        if (this.isInvincible && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
            return;
        }

        ctx.save();

        // Flip if facing left
        if (!this.facingRight) {
            ctx.translate(this.x + this.width / 2, 0);
            ctx.scale(-1, 1);
            ctx.translate(-(this.x + this.width / 2), 0);
        }

        // Body
        ctx.fillStyle = '#4ECDC4';
        ctx.fillRect(this.x + 4, this.y + 8, 24, 24);

        // Head
        ctx.fillStyle = '#FFE66D';
        ctx.fillRect(this.x + 6, this.y, 20, 16);

        // Eyes
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x + 18, this.y + 4, 4, 4);

        // Legs (animated)
        ctx.fillStyle = '#4ECDC4';
        const legOffset = this.isGrounded ? Math.sin(this.animationFrame * Math.PI / 2) * 3 : 0;
        ctx.fillRect(this.x + 6, this.y + 32, 8, 8 + legOffset);
        ctx.fillRect(this.x + 18, this.y + 32, 8, 8 - legOffset);

        ctx.restore();
    }
}

class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        // Platform body
        ctx.fillStyle = '#5D5D5D';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Top grass/highlight
        ctx.fillStyle = '#7CB342';
        ctx.fillRect(this.x, this.y, this.width, 4);

        // Add some texture
        ctx.fillStyle = '#4A4A4A';
        for (let i = 0; i < this.width; i += 20) {
            ctx.fillRect(this.x + i + 5, this.y + 8, 2, this.height - 10);
        }
    }
}

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.animationAngle = Math.random() * Math.PI * 2;
    }

    render(ctx) {
        this.animationAngle += 0.1;
        const scale = 0.7 + Math.abs(Math.sin(this.animationAngle)) * 0.3;

        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.scale(scale, 1);

        // Coin glow
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        // Coin body
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // Coin highlight
        ctx.fillStyle = '#FFF8DC';
        ctx.beginPath();
        ctx.arc(-3, -3, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class Enemy {
    constructor(x, y, patrolStart, patrolEnd) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.patrolStart = patrolStart;
        this.patrolEnd = patrolEnd;
        this.speed = 60;
        this.direction = 1;
        this.isDead = false;
        this.animationFrame = 0;
        this.animationTimer = 0;
    }

    update(dt) {
        if (this.isDead) return;

        this.x += this.speed * this.direction * dt;

        if (this.x <= this.patrolStart) {
            this.direction = 1;
        } else if (this.x >= this.patrolEnd) {
            this.direction = -1;
        }

        // Animation
        this.animationTimer += dt;
        if (this.animationTimer > 0.15) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 2;
        }
    }

    render(ctx) {
        if (this.isDead) return;

        ctx.save();

        // Flip based on direction
        if (this.direction < 0) {
            ctx.translate(this.x + this.width / 2, 0);
            ctx.scale(-1, 1);
            ctx.translate(-(this.x + this.width / 2), 0);
        }

        // Body (spiky ball enemy)
        ctx.fillStyle = '#E74C3C';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, 15, 0, Math.PI * 2);
        ctx.fill();

        // Spikes
        ctx.fillStyle = '#C0392B';
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + this.animationFrame * 0.2;
            const spikeX = this.x + this.width/2 + Math.cos(angle) * 15;
            const spikeY = this.y + this.height/2 + Math.sin(angle) * 15;
            const tipX = this.x + this.width/2 + Math.cos(angle) * 22;
            const tipY = this.y + this.height/2 + Math.sin(angle) * 22;

            ctx.beginPath();
            ctx.moveTo(spikeX - 3, spikeY);
            ctx.lineTo(tipX, tipY);
            ctx.lineTo(spikeX + 3, spikeY);
            ctx.fill();
        }

        // Eyes
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 5, this.y + this.height/2 - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 - 3, 4, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 4, this.y + this.height/2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 + 6, this.y + this.height/2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class Flag {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.waveOffset = 0;
    }

    render(ctx) {
        this.waveOffset += 0.1;

        // Pole
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, 5, this.height);

        // Pole top
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.x + 2.5, this.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Flag (waving)
        ctx.fillStyle = '#27AE60';
        ctx.beginPath();
        ctx.moveTo(this.x + 5, this.y + 5);

        // Wave effect
        const wave1 = Math.sin(this.waveOffset) * 3;
        const wave2 = Math.sin(this.waveOffset + 1) * 3;

        ctx.quadraticCurveTo(this.x + 20, this.y + 10 + wave1, this.x + 35, this.y + 8 + wave2);
        ctx.lineTo(this.x + 35, this.y + 28 + wave2);
        ctx.quadraticCurveTo(this.x + 20, this.y + 30 + wave1, this.x + 5, this.y + 25);
        ctx.fill();

        // Star on flag
        ctx.fillStyle = '#FFF';
        ctx.font = '12px Arial';
        ctx.fillText('★', this.x + 15, this.y + 20);
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * 200;
        this.vy = (Math.random() - 0.5) * 200 - 100;
        this.life = 1;
        this.decay = Math.random() * 1 + 1;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy += 400 * dt; // Gravity
        this.life -= this.decay * dt;
    }

    render(ctx) {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// Initialize game
const game = new Game();
