

let querySearch = document.getElementById("querySearch");

let videoContainer = document.getElementById("videoContainer");

// Get the search query from the input
let query = querySearch.value;

function performSearch(query)
{
    gapi.load('client', () =>
    {
        gapi.client.load('youtube', 'v3', () =>
        {
            var apiKey = 'AIzaSyB5-Q2bLA6pnkB5bZWAGrwbelM8ocOZmX8'; // YouTube API here




            // Call the YouTube search API
            gapi.client.youtube.search.list({
                key: apiKey,
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10
            }).then(function (response)
            {
                var videos = response.result.items; // Get the list of videos
                let videoList = document.getElementById("videoList"); // Reference to the video list element
                videoList.innerHTML = ''; // Clear previous results

                // Loop through the returned videos
                videos.forEach(function (video)
                {
                    console.log('Title:', video.snippet.title);
                    console.log('Video ID:', video.id.videoId);

                    // Create a list item for each video and append it to the video list
                    let listItem = document.createElement("li");
                    listItem.className = "video-item";


                    // Create an iframe element to embed the video
                    let iframe = document.createElement("iframe");
                    iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`; // Set the source to the YouTube embed URL


                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"; // Allow various features
                    iframe.allowFullscreen = true; // Allow fullscreen mode

                    // Append the iframe and title to the list item
                    listItem.appendChild(iframe); // Append the iframe to the list item
                    let title = document.createElement("p"); // Create a paragraph for the title
                    title.textContent = video.snippet.title; // Set text to the video title
                    listItem.appendChild(title); // Append the title to the list item

                    videoList.appendChild(listItem); // Append the list item to the video list





                    //let thumbnail = document.createElement("img");
                    //thumbnail.src = video.snippet.thumbnails.maxres.url; // Set thumbnail src to maxres image
                    //thumbnail.alt = video.snippet.title; // Set alt text for accessibility
                    //thumbnail.style.width = '120px'; // Optional: Set width to make it fit nicely

                    //listItem.textContent = video.snippet.title; // Set text to the video title
                    //listItem.appendChild(thumbnail);
                    //videoList.appendChild(listItem); // Append the list item to the video list
                });
            }, function (err)
            {
                console.error('Error searching videos:', err);
            });
        });
    });
}


document.addEventListener("DOMContentLoaded", function ()
{
    let youtubeForm = document.getElementById("youtubeForm");

    youtubeForm.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        // Get the search query from the input
        let query = querySearch.value;


        if (query != null)
        {
            console.log(`Search Value ,  ${query}`);
            performSearch(query);
        } else
        {
            console.log("Please enter a search term.");
        }

    })

    // Event listener for the search button
    document.getElementById('searchButton').addEventListener('click', () =>
    {
        let query = document.getElementById('querySearch').value; // Get the search query

        // if (query === '' || query === '/')
        // {
        //     alert('Please enter a valid search term.');
        //     return;
        // }

        if (query != null)
        {
            console.log(`Value is :  ${query}`);
            performSearch(query); // Call the performSearch function with the query
        } else
        {
            alert('Please enter a search query.');
        }
    });

});



