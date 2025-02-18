
window.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('single-image');
    const canvas = document.getElementById('canvas');
    const container = document.getElementById('song-wrap');

    img.addEventListener('load', function () {
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0;
        const totalPixels = pixels.length / 4;

        for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i];      
            g += pixels[i + 1];  
            b += pixels[i + 2]; 
        }

        r = Math.floor(r / totalPixels);
        g = Math.floor(g / totalPixels);
        b = Math.floor(b / totalPixels);


        const blendFactor = 0.95; // 
        r = Math.floor(r + (15 - r) * blendFactor);
        g = Math.floor(g + (15 - g) * blendFactor);
        b = Math.floor(b + (15 - b) * blendFactor);

        // Set the subtle background color
        const avgColor = `rgb(${r}, ${g}, ${b})`;
        container.style.backgroundColor = avgColor;
    });
});

 