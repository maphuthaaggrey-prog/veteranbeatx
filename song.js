function getSongIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('song');
    return index ? parseInt(index) : 5; // Default to 1 if no index is provided
}

// Function to display song details
function showSongDetails(index) {
    // Ensure the index is within the valid range of the singles array
    if (index < 1 || index > singles.length) {
        console.error('Invalid song index:', index);
        return;
    }

    const single = singles[index - 1]; // Get single by index (adjust for zero-based array)
    if (!single) {
        console.error('Single not found at index:', index);
        return;
    }

    // Update the DOM with single details
    document.getElementById('single-name').innerText = single.name;
    document.getElementById('single-single').innerText = single.single;
    document.getElementById('single-genre').innerText = `Genre: ${single.genre}`;
    document.getElementById('single-description').innerText = single.description;
    document.getElementById('single-image').src = single.image;
    document.getElementById('single-composer').innerText = `Composer: ${single.composer}`;
    document.getElementById('single-date').innerText = `Released On: ${single.date}`;

        



    
      // Get YouTube and Geniux buttons by their dynamic IDs
      const youtubeButton = document.getElementById(`youtube-url`);
      const geniuxButton = document.getElementById(`geniux-url`);

      // Add event listener for YouTube button
      if (youtubeButton) {
          youtubeButton.addEventListener('click', function() {
              redirectToPlatform(single, 'YouTube');
          });
      }
      // Add event listener for Geniux button
      if (geniuxButton) {
          geniuxButton.addEventListener('click', function() {
              redirectToPlatform(single, 'Geniux Music');
          });
      }
    // Make the image clickable
    const singleImage = document.getElementById('single-image');
    if (singleImage && single.url) {
        singleImage.style.cursor = 'pointer'; // Indicate it's clickable
        singleImage.addEventListener('click', () => {
            window.location.href = single.url; // Redirect to the single's URL
        });
    }
}

// Get the song index from the URL and display details
const songIndex = getSongIndex();
if (songIndex) {
    showSongDetails(songIndex);
}

const noLinkDiv = document.querySelector('.no-link');
noLinkDiv.style.opacity = '0';
noLinkDiv.style.pointerEvents = 'none';


function redirectToPlatform(single, platform) {
    let url = '';


    if (platform === 'YouTube') {
        url = single.youtubeUrl;
    } else if (platform === 'Geniux Music') {
        url = single.geniuxUrl;
    }

    if (url && url !== "") {
        // Open the URL in a new tab if available
        window.open(url, '_blank');
    } else {
        // Display an alert or message if no URL is available

        noLinkDiv.style.opacity = '1';
        noLinkDiv.style.pointerEvents = 'auto';
        noLinkDiv.innerHTML = '';
        // Create a message element
        const message = document.createElement('p');
        message.textContent = `This song isn't available on ${platform}, but you can try listening on the other platform provided!`;
        const buttonOk = document.createElement('Button');
        buttonOk.textContent = "Okay";

        buttonOk.addEventListener('click', () => {
           
            noLinkDiv.style.opacity = '0';
            noLinkDiv.style.pointerEvents = 'none';

          });
        
        // Append the message to the .no-link div
        noLinkDiv.appendChild(message);
        noLinkDiv.appendChild(buttonOk);
        

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
    while (selectedIndices.size < 19 && selectedIndices.size < singles.length) {
        const randomIndex = Math.floor(Math.random() * singles.length);

        // Ensure the index hasn't been selected already
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex); // Add the index to the set
            const single = singles[randomIndex]; // Get the single

            // Create elements for the randomly selected single
            const anchor = document.createElement('a');
            anchor.href = `Song.html?song=${single.id}`; 

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.id = 'image';
            img.src = single.image;
            img.alt = `${single.single}`;
            img.classList.add('skeleton');

            const singleElement = document.createElement('p');
            singleElement.id = 'single-name';
            singleElement.innerText = `${single.name}`;

            const singleName = document.createElement('p');
            singleName.id = 'single-name';
            singleName.innerText = `${single.single}`;

            const date = document.createElement('p');
            date.id = 'date-mod';
            date.innerText = `${single.date}`;
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