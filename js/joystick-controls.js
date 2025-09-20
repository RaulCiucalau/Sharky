window.addEventListener('resize', showJoystickIfNeeded);
window.addEventListener('orientationchange', showJoystickIfNeeded);

/**
 * Shows the joystick for mobile/touch devices and hides it for desktop/large screens.
 */
function showJoystickIfNeeded() {
    const joystick = document.getElementById('joystick');
    const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
    if (isTouchDevice && window.innerWidth < 1024) {
        joystick.classList.remove('dp-none-joystick');
    } else {
        joystick.classList.add('dp-none-joystick');
    }
}

/**
 * Returns the direction object based on joystick movement deltas.
 * @param {number} dx - The change in x position.
 * @param {number} dy - The change in y position.
 * @returns {{left: boolean, right: boolean, up: boolean, down: boolean}}
 */
function getDirection(directionX, directionY) {
    const threshold = 20;
    let direction = { left: false, right: false, up: false, down: false };
    if (directionX < -threshold) direction.left = true;
    if (directionX > threshold) direction.right = true;
    if (directionY < -threshold) direction.up = true;
    if (directionY > threshold) direction.down = true;
    return direction;
}

/**
 * Sets up joystick event listeners for touch controls.
 */
function setupJoystickEvents() {
    const joystick = document.getElementById('joystick');
    const base = document.getElementById('joystick-base');
    const knob = document.getElementById('joystick-knob');
    if (joystick && base && knob) {
        base.addEventListener('touchstart', handleJoystickTouchStart);
        base.addEventListener('touchmove', handleJoystickTouchMove);
        base.addEventListener('touchend', handleJoystickTouchEnd);
    }
}

/**
 * Handles the start of a joystick touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchStart(e) {
    window.joystickActive = true;
    const touch = e.touches[0];
    window.startX = touch.clientX;
    window.startY = touch.clientY;
}

/**
 * Handles joystick movement during a touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchMove(e) {
    if (!window.joystickActive) return;
    const { distanceX, distanceY } = getJoystickDistances(e);
    updateKnobPosition(distanceX, distanceY);
    updateKeyboardDirection(distanceX, distanceY);
    e.preventDefault();
}

/**
 * Returns the distances moved by the joystick knob from the start position.
 * @param {TouchEvent} e - The touch event.
 * @returns {{distanceX: number, distanceY: number}}
 */
function getJoystickDistances(e) {
    const touch = e.touches[0];
    let distanceX = touch.clientX - window.startX;
    let distanceY = touch.clientY - window.startY;
    const maxDist = 30;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance > maxDist) {
        distanceX = distanceX * maxDist / distance;
        distanceY = distanceY * maxDist / distance;
    }
    return { distanceX, distanceY };
}

/**
 * Updates the position of the joystick knob.
 * @param {number} distanceX - The change in x position.
 * @param {number} distanceY - The change in y position.
 */
function updateKnobPosition(distanceX, distanceY) {
    const knob = document.getElementById('joystick-knob');
    knob.style.left = (20 + distanceX) + 'px';
    knob.style.top = (20 + distanceY) + 'px';
}

/**
 * Updates the global keyboard direction based on joystick movement.
 * @param {number} distanceX - The change in x position.
 * @param {number} distanceY - The change in y position.
 */
function updateKeyboardDirection(distanceX, distanceY) {
    if (window.keyboard) {
        const direction = getDirection(distanceX, distanceY);
        keyboard.left = direction.left;
        keyboard.right = direction.right;
        keyboard.up = direction.up;
        keyboard.down = direction.down;
    }
}

/**
 * Handles the end of a joystick touch event.
 * @param {TouchEvent} e
 */
function handleJoystickTouchEnd(e) {
    window.joystickActive = false;
    const knob = document.getElementById('joystick-knob');
    knob.style.left = '20px';
    knob.style.top = '20px';
    if (window.keyboard) {
        keyboard.left = false;
        keyboard.right = false;
        keyboard.up = false;
        keyboard.down = false;
    }
}

/**
 * Sets up event listeners for the bubble button on mobile.
 */
function setupBubbleBtnEvents() {
    if (bubbleBtn) {
        bubbleBtn.addEventListener('touchstart', function (e) {
            if (window.keyboard) keyboard.E = true;
            e.preventDefault();
        });
        bubbleBtn.addEventListener('touchend', function (e) {
            if (window.keyboard) keyboard.E = false;
            e.preventDefault();
        });
    }
}

/**
 * Sets up event listeners for the poison button on mobile.
 */
function setupPoisonBtnEvents() {
    if (poisonBtn) {
        poisonBtn.addEventListener('touchstart', function (e) {
            if (window.keyboard) keyboard.Q = true;
            e.preventDefault();
        });
        poisonBtn.addEventListener('touchend', function (e) {
            if (window.keyboard) keyboard.Q = false;
            e.preventDefault();
        });
    }
}

window.setupBubbleBtnEvents = setupBubbleBtnEvents;
window.setupPoisonBtnEvents = setupPoisonBtnEvents;
window.showJoystickIfNeeded = showJoystickIfNeeded;
window.setupJoystickEvents = setupJoystickEvents;
window.handleJoystickTouchStart = handleJoystickTouchStart;
window.handleJoystickTouchMove = handleJoystickTouchMove;
window.handleJoystickTouchEnd = handleJoystickTouchEnd;
window.getDirection = getDirection;
window.getJoystickDistances = getJoystickDistances;
window.updateKnobPosition = updateKnobPosition;
window.updateKeyboardDirection = updateKeyboardDirection;