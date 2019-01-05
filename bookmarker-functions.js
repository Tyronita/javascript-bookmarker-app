const saveBookmarks = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

// Fetch bookmarks data from local storage or return an empty array
const fetchBookmarksData = () => {
    const JSONbookmarks = localStorage.getItem('bookmarks')
    try {
        return JSONbookmarks ? JSON.parse(JSONbookmarks) : []
    } catch (e) {
        return []
    }
}

const deleteBookmark = (bmID) => {
    // Find the index of the bookmark via matching the unique IDs
    const bookmarkIndex = bookmarks.findIndex((bookmark) => bmID === bookmark.id)
    // If found:
    if (bookmarkIndex > -1) {
        bookmarks.splice(bookmarkIndex, 1)
    }
}

const generateBookmarkDOM = (bookmark) => {
    // Create the elements
    const bookmarkElement = document.createElement('div')
    const bookmarkName = document.createElement('span')
    const visitButton = document.createElement('button')
    const updateButton = document.createElement('button')
    const nameLabel = document.createElement('label')
    const nameInput = document.createElement('input')
    const urlLabel = document.createElement('label')
    const urlInput = document.createElement('input')
    const deleteButton = document.createElement('button')

    // Setup:

    // The bookmark name
    bookmarkName.textContent = bookmark.name 
    bookmarkName.className = 'bookmark-name'
    bookmarkElement.appendChild(bookmarkName)

    // Edit Bookmark Inputs -

    // Website name:
    nameLabel.textContent = 'Name: '
    nameInput.setAttribute('type','text')
    nameInput.className = 'edit-bookmark-input'
    nameLabel.className = 'edit-bookmark-label'
    nameLabel.appendChild(nameInput)
    nameLabel.style.display ='none'
    // Website Url:
    urlLabel.textContent = 'Url: '
    urlInput.setAttribute('type', 'url')
    urlInput.className = 'edit-bookmark-input'
    urlLabel.className = 'edit-bookmark-label'
    urlLabel.appendChild(urlInput)
    urlLabel.style.display = 'none'

    // The edit button
    updateButton.textContent = 'Edit'
    updateButton.className = 'btn btn-info' // Bootsrtap styling
    bookmarkElement.appendChild(updateButton)

    updateButton.addEventListener('click', (e) => {
        // update button's text content set once in 'bookmarker-app.js'
        if (e.target.textContent === 'Edit') {

            // Update Task
            e.target.textContent = 'Update'
            // Replace the bookmark name with the inputs for updating
            bookmarkName.style.display = 'none'
            nameLabel.style.display = 'inline-block'
            urlLabel.style.display = 'inline-block'
            bookmarkElement.insertBefore(urlLabel, updateButton)
            bookmarkElement.insertBefore(nameLabel, urlLabel)
            // Put in the values to edit
            nameInput.value = bookmark.name
            urlInput.value = bookmark.url
            // Hide the visit button
            visitButton.style.display = 'none'

        }

        else if (e.target.textContent === 'Update') {
            e.target.textContent = 'Edit'

            // Save inputted data
            bookmark.name = nameInput.value
            bookmark.url = urlInput.value
            saveBookmarks(bookmarks)
            //Instead of rerendering just set the bookmark name
            bookmarkName.textContent = bookmark.name

            bookmarkName.style.display = 'inline-block'
            nameLabel.style.display = 'none'
            urlLabel.style.display = 'none'

            // Set the bookmark div back to its default
            visitButton.style.display = 'inline-block'
        }
    })

    // Delete Button
    deleteButton.textContent = 'Delete'
    deleteButton.className = 'btn btn-danger' // Bootsrtap styling
    bookmarkElement.appendChild(deleteButton)
    // Event - deletes the specific bookmark
    deleteButton.addEventListener('click', () => {
        deleteBookmark(bookmark.id) // Removes the bookmarks
        saveBookmarks(bookmarks) // Saves it 
        renderBookmarks(bookmarks)// rerenders
    })

    // The visit button
    visitButton.textContent = 'Visit'
    visitButton.className = 'btn btn-success' // Bootsrtap styling
    visitButton.setAttribute('title', bookmark.url)
    bookmarkElement.appendChild(visitButton)
    // Event - opens the bookmarks's saved url in a new tab
    visitButton.addEventListener('click', () => {
        window.open(bookmark.url);
    })

    bookmarkElement.className = 'bookmark'
    return bookmarkElement
}

// Render the bookmarks and print to display
const renderBookmarks = (bookmarks) => {

    const bookmarkArea = document.querySelector('#rendered-bookmarks')
    // Clear the area before appending bookmark element
    bookmarkArea.innerHTML = ''

    // Loop through every bookmark and print them into a div
    bookmarks.forEach((bookmark) => {
        bookmarkArea.appendChild(generateBookmarkDOM(bookmark))
    })

}