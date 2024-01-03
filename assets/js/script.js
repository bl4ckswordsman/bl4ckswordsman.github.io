const bgImage = document.getElementById('bgImage');
const doc = document.documentElement;
let x, y;

// Function to center the image on the screen
function centerImage() {
    const {clientWidth: maxWidth, clientHeight: maxHeight} = doc;
    const {offsetWidth: width, offsetHeight: height} = bgImage;

    bgImage.style.left = `${(maxWidth - width) / 2}px`;
    bgImage.style.top = `${(maxHeight - height) / 2}px`;
}

// Debounce expensive calculations
let resizeTimer;

function debouncedCenter() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(centerImage, 250);
}

// Center the image on the screen initially and when the window is resized
centerImage();
window.addEventListener('resize', debouncedCenter);

// Use requestAnimationFrame for smooth animation
function animate() {
    requestAnimationFrame(animate);

    // Check if the device is a mobile device
    if (!window.matchMedia('(max-width: 768px)').matches) {
        // If it's not, set the position of the image to the mouse position
        const {offsetWidth: width, offsetHeight: height} = bgImage;
        const {clientWidth: maxWidth, clientHeight: maxHeight} = doc;

        bgImage.style.left = `${Math.min(Math.max(x - width / 2, 0), maxWidth - width)}px`;
        bgImage.style.top = `${Math.min(Math.max(y - height / 2, 0), maxHeight - height)}px`;
    }
}

document.addEventListener('mousemove', (e) => {
    x = e.pageX;
    y = e.pageY;
});

// Start the animation
animate();