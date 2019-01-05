# javascript-bookmarker-app

A simple app to bookamark(save) a user's favourite websites in localStorage.
# https://javascript-bookmarker-app--tyronita.repl.co/

A user can input and submit said website's name and url in a form.
All bookmarks are rendered and displayed below the form with 3 buttons:
one to update the bookmark's information,
one to delete the bookmark itself
and one for visiting the website.

The app uses bootstrap to style the bookmark's buttons.
Each bookmark is also supplied with a universally unique identifier which is supplied by a function in the third party library file: 'uuidv4.js'.
The identifier's purpose is to prevent losing track of bookmark's with identical/duplicate information in order to find and delete specific bookmarks.

Further error handling is planned for the future to make sure a user input's a valid url.
