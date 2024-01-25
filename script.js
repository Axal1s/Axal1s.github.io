const movies = [
    {
        id: 1,
        title: `The Marvels`,
        imgUrl: 'https://m.media-amazon.com/images/M/MV5BM2U2YWU5NWMtOGI2Ni00MGMwLWFkNjItMjgyZWMxNjllNTMzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
        desc: `Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. However, unintended consequences see her shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with two other superheroes to form the Marvels.`,
        bookedSeats: ['seat-1', 'seat-17', 'seat-10']
    },
    {
        id: 2,
        title: `How to Train your Dragon`,
        imgUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg',
        desc: `Hiccup (Tawin Yavapolkul) is a Norse teenager from the island of Berk, where fighting dragons is a way of life. His progressive views and weird sense of humor make him a misfit, despite the fact that his father (Kongkrapunt Sangsuriya) is chief of the clan. Tossed into dragon-fighting school, he endeavors to prove himself as a true Viking, but when he befriends an injured dragon he names Toothless, he has the chance to plot a new course for his people's future.`,
        bookedSeats: ['seat-3', 'seat-4', 'seat-9', 'seat-12', 'seat-13']
    },
    {
        id: 3,
        title: `Guardians of The Galaxy`,
        imgUrl: `https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_.jpg`,
        desc: `Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. To evade Ronan, Quill is forced into an uneasy truce with four disparate misfits: gun-toting Rocket Raccoon, treelike-humanoid Groot, enigmatic Gamora, and vengeance-driven Drax the Destroyer. But when he discovers the orb's true power and the cosmic threat it poses, Quill must rally his ragtag group to save the universe.`,
        bookedSeats: []
    },
    {
        id: 4,
        title: `My Neighbor Totoro`,
        imgUrl: `https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg`,
        desc: `This acclaimed animated tale by director Hayao Miyazaki follows schoolgirl Satsuke and her younger sister, Mei, as they settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.`,
        bookedSeats: [],
    }
]

let arraySelected = [];
let movieIDGlobal;

let sectionLandingPage = document.getElementById('landing-page');
let sectionAddMovie = document.getElementById('add-movie');
let sectionBooking = document.getElementById('seat-booking')

let containerMovies = document.getElementById('container-movies');

let addMovieButton = document.getElementById('add-movie-button');
let bookTicketButton = document.getElementById('submit-booked-ticket')

addMovieButton.addEventListener('click', () => {
    sectionAddMovie.style.display = 'flex';
    sectionLandingPage.style.display = 'none'
    sectionBooking.style.display = 'none';
})

function renderLandingPage() {
    sectionAddMovie.style.display = 'none';
    sectionBooking.style.display = 'none'
    sectionLandingPage.style.display = 'flex';
    

    containerMovies.innerHTML = '';
    for (let i = 0; i < movies.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class='inner-movie'>
            <div class="front-movie">
                <img src="${movies[i].imgUrl}"></img>
            </div>
            <div class="back-movie">
                <p>${movies[i].title}</p>
                <p>${movies[i].desc}</p>
                <button class ="submit-btn" onclick="seatBooking(${movies[i].id})">Book Your Ticket Now!</button>
            </div>
        </div>
        `
        newDiv.setAttribute('id', `movie-${movies[i].id}`)
        newDiv.setAttribute('class', 'movies')
        containerMovies.append(newDiv);
    }
}

renderLandingPage();

let submitMovieButton = document.getElementById('submit-create-movie');

submitMovieButton.addEventListener('click', (event) => {
    submitForm(event);
})

function submitForm(event){
    event.preventDefault();

    let form = document.getElementById('form-add-movie');
    
    console.log(form['movie-title'].value)

    let movieObject = {
        id: movies[movies.length - 1].id + 1,
        title: form['movie-title'].value,
        imgUrl: form['movie-img-url'].value,
        desc: form['movie-desc'].value,
        bookedSeats: []
    }

    movies.push(movieObject);
    renderLandingPage();
}

let theatreSeat = document.getElementById('theatre');

function seatBooking(movieID){
    sectionAddMovie.style.display = 'none';
    sectionLandingPage.style.display = 'none';
    sectionBooking.style.display = 'flex';

    // console.log(movieID);

    let seatNumber = 1;
    
    let movie = movies.find((el) => {
        return el.id === movieID;
    })

    movieIDGlobal = movie.id;

    let bookedSeats = movie.bookedSeats;
    
    theatreSeat.innerHTML =
    `
    <h1>Choose your seat</h1>
    <div id="screen"></div>
    `
    ;

    
    
    for(let i = 0; i < 6; i++){
        let newRow = document.createElement('div');
        newRow.setAttribute('id', `row-${i+1}`)
        newRow.setAttribute('class', `rows`)
        for(let j = 0; j < 10; j++){
            if(j === 2 || j === 7){
                let newSeat = document.createElement('div');
                newSeat.setAttribute('class', `not-seat`)
                newRow.append(newSeat);
            }else{
                let newSeat = document.createElement('div');
                newSeat.setAttribute('id', `seat-${seatNumber}`)
                newSeat.setAttribute('class', `seats unbooked`)

                let seatIsBooked = false;

                for(let i = 0 ; i < bookedSeats.length; i++){
                    if(bookedSeats[i] === `seat-${seatNumber}`){
                        newSeat.setAttribute('class', 'seats booked');
                        console.log(bookedSeats[i]);
                        seatIsBooked = true;
                    }
                }
                // kalau belum kebooking
                //     tambahkan div newSeat nya addEventListener
                if(seatIsBooked === false){
                    newSeat.addEventListener('click', () => {
                        seatOnClick(movie.id, newSeat.getAttribute('id'));
                    })
                    
                }
                
                newRow.append(newSeat);
                
                seatNumber++;
            }
        }
        theatreSeat.append(newRow);
    }

    bookTicketButton.addEventListener('click', (event) => {
        submitBookingTicket(event, movie.id) ;
    })

}

function seatOnClick(movieID, seatID){
    let seat = document.getElementById(seatID)
    let tempArray;
    console.log(seat.getAttribute('class'));
    if(seat.getAttribute('class') === 'seats unbooked'){
        seat.setAttribute('class', 'seats selected');
        arraySelected.push(seatID);
    }else{
        seat.setAttribute('class', 'seats unbooked');
        tempArray = arraySelected.filter(el => el !== seatID);
        arraySelected = tempArray;
    }

    console.log(arraySelected);
}


function submitBookingTicket(event, movieID){
    event.preventDefault();
    let movie = movies.find((el) => {
        return el.id === movieID;
    })

    arraySelected.forEach(el => {
        movie.bookedSeats.push(el)
    })

    alert(`${arraySelected.join(', ')} has been booked `);
    arraySelected = [];
    renderLandingPage();
    // console.log(event, movieID, movie.bookedSeats);
}