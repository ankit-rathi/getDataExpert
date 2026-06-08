let articles = [];

// Load search index
fetch("/data/search-index.json")
    .then(response => response.json())
    .then(data => {
        articles = data;
    });

// Search function
function searchArticles(query) {

    return articles.filter(article =>

        article.title
               .toLowerCase()
               .includes(query.toLowerCase())

    );

}
