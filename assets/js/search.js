let articles = [];
let isDataLoaded = false;

// Load search index
fetch("data/search-index.json")
    .then(response => response.json())
    .then(data => {
        articles = data || [];
        isDataLoaded = true;
    })
    .catch(err => {
        console.error("Failed to load search index:", err);
        articles = [];
    });

/**
 * Safe search function
 */
function searchArticles(query) {

    if (!query || !query.trim()) {
        return [];
    }

    query = query.toLowerCase().trim();

    return articles.filter(article => {

        const title = (article.title || "").toLowerCase();
        const summary = (article.summary || "").toLowerCase();
        const tags = Array.isArray(article.tags) ? article.tags : [];

        return (
            title.includes(query) ||
            summary.includes(query) ||
            tags.some(tag => (tag || "").toLowerCase().includes(query))
        );

    });
}

/**
 * Render results safely
 */
function renderResults(results) {

    const container = document.getElementById("results");

    if (!container) return;

    if (!results.length) {
        container.innerHTML = `
            <p class="no-results">No results found.</p>
        `;
        return;
    }

    container.innerHTML = results.map(article => `
        <div class="card">
            <h3>
                <a href="${article.url}">
                    ${article.title || "Untitled"}
                </a>
            </h3>
            <p>
                ${article.summary || ""}
            </p>
        </div>
    `).join("");
}

/**
 * Debounce to prevent excessive rendering
 */
function debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Listen to typing
const searchBox = document.getElementById("searchBox");

if (searchBox) {

    const handleInput = debounce(() => {

        if (!isDataLoaded) return;

        const query = searchBox.value;

        const results = searchArticles(query);

        renderResults(results);

    }, 200);

    searchBox.addEventListener("input", handleInput);
}
