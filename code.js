const form = document.querySelector('.js-search-form');
/* add event listener takes two arguemtns the first is a dom event and second is the function */
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    //getting the value from the search field
    const inputValue = document.querySelector('.js-search-input').value;
    // removing whitespace
    const searchQuery = inputValue.trim();
    console.log(searchQuery);
}