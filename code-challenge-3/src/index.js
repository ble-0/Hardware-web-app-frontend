// Your code here
 
//wait for DOM to load before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Fetch film data after a brief delay and when the page is reloaded
    setTimeout(fetchFilmData, 1000); 
    fetchFilms();
    const backend1 ='http://localhost:3000/films/1' //it fetchs data especially the first film.
});


// Function to fetch data for a specific film
function fetchFilmData() {
    fetch [ backend1] //returns the object
        .then(response => response.json())
        .then(filmData => {
            // Get info from HTML elements
            const title = document.getElementById('title');
            const filmInfo = document.getElementById('film-info');
            const showtime = document.getElementById('showtime');
            const ticketNum = document.getElementById('ticket-num');
            const runtime = document.getElementById('runtime');
            const poster = document.getElementById('poster');
            const buyTicketButton = document.getElementById('buy-ticket');

            // Set film data in the HTML elements
            title.innerText = filmData.title;
            poster.src = filmData.poster;
            filmInfo.innerText = filmData.description;
            runtime.innerText = filmData.runtime; 
            showtime.innerText = filmData.showtime;
            
            // Calculate available 
            ticketNum.innerText = availableTickets;
            const availableTickets =filmData.capacity - filmData.tickets_sold;
            
           
              // sold out tickets  
        if (availableTickets === 0) {
            buyTicketButton.innerText = 'Sold Out';
            document.getElementById(`film-${filmData.id}`).classList.add('sold-out');
        }else {
            buyTicketButton.innerText = 'Buy Ticket';
            const buyTicketButton = document.getElementById('buy-ticket');
            buyTicketButton.textContent = 'Sold Out';
            buyTicketButton.disabled = true; //to disable the button if sold out


            // Add event for buying a ticket
            buyTicketButton.onclick = () => {
                buyTicket(filmData.id);
        };
    }
        });
    }   
    document.addEventListener('DOMContentLoaded', ()=>{  //call function when page is reloaded
        const backend2 = 'http://localhost:3000/films'
        const filmList = document.getElementById('films') //the element in the html file where the films r supposed to be under
    });


       // Function to fetch the list of films
        function fetchFilms() {
            fetch[ backend2]
                .then(response => response.json())
                .then(films => {
                    const movieTitles = document.getElementById('films');
                    movieTitles.innerHTML = '';
        
                    // Loop through each and every film then create list items
                    films.forEach(film => {
                        const filmItem = document.createElement('li');
                        filmItem.className = 'film item';
                        filmItem.id = `film-${film.id}`;
                        filmItem.innerText = film.title; 

                      // Calculate available tickets
                        const availableTickets = film.capacity - film.tickets_sold;
                if (availableTickets === 0) {
                    filmItem.classList.add('sold-out');
                }
                    // Create a delete button for each film
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'delete-btn';
                    li.appendChild(deleteButton)
        
                  deleteButton.addEventListener('click', function(){
                      deleteFilm(li)
                      });

                       // Append items
                     filmItem.appendChild(deleteButton);
                        movieTitles.appendChild(filmItem);
                  

                // Add click event to show film details
                        filmItem.addEventListener('click', () => {
                            alert(`Details for ${film.title}: ${film.description}`); // Show film details in an alert
                        });  


                    });
                });
            }

        // Function to delete a film from the list
    function deleteFilm(filmId, filmItem) {
        // Send DELETE request to the server
        fetch(`http://localhost:3000/films/${filmId}`, {
            method :  'DELETE'
        });
    }

    then(response => response.json())
            if (response.ok) {
        // Remove film item from the DOM
          filmItem.remove();
        };
        
    // Function to buy a ticket for a film
        function buyTicket(filmId){
             // Fetch the film data to check available tickets
            fetch(`http://localhost:3000/films/${filmId}`)
        .then(response => response.json())
        .then(filmData => {
            // Update tickets sold if tickets are available
            const availableTickets = filmData.capacity - filmData.tickets_sold;
            if (availableTickets > 0) {
                const newTicketsSold = filmData.tickets_sold + 1;

                // Send PATCH request to update tickets sold
                fetch(`http://localhost:3000/films/${filmId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tickets_sold: newTicketsSold })
                })
                .then(response => response.json())
                .then(updatedMovie => {
                    updateFilmInfo(updatedMovie);
                });
                // Send POST request to create a ticket record
                fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        film_id: filmId,
                        number_of_tickets: 1
                    })
            });
        }
    });
}
// Function to update film information in the UI
function updateFilmInfo(updatedMovie) {
    const ticketNum = document.getElementById('ticket-num');
    const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
    ticketNum.innerText = availableTickets;

    const buyTicketButton = document.getElementById('buy-ticket');
    if (availableTickets === 0) {
        buyTicketButton.innerText = 'Sold Out';
        filmItem.classList.add('sold-out');
       
    } else {
        buyTicketButton.innerText = 'Buy Ticket';
        
    }
}

     

   
