// Fetch and display news articles from the NYTimes API. 
// Format and present the data effectively for a user-friendly experience 



document.addEventListener('DOMContentLoaded', function ()
{
    // Attach event listener to the form
    document.getElementById('newsForm').addEventListener('submit', function (event)
    {
        event.preventDefault(); // prevent form from refreshing page

        const query = document.getElementById('querySearch').value.trim();
        const apiKey = 'YK4Q8bGRNxpeBTOGkdIQcLdMifwRCIWR'; // NYTimes API Key here
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`;

        if (query === '' || query === '/')
        {
            alert('Please enter a valid search term.');
            return;
        }


        fetch(url)
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // parse JSON data
            })
            .then(data =>
            {
                // Check if response exists and contains docs
                if (data.response && data.response.docs)
                {
                    displayArticles(data.response.docs);
                } else
                {
                    displayArticles([]); // No data
                }
            })
            .catch(error =>
            {
                console.error('Error fetching data:', error);
                // Display an error message to the user
                document.getElementById('newsList').innerHTML = '<li>Error fetching articles. Please try again later.</li>';
            });


    });


});




// Event listener for the search button
document.getElementById('searchButton2').addEventListener('click', () =>
{

    const query = document.getElementById('querySearch2').value;
    const apiKey = 'YK4Q8bGRNxpeBTOGkdIQcLdMifwRCIWR'; // NYTimes API Key here
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`;


    if (query != null)
    {

        console.log(`Search value : ${query}`);
        console.log(`URL : ${url}`);

        fetch(url)
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // parse JSON data
            })
            .then(data =>
            {
                // Check if response exists and contains docs
                if (data.response && data.response.docs)
                {
                    displayArticles(data.response.docs);
                } else
                {
                    displayArticles([]); // No data
                }
            })
            .catch(error =>
            {
                console.error('Error fetching data:', error);
                // Display an error message to the user
                document.getElementById('newsList').innerHTML = '<li>Error fetching articles. Please try again later.</li>';
            });
    } else
    {
        alert('Please enter a search query.');
    }
});



function displayArticles(articles)
{
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // clear previous articles

    if (articles.length === 0)
    {
        newsList.innerHTML = '<li>No articles found.</li>';
        return;
    }

    articles.forEach(article =>
    {
        const li = document.createElement('li');
        const headline = article.headline.main;
        const snippet = article.snippet;
        const url = article.web_url;

        // Construct the HTML for each article
        li.innerHTML = `
            <a href="${url}" target="_blank" rel="noopener noreferrer">${headline}</a>
            <p>${snippet}</p>
        `;
        newsList.appendChild(li);
    });
}
