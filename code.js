const form = document.querySelector('.js-search-form');
/* add event listener takes two arguemtns the first is a dom event and second is the function */
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    //getting the value from the search field
    const inputValue = document.querySelector('.js-search-input').value;
    // removing whitespace
    const searchQuery = inputValue.trim();
    try {
        const results = await searchWikipedia(searchQuery);
        displayResults(results);
    } catch (err) {
        console.log(err);
        alert('failed to search Wiki')
    }

    console.log(searchQuery);
}

async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw error(response.statusText);
    }
    const json = await response.json();
    return json;
};

function displayResults(results){
    // reference to the element
    const searchResults = document.querySelector('.js-search-results');

    results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
        searchResults.insertAdjacentHTML (
            'beforeend',
            `<div class = 'result-item'>
             <h3 class='result-title'>
              <a href='${url}' target= '_blank' rel= 'noopener'>${result.title}</a>
              </h3>
              <a href= '${url}' class='result-link' target= '_blank' rel= 'noopener'>${url}</a>
              <span class='result-snippet'>${result.snippet}</span><br>
              </div>`
        );
    });
}