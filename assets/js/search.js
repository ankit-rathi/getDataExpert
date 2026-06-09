let articles = [];

// Load search index
fetch("data/search-index.json")
    .then(response => response.json())
    .then(data => {
        articles = data;
    });

// Search function
function searchArticles(query) {

    query = query.toLowerCase();

    return articles.filter(article =>

        article.title.toLowerCase().includes(query)

        ||

        article.summary.toLowerCase().includes(query)

        ||

        article.tags.some(tag =>
            tag.toLowerCase().includes(query)
        )

    );

}

// Listen to typing
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {

    const results = searchArticles(searchBox.value);

    document.getElementById("results").innerHTML =
    
        results.map(article =>
    
            `
            <div class="card">
    
                <h3>
                    <a href="${article.url}">
                        ${article.title}
                    </a>
                </h3>
    
                <p>
                    ${article.summary}
                </p>
    
            </div>
            `
    
        ).join("");

});
