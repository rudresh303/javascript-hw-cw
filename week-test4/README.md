# Phone Hunting API
  This project is a user-friendly application for searching and viewing details about various phones. Users can enter a phone brand or model in the search bar, view matching results, and click on a specific phone for detailed information in a modal window.
## Project Features
### 1. Search Functionality
       -Users can type a phone brand or model into the search bar and hit "Search."
       -The app queries the Phone API with the search term and displays relevant results. 
        If the results exceed 12, a "Show All" button appears to load more results.
### 2. Modal Display
       -Each phone card has a "Show Details" button. When clicked, a modal dialog opens, 
        showing detailed specifications and the release date.
       -The modal can be closed by clicking the "Close" button, enhancing user experience with easy navigation.
### 3. Loading Indicator
       -A loading spinner appears while the API fetches data to enhance UX.
       -The spinner is hidden once the results load, providing a smooth transition for the user.

# JavaScript Functions Explained
## searchHandler(isShowAll)
    -Purpose: Triggers when the "Search" or "Show All" button is clicked,
              capturing the search input and calling loadPhone to fetch data.
    -Parameter: isShowAll (boolean) – determines whether to display all results or a limited number.
## loading(isLoading)
    -Purpose: Controls the visibility of the loading spinner based on the isLoading parameter.
    -Parameter: isLoading (boolean) – true displays the spinner, false hides it.
## loadPhone(searchText, isShowAll)
    -Purpose: Fetches phones matching the searchText from the Phone API.
    -Parameters:
       searchText (string) – the search term entered by the user.
       isShowAll (boolean) – limits the results to 12 if false, otherwise shows all.
       Process: Fetches data from the API, then calls displayPhones to render it.
## displayPhones(phones, isShowAll)
    -Purpose: Renders phone data into cards in the UI.
    -Parameters:
      phones (array) – the array of phone objects returned by the API.
      isShowAll (boolean) – determines whether to display all results or a limited selection.
      Process: It clears previous results, checks if more than 12 results exist, and adds a "Show All" button if needed.
## showBtn()
    -Purpose: Loads all available results when the "Show All" button is clicked.
    -Process: Calls searchHandler with true to override the 12-item limit.
## showDetailsHandler(id)
    -Purpose: Fetches and displays detailed information about a selected phone in a modal.
    -Parameter: id (string) – a unique identifier for the phone.
    -Process: Calls the API with the phone’s id, retrieves details, and invokes showPhoneDetails to populate the modal.
## showPhoneDetails(details)
    -Purpose: Populates the modal with detailed phone specifications and the release date.
    -Parameter: details (object) – contains information about the selected phone, including name, brand, image, and specifications.
