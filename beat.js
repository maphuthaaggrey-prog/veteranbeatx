function getBeatIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('beat');
    return index ? parseInt(index) : 1; // Default to 1 if no index is provided
}

// Function to display song details
function showBeatDetails(index) {
    // Ensure the index is within the valid range of the singles array
    if (index < 1 || index > beats.length) {
        console.error('Invalid song index:', index);
        return;
    }

    const beat = beats[index - 1]; // Get single by index (adjust for zero-based array)
    if (!beat) {
        console.error('Single not found at index:', index);
        return;
    }

    // Update the DOM with single details
    document.getElementById('beat-name').innerText = beat.name;
    document.getElementById('beat-mixtape').innerText = beat.beat;
    document.getElementById('beat-description').innerText = beat.description;
    document.getElementById('beats-image').src = beat.image;
    document.getElementById('beat-composer').innerText = `Composer: ${beat.composer}`;
    document.getElementById('beat-date').innerText = `Released On: ${beat.date}`;


      const youtubeButton = document.getElementById(`youtube-url`);
          youtubeButton.addEventListener('click', function() {
              redirectToPlatform(beat, 'youtube');
          });


    // Make the image clickable
    const singleImage = document.getElementById('beats-image');
    if (singleImage && beat.url) {
        singleImage.style.cursor = 'pointer'; // Indicate it's clickable
        singleImage.addEventListener('click', () => {
            window.location.href = beat.url; // Redirect to the single's URL
        });
    }
    const trackList = document.getElementById('tracklist');
    trackList.innerHTML = ''; 
        beat.beatTrackList.forEach((qa, idx) => {
        const listEl = document.createElement('p');
        listEl.id = 'beat-composer';
        listEl.innerText = qa.track;
        trackList.appendChild(listEl);

    });
}

// Get the song index from the URL and display details
const beatIndex = getBeatIndex();
if (beatIndex) {
    showBeatDetails(beatIndex);
}


function redirectToPlatform(beat) {
    let url = ''; 

        url = beat.youtubeUrl;
 
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
    beats.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear the container
    SingleImageContainer.innerHTML = '';

    // Select up to 4 unique singles
    while (selectedIndices.size < 6 && selectedIndices.size < beats.length) {
        const randomIndex = Math.floor(Math.random() * beats.length);

        // Ensure the index hasn't been selected already
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex); // Add the index to the set
            const beat = beats[randomIndex]; // Get the single

            // Create elements for the randomly selected single
            const anchor = document.createElement('a');
            anchor.href = `Beat.html?beat=${beat.id}`; 

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.id = 'image';
            img.src = beat.image;
            img.alt = `single ${beat.id}`;
            img.classList.add('skeleton');

            const singleElement = document.createElement('p');
            singleElement.id = 'single-name';
            singleElement.innerText = `${beat.name}`;

            const singleName = document.createElement('p');
            singleName.id = 'single-name';
            singleName.innerText = `${beat.beat}`;

            const date = document.createElement('p');
            date.id = 'date-mod';
            date.innerText = `${beat.date}`;
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