function getMixtapeIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('mixtape');
    return index ? parseInt(index) : 1; // Default to 1 if no index is provided
}

// Function to display song details
function showMixtapeDetails(index) {
    // Ensure the index is within the valid range of the singles array
    if (index < 1 || index > mixtapes.length) {
        console.error('Invalid song index:', index);
        return;
    }

    const mixtape = mixtapes[index - 1]; // Get single by index (adjust for zero-based array)
    if (!mixtape) {
        console.error('Single not found at index:', index);
        return;
    }

    // Update the DOM with single details
    document.getElementById('mixtape-name').innerText = mixtape.name;
    document.getElementById('mixtape-mixtape').innerText = mixtape.mixtape;
    document.getElementById('mixtape-description').innerText = mixtape.description;
    document.getElementById('mixtape-image').src = mixtape.image;
    document.getElementById('mixtape-composer').innerText = `Composer: ${mixtape.composer}`;
    document.getElementById('mixtape-date').innerText = `Released On: ${mixtape.date}`;

    const geniuxButton = document.getElementById(`geniux-url`);

        geniuxButton.addEventListener('click', function() {
            redirectToPlatform(mixtape, 'geniux');
        });
    


    // Make the image clickable
    const singleImage = document.getElementById('mixtape-image');
    if (singleImage && mixtape.url) {
        singleImage.style.cursor = 'pointer'; // Indicate it's clickable
        singleImage.addEventListener('click', () => {
            window.location.href = mixtape.url; // Redirect to the single's URL
        });
    }
}

// Get the song index from the URL and display details
const mixtapeIndex = getMixtapeIndex();
if (mixtapeIndex) {
    showMixtapeDetails(mixtapeIndex);
}


function redirectToPlatform(mixtape) {
    let url = ''; 


        url = mixtape.geniuxUrl;

    if (url) {
        window.open(url, '_blank'); 
    } else {
        console.error('No URL found for this platform.');
    }
}




window.addEventListener('DOMContentLoaded', function () {
    const SingleImageContainer = document.getElementById('single-image-container');
    const selectedIndices = new Set(); // Track selected indices to avoid duplicates

    // Sort singles by date (newest first)
    singles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear the container
    SingleImageContainer.innerHTML = '';

    // Select up to 4 unique singles
    while (selectedIndices.size < 7 && selectedIndices.size < mixtapes.length) {
        const randomIndex = Math.floor(Math.random() * mixtapes.length);

        // Ensure the index hasn't been selected already
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex); // Add the index to the set
            const mixtape = mixtapes[randomIndex]; // Get the single

            // Create elements for the randomly selected single
            const anchor = document.createElement('a');
            anchor.href = `Mixtape.html?mixtape=${mixtape.id}`; 

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.id = 'image';
            img.src = mixtape.image;
            img.alt = `single ${mixtape.id}`;
            img.loading = 'lazy';
            img.classList.add('skeleton');

            const singleElement = document.createElement('p');
            singleElement.id = 'single-name';
            singleElement.innerText = `${mixtape.name}`;

            const singleName = document.createElement('p');
            singleName.id = 'single-name';
            singleName.innerText = `${mixtape.mixtape}`;

            const date = document.createElement('p');
            date.id = 'date-mod';
            date.innerText = `${mixtape.date}`;
            // Append elements to the DOM
            anchor.appendChild(img);
            anchor.appendChild(div);
            div.appendChild(singleElement);
            div.appendChild(singleName);
            div.appendChild(date);
            // Append the <a> to the container
            SingleImageContainer.appendChild(anchor);
        }
    }
});
