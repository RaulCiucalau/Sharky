/**
 * Handles persistence of the main menu volume slider.
 * - Restores the slider value from localStorage on page load.
 * - Saves the slider value to localStorage whenever it changes.
 *
 * @module volume_slider
 */
window.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('mainMenuVolume');
    if (slider) {
     /**
      * Restore the saved volume value from localStorage, if present.
      * @type {string|null}
      */
        const saved = localStorage.getItem('mainMenuVolume');
        if (saved !== null) {
            slider.value = saved;
        }
     /**
      * Save the current slider value to localStorage on input change.
      */
        slider.addEventListener('input', function() {
            localStorage.setItem('mainMenuVolume', slider.value);
        });
    }
});
