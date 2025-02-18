window.addEventListener('DOMContentLoaded', function () {
    const AlbumImageContainer = document.getElementById('album-image');
    albums.sort((a, b) => new Date(b.date) - new Date(a.date));

    AlbumImageContainer.innerHTML = '';


    albums.forEach(album => {

    const anchor = document.createElement('a');
    anchor.href = `Album.html?album=${album.id}`;  


        const img = document.createElement('img');
        img.id = 'image';
        img.src = album.image;  
        img.alt = `${album.album}`; 
        img.loading = 'lazy';
        img.classList.add('skeleton');
        
        const coverElement = document.createElement('p');
        coverElement.id = 'cover-name';
        coverElement.innerText = `${album.name}`

        const albumName = document.createElement('p');
        albumName.id = 'album-name';
        albumName.innerText = `${album.album}`
        
        
        anchor.appendChild(img);
        anchor.appendChild(coverElement);
        anchor.appendChild(albumName);

            // Append the <a> to the container
        AlbumImageContainer.appendChild(anchor);
    });

});



window.addEventListener('DOMContentLoaded', function () {
    const SingleImageContainer = document.getElementById('all-singles-image');
    singles.sort((a, b) => new Date(b.date) - new Date(a.date));

        SingleImageContainer.innerHTML = '';

    singles.forEach(single => {
        const anchor = document.createElement('a');
        anchor.href = `Song.html?song=${single.id}`;  
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.id = 'image';
        img.src = single.image;  
        img.alt = `${single.single}`; 
        img.loading = 'lazy';
        img.classList.add('skeleton');


        
        const singleElement = document.createElement('p');
        singleElement.id = 'single-name';
        singleElement.innerText = `${single.name}`

        const singleName = document.createElement('p');
        singleName.id = 'single-name';
        singleName.innerText = `${single.single}`

        const date = document.createElement('p');
        date.id = 'date-mod';
        date.innerText = `${single.date}`
                
        anchor.appendChild(img);
        anchor.appendChild(div);
        div.appendChild(singleElement);
        div.appendChild(singleName);
        div.appendChild(date);

            // Append the <a> to the container
        SingleImageContainer.appendChild(anchor);
        });
    });

window.addEventListener('DOMContentLoaded', function () {
    const BeatImageContainer = document.getElementById('beats-image');
    beats.sort((a, b) => new Date(b.date) - new Date(a.date));

        BeatImageContainer.innerHTML = '';

    beats.forEach(beat => {

        const anchor = document.createElement('a');
        anchor.href = `Beat.html?beat=${beat.id}`;  

        const img = document.createElement('img');
        img.id = 'image';
        img.src = beat.image;  
        img.alt = `${beat.beat}`; 
        img.loading = 'lazy';
        img.classList.add('skeleton');
        
        const coverElement = document.createElement('p');
        coverElement.id = 'cover-name';
        coverElement.innerText = `${beat.name}`

        const albumName = document.createElement('p');
        albumName.id = 'album-name';
        albumName.innerText = `${beat.beat}`
        
        
        anchor.appendChild(img);
        anchor.appendChild(coverElement);
        anchor.appendChild(albumName);

            // Append the <a> to the container
        BeatImageContainer.appendChild(anchor);
        });
    });


window.addEventListener('DOMContentLoaded', function () {
    const MixtapeImageContainer = document.getElementById('mixtape-image');
    mixtapes.sort((a, b) => new Date(b.date) - new Date(a.date));
    MixtapeImageContainer.innerHTML = '';


    mixtapes.forEach(mixtape => {

        const anchor = document.createElement('a');
        anchor.href = `Mixtape.html?mixtape=${mixtape.id}`;  
        const div = document.createElement('div');

        const img = document.createElement('img');
        img.id = 'image';
        img.src = mixtape.image;  
        img.alt = `${mixtape.mixtape}`;
        img.loading = 'lazy'; 
        img.classList.add('skeleton');
        
        const singleElement = document.createElement('p');
        singleElement.id = 'single-name';
        singleElement.innerText = `${mixtape.name}`

        const singleName = document.createElement('p');
        singleName.id = 'single-name';
        singleName.innerText = `${mixtape.mixtape}`

        const date = document.createElement('p');
        date.id = 'date-mod';
        date.innerText = `${mixtape.date}`
                    
        anchor.appendChild(img);
        anchor.appendChild(div);
        div.appendChild(singleElement);
        div.appendChild(singleName);
        div.appendChild(date);

        MixtapeImageContainer.appendChild(anchor);
        });
    });

