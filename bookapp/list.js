let list = document.querySelector(".list");
let card = document.querySelector(".card");
let data;

window.addEventListener("load", () => {
  console.log("loaded");
  display_all();

  (async function listFetch() {
    let fetched = await fetch(
      "https://books-backend.p.goit.global/books/category-list"
    );
    data = await fetched.json();
    list.innerHTML += `
      <p class="list_item" onclick="display_all()">All Categories</p>
    `;
    data.forEach((element) => {
      let elementJSON = JSON.stringify(element).replace(/"/g, '&quot;');
      list.innerHTML += `
        <p class="list_item" onclick="display('${elementJSON}')">${element.list_name}</p>
      `;
    });
  })();
});

let book_data;

function display(elementJSON) {
  let element = JSON.parse(elementJSON.replace(/&quot;/g, '"'));
  
  async function get_books(element) {
    try {
      let response = await fetch('https://books-backend.p.goit.global/books/top-books');
      book_data = await response.json();
      card.innerHTML = '';
      book_data.forEach(book => {
        if (book.list_name.includes(element.list_name)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach(detail => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  get_books(element);
}

function displayCat(elementBook) {
  async function get_books(elementBook) {
    try {
      let response = await fetch("https://books-backend.p.goit.global/books/top-books");
      book_data = await response.json();
      card.innerHTML = "";
      book_data.forEach((book) => {
        if (book.list_name.includes(elementBook)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach((detail) => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  get_books(elementBook);
}

async function display_all() {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/top-books");
    book_data = await response.json();
    card.innerHTML = "";
    book_data.forEach((book) => {
      card.innerHTML += `<h1>${book.list_name}</h1>`;
      let counter = 0;
      book.books.forEach((detail) => {
        if (counter <= 3) {
          cardCreate(detail.book_image, detail.author, detail.title);
          counter++;
        }
      });
      let create_btn = document.createElement('div');
      create_btn.className = 'create_btn';
      let elementBook = JSON.stringify(book.list_name).replace(/"/g, "&quot;");
      create_btn.innerHTML += `<button onclick="displayCat(${elementBook})">Show More</button>`;
      card.appendChild(create_btn);
    });
    addCardClickListeners();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function cardCreate(img, author, title) {
  card.innerHTML += `
    <div class="cards">
      <img src="${img}" alt="">
      <div class="detail">
        <h4>${author}</h4>
        <p><i>${title}</i></p>
      </div>
    </div>
  `;
}

function addCardClickListeners() {
  let cards = document.querySelectorAll(".cards");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      let img = card.querySelector("img").src;
      let author = card.querySelector("h4").innerText;
      let title = card.querySelector("p").innerText;
      showCardDetails(img, author, title);
    });
  });
}
function showCardDetails(img, author, title) {
    let cardDetail = document.querySelector(".card-detail");
    cardDetail.innerHTML = `
      <div class="card-detail-content" style="
        width: 600px; 
        max-width: 90%; /* Ensures responsiveness */
        height: 500px; 
        background-color: #f0f0f5; 
        padding: 20px; 
        border-radius: 15px; 
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: space-between;
        position: fixed;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        overflow: hidden; /* Prevents content overflow */
      ">
        
        <span class="close-card-detail" style="
          font-size: 24px; 
          color: #888; 
          cursor: pointer; 
          position: absolute; 
          top: 15px; 
          right: 15px;
          transition: color 0.3s ease; /* Smooth color transition */
        ">X</span>
        
        <img src="${img}" alt="" style="
          width: 80%; 
          height: auto; 
          max-height: 250px; 
          border-radius: 10px; 
          margin-top: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds shadow for a 3D effect */
        ">
        
        <h4 style="
          color: #333; 
          font-size: 22px; 
          margin: 15px 0 5px 0; 
          text-align: center;
          font-weight: bold; /* Emphasizes author name */
        ">${author}</h4>
        
        <p style="
          font-style: italic; 
          color: #666; 
          text-align: center; 
          margin: 0 0 20px 0; 
          font-size: 18px;
          max-width: 90%; /* Ensures responsiveness */
        ">${title}</p>
        
        <button style="
          background-color: #ff5733; 
          color: white; 
          padding: 12px 25px; 
          font-size: 18px; 
          font-weight: bold; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          margin-top: auto;
          transition: background-color 0.3s ease; /* Smooth hover effect */
        ">Add to Shopping List</button>
      </div>
    `;
    
    // Overlay styling
    cardDetail.style.display = "flex";
    cardDetail.style.justifyContent = "center";
    cardDetail.style.alignItems = "center";
    cardDetail.style.position = "fixed";
    cardDetail.style.top = "0";
    cardDetail.style.left = "0";
    cardDetail.style.width = "100vw";
    cardDetail.style.height = "100vh";
    cardDetail.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    cardDetail.style.zIndex = "1000";
  
    // Close button event listener
    let closeBtn = cardDetail.querySelector(".close-card-detail");
    closeBtn.addEventListener("click", () => {
      cardDetail.style.display = "none";
    });
    
    // Add hover effects
    closeBtn.addEventListener("mouseover", () => {
      closeBtn.style.color = "#ff5733"; // Change color on hover
    });
    closeBtn.addEventListener("mouseout", () => {
      closeBtn.style.color = "#888"; // Revert color
    });
  
    let addButton = cardDetail.querySelector("button");
    addButton.addEventListener("mouseover", () => {
      addButton.style.backgroundColor = "#e04c2a"; // Darken button on hover
    });
    addButton.addEventListener("mouseout", () => {
      addButton.style.backgroundColor = "#ff5733"; // Revert color
    });
  }
  
  
  