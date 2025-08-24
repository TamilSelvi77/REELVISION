// Predefined searchable keywords (titles, genres, actors, etc.)
const searchableContent = [
    "it ends with us", "my oxford year", "my life list", "the greatest showman",
    "la la land", "beauty and the beast", "the circle", 
    "harry potter and the order of the phoenix", "the conjuring", "until dawn", "evil dead rise",
    "fantastic beasts: the secrets of dumbledore", "megan",
    "romance", "fiction", "comedy", "msical", "spy", "thriller", "melodrama", "fantasy",
    "adventure", "suspense", "magic", "horror", "mystery", "supernatural", "action", "sci-fi",
    "idris elba", "charlie hunnam", "rinko kikuchi", "sofia carson", "corey mylchreest", 
    "dougray scott", "kyle allen", "sebastian de souza", "hugh jackman", "michelle williams", 
    "ryan gosling", "emma stone", "rosemarie dewitt", "emma watson",
    "dan stevens", "luke evans", "tom hanks", "john boyega", "daniel radcliffe", 
    "rupert grint", "patrick wilson", "vera farmiga", "ron livingston", 
    "ella rubin", "michael cimino", "odessa a'zion",
    "mirabai pease", "richard crouchley", "anna-maree thomas", "eddie redmayne", 
    "jude law", "ezra miller", "allison williams", "violet mcgraw", "ronny chieng",
    "2013", "2025", "2016", "2017", "2007", "2023", "2022"
];

function showloader() {
    // Show circular loading animation
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "block";
    }
}

// Homepage navigation search
document.getElementById('search-button').addEventListener("click", () => {
    const query = document.getElementById("search-bar").value.toLowerCase().trim();

    if (query) {
        const match = searchableContent.some(item => item.includes(query));

        showloader(); // Show the spinner before the delay starts

        setTimeout(() => {
            if (match) {
                // Match found, go to movielist.html and pass query
                window.location.href = `movielist.html?search=${encodeURIComponent(query)}`;
            } else {
                // No match, go directly to NotFound.html
                window.location.href = "NotFound.html";
            }
        }, 1000); // simulate loading delay
    } else {
        alert("Please input a query");
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none"; // hide loader if no query
    }
});

// Filter movies based on search query in movielist.html
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");

    if (query) {
        // Hide <h1> and <hr> elements
        hideElements();

        // Create result container
        const result = document.createElement("div");
        result.style.display = "flex";
        result.style.flexWrap = "wrap";
        result.style.justifyContent = "center";
        result.style.gap = "20px";

        // Place result before footer if available, otherwise at end of body
        const footer = document.querySelector("footer");
        if (footer) {
            document.body.insertBefore(result, footer);
        } else {
            document.body.appendChild(result);
        }

        // Filter and display movies
        const movies = document.querySelectorAll('.movie');
        movies.forEach(movie => {
            const text = movie.innerText.toLowerCase();
            movie.style.display = text.includes(query) ? "flex" : "none";

            // Add movie into result container
            result.appendChild(movie);
            movie.style.flexDirection = "column";
            movie.style.justifyContent = "space-evenly";
            movie.style.alignItems = "center";
        });
    }
});

function hideElements() {
    // Hide all <hr> and <h1> elements
    const hrElements = document.querySelectorAll('hr');
    const h1section = document.querySelectorAll('h1');

    hrElements.forEach(hr => {
        hr.style.display = 'none';
    });

    h1section.forEach(h1 => {
        h1.style.display = 'none';
    });
}
