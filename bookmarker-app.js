// Array for bookmarks
let bookmarks = fetchBookmarksData()

// Event Listener for adding a bookmark from form
const formElements = document.querySelector('#add-bookmark').elements

// Set the text content for an if condition
document.querySelectorAll('.update-button').textContent = 'Edit'

formElements.submit.addEventListener('click', function (e) {
    e.preventDefault() // Prevents refresh
    // Take the values from inputs and push their object into the bookmarks array
    bookmarks.push({
        id: uuidv4(),
        name: formElements.name.value,
        url: formElements.url.value
    })
    saveBookmarks(bookmarks)
    // Clear the inputs after adding and saving
    formElements.name.value = ''
    formElements.url.value = ''
    renderBookmarks(bookmarks)
})
// Event Listener for removing a bookmark
// https://www.youtube.com/watch?v=DIVfDZZeGxM&pbjreload=10

renderBookmarks(bookmarks)