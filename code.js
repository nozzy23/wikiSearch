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
        console.log(results);
    } catch (err) {
        console.log(err);
        alert('failed to search Wiki')
    }

    console.log(searchQuery);
}

async function searchWikipedia(searchQuery) {
    const endpoint = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=20&srsearch=SEARCH_QUERY_GOES_HERE'
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw error(response.statusText);
    }
    const json = await response.json();
    return json;
}