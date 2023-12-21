const container = document.getElementById('mang-container');
function searchManga() {
  const input = document.getElementById('search-input').value.trim(); 
  
  if (input !== '') {
    container.innerHTML = ''; 

    fetch(`https://api.mangadex.org/manga?title=${input}&includes[]=cover_art`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          data.data.forEach((result) => {
            const title = result.attributes.title.en || 'Title not available';
            const description = result.attributes.description.en || 'Description not available';
            const mangaId = result.id;

            const fileName =
              result.relationships &&
              result.relationships[2] &&
              result.relationships[2].attributes &&
              result.relationships[2].attributes.fileName;

            const mangaInfo = document.createElement('div');
            mangaInfo.innerHTML = `
              <h1>${title}</h1>
              <img src="https://uploads.mangadex.org/covers/${mangaId}/${fileName || ''}" onerror="this.onerror=null; this.src='';">
              <p>${description}<br></p>

            `;
            container.appendChild(mangaInfo);
          });
        } else {
          container.innerHTML = '<p>No manga found</p>';
        }
      })
      .catch((err) => console.error(err));
  } else {
    container.innerHTML = '';
  }
}


document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  searchManga();
});
