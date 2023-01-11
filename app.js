let movies = [
    {
        watched : true,
        name : "The mummy",
        year : 1999,
        country : "SAD",
        comment : "Jedan od omiljenih",
        starring : ["Brendan Fraser", "Rachel Weisz"]
    },
    {
        watched : true,
        name : "L.A. Confidential",
        year : 1997,
        country : "SAD",
        comment : "Tematika iz 50-ih, preporuka",
        starring : ["Kevin Spacey", "Russell Crowe", "Kim Basinger", "Guy Pearce"]
    },
    {
        watched : false,
        name : "Top Gun",
        year : 1986,
        country : "SAD",
        comment : "",
        starring : ["Tom Cruise", "Val Kilmer", "Kelly McGillis"]
    }
];


function renderData() {

    let movIndex = 0;
    let moviesList = document.getElementById("movie-list");
    movies.forEach(function (movie) {

        let mov = document.createElement("tr");
        let watched = document.createElement("td");
        if(movie.watched === true){
            watched.innerHTML = `<input type="checkbox" id=${movIndex} value="true" checked onclick=checker(${movIndex})>`;
            mov.id = 'mov'+movIndex;        // povezivanje reda sa tacno onim filmom koji se u njemu prikazuje
            mov.classList.remove('watched-f')
            mov.classList.add("watched-t")
        }
        else{
            watched.innerHTML =  `<input type="checkbox" id=${movIndex} value="false" onclick=checker(${movIndex})>`;
            mov.id = 'mov'+movIndex;
            mov.classList.remove("watched-t");
            mov.classList.add("watched-f");
        }
        let name = document.createElement("td");
        name.innerText = movie.name;
        let year = document.createElement("td");
        year.innerText = movie.year;
        let country = document.createElement("td");
        country.innerText = movie.country;
        let comment = document.createElement("td");
        comment.innerText = movie.comment;
        let starring = document.createElement("td");
        starring.innerText = movie.starring;

        mov.append(watched, name, year, country, comment, starring);
        moviesList.append(mov);

        movIndex++;
    })

    
}


function checker(movIndex) {
    let row = document.getElementById(`mov${movIndex}`);
    if(movies[movIndex].watched === true){
        movies[movIndex].watched = false;
        row.classList.remove('watched-t');
        row.classList.add('watched-f')
    }
    else{
        movies[movIndex].watched = true;
        row.classList.remove('watched-f');
        row.classList.add('watched-t')
    }
}

function getFormData() {
 
    let newName = document.getElementById('naziv').value;
    let newYear = document.getElementById('godina').value;
    let newCountry = document.getElementById('drzava').value;
    let newComment = document.getElementById('napomena').value;
    let newStarring = document.getElementById('glumci').value;

    let newMovie = {
        name : newName,
        year : newYear,
        country : newCountry,
        comment : newComment,
        starring : newStarring
    }

    return newMovie;

}

function validateFormData(formData) {
    
    if(formData.name === ''){
        document.getElementById('naziv').classList.add('is-invalid');
        document.getElementById('name-alert').removeAttribute('hidden', '');
        return false;
    }
    else{
        document.getElementById('naziv').classList.remove('is-invalid');
        document.getElementById('name-alert').setAttribute('hidden', '');
    }

    if(formData.year < 1930 || formData.year > 2021){
        document.getElementById('godina').classList.add('is-invalid');
        document.getElementById('year-alert').removeAttribute('hidden', '');
        return false;
    }
    else{
        document.getElementById('godina').classList.remove('is-invalid');
        document.getElementById('year-alert').setAttribute('hidden', '');
    }

    if (formData.starring.length < 1) {
        document.getElementById('glumci').classList.add('is-invalid');
        document.getElementById('starring-alert').removeAttribute('hidden', '');
        return false;
    }
    else{
        document.getElementById('glumci').classList.remove('is-invalid');
        document.getElementById('starring-alert').setAttribute('hidden', '');
    }

    return true;

}

function addNewMovie(){

    let data = getFormData();

    let isValidated = validateFormData(data);

    if (isValidated) {

        let starringArr = data.starring.split(',');
        let starringArr1 = [];
        
        for(let i = 0; i < starringArr.length; i++){
            starringArr1[i] = starringArr[i].trim();
        }

        let newMov = {
            watched : false,
            name : data.name,
            year : data.year,
            country : data.country,
            comment : data.comment,
            starring : starringArr1
        }

        movies.push(newMov);
        document.getElementById('addMovieForm').reset();
        document.getElementById('movie-list').innerHTML = '';
        renderData();

    }

}

function resetModal() {
    document.getElementById('addMovieForm').reset();
}

renderData();