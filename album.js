function getAlbumIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('album');
    return index ? parseInt(index) : 1; // Default to 1 if no index is provided
}

// Function to display song details
function showAlbumDetails(index) {
    // Ensure the index is within the valid range of the singles array
    if (index < 1 || index > albums.length) {
        console.error('Invalid song index:', index);
        return;
    }

    const album = albums[index - 1]; // Get single by index (adjust for zero-based array)
    if (!album) {
        console.error('Single not found at index:', index);
        return;
    }


    document.getElementById('album-name').innerText = album.name;
    document.getElementById('album-album').innerText = album.album;
    document.getElementById('album-description').innerText = album.description;
    document.getElementById('album-image').src = album.image;
    document.getElementById('album-composer').innerText = `Composer: ${album.composer}`;
    document.getElementById('album-date').innerText = `Released On: ${album.date}`;


      // Get YouTube and Geniux buttons by their dynamic IDs
      const youtubeButton = document.getElementById(`youtube-url`);
      const geniuxButton = document.getElementById(`geniux-url`);

      // Add event listener for YouTube button
      if (youtubeButton) {
          youtubeButton.addEventListener('click', function() {
              redirectToPlatform(album, 'YouTube');
          });
      }

      // Add event listener for Geniux button
      if (geniuxButton) {
          geniuxButton.addEventListener('click', function() {
              redirectToPlatform(album, 'Geniux Music');
          });
      }
  


    const albumImage = document.getElementById('album-image');
    const highlightAlbumImage = document.getElementById('highlight-album-image');
    if (albumImage && album.url) {
            albumImage.style.cursor = 'pointer';
            albumImage.addEventListener('click', () => {
                    window.location.href = album.url; 
                    });
        }
    else if (highlightAlbumImage && album.url) {
        highlightAlbumImage.style.cursor = 'pointer';
                highlightAlbumImage.addEventListener('click', () => {
                    window.location.href = album.url;
                });
    }

    const trackList = document.getElementById('tracklist');
        trackList.innerHTML = ''; 
            album.albumTrackList.forEach((qa, idx) => {
            const listEl = document.createElement('p');
            listEl.id = 'album-composer';
            listEl.innerText = qa.track;
            trackList.appendChild(listEl);
    
        });
    }




const albumIndex = getAlbumIndex();
if (albumIndex) {
    showAlbumDetails(albumIndex);
}

const noLinkDiv = document.querySelector('.no-link');
noLinkDiv.style.opacity = '0';
noLinkDiv.style.pointerEvents = 'none';





function redirectToPlatform(album, platform) {
    let url = ''; 

    if (platform === 'YouTube') {
        url = album.youtubeUrl;
    } else if (platform === 'Geniux Music') {
        url = album.geniuxUrl;
    }

    if (url && url !== "") {
        // Open the URL in a new tab if available
        window.open(url, '_blank');
    } else {

        noLinkDiv.style.opacity = '1';
        noLinkDiv.style.pointerEvents = 'auto';
        noLinkDiv.innerHTML = '';
        // Create a message element
        const message = document.createElement('p');
        message.textContent = `This album isn't available on ${platform}, but you can try listening on the other platform provided!`;
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
    albums.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear the container
    SingleImageContainer.innerHTML = '';

    // Select up to 4 unique singles
    while (selectedIndices.size < 7 && selectedIndices.size < albums.length) {
        const randomIndex = Math.floor(Math.random() * albums.length);

        // Ensure the index hasn't been selected already
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex); // Add the index to the set
            const album = albums[randomIndex]; // Get the single

            // Create elements for the randomly selected single
            const anchor = document.createElement('a');
            anchor.href = `Album.html?album=${album.id}`; 

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.id = 'image';
            img.src = album.image;
            img.alt = `single ${album.id}`;

            const singleElement = document.createElement('p');
            singleElement.id = 'single-name';
            singleElement.innerText = `${album.name}`;

            const singleName = document.createElement('p');
            singleName.id = 'single-name';
            singleName.innerText = `${album.album}`;

            const date = document.createElement('p');
            date.id = 'date-mod';
            date.innerText = `${album.date}`;
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