import reddit from './redditapi.js';

const SearchForm = document.querySelector('#search-form');
const SearchInput = document.querySelector('#search-input');

SearchForm.addEventListener('submit', (e) => {

  //Ricerca Termini
  const searchTerm = SearchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.querySelector('#limit');


 //verfica input

 if (searchTerm == '') {
   showMessage('Per favore aggiungi un termine alla tua ricerca', 'alert-danger')
 }

  SearchInput.value = '';

  reddit.search(searchTerm, searchLimit, sortBy)
    .then( results => {
      let output = '<div class="card-columns">';
      results.forEach(post => {
        let image = post.preview ? post.preview.images[0].source.url : 'https://miro.medium.com/max/3840/1*e3E0OQzfYCuWk0pket5dAA.png';
        output += `
          <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${textHalf(post.selftext, 100)}</p>
            <a href="${post.url}" target='_blank' class="btn btn-primary">Leggi di più</a>
            <hr>
            <span class='badge badge-secondary'>Subreddit: ${post.subreddit}</span>
            <span class='badge badge-dark'>Score: ${post.score}</span>
          </div>
          </div>
        `;
      });
      output += '</div>';
      document.querySelector('#results').innerHTML = output;
    });

  e.preventDefault();
});



function showMessage(message, className){
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.querySelector('#search-container');
  const search = document.querySelector('#search');

  searchContainer.insertBefore(div, search);

  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000);
}

function textHalf(txt, limit){
  const short = txt.indexOf(' ', limit);
  if (short == -1) {
    return txt;
  }
return txt.substring(0,short);
}
