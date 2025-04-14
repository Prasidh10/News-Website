const apikey = '0aef41e820154ab29b0ed5c9ff3b391c';

const blogcontainer = document.getElementById("blog-cont");
const searchFeild = document.getElementById("search-input");
const searchButton = document.getElementById("search-item");
async function fetchrandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`
        /**here we have copied the only url not the whole link 
         * after that we needto pass the parameter page size which is 10, then we need to pass another parameter 
         * our own api key.
         * Next to fetch data we use await  
         */
        const response = await fetch(apiUrl);
        const data= await response.json();/**after getting the response,now we have to convert our response in adjasent format */
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error);
        return[];
    }
}

searchButton.addEventListener("click", async () =>{
    const query = searchFeild.value.trim();
    if(query !== " "){
        try{
            const articles = await fetchNewsQuery(query);
            displayblogs(articles);
        }catch(error){
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        /**here we have copied the only url not the whole link 
         * after that we needto pass the parameter page size which is 10, then we need to pass another parameter 
         * our own api key.
         * Next to fetch data we use await  
         */
        const response = await fetch(apiUrl);
        const data= await response.json();/**after getting the response,now we have to convert our response in adjasent format */
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error);
        return[];
    }
}
function displayblogs(articles){
    blogcontainer.innerHTML = ""
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");  
        img.src = article.urlToImage;
        img.alt  = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? 
            article.title.slice(0, 30) + "......." 
            : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p")
        const truncatedDes = article.description.length > 120
            ? article.description.slice(0, 120) + "......."
            : article.description;
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
        blogcontainer.appendChild(blogCard);
    });
}

(async () =>{
    try{
        const articles = await fetchrandomNews();
        displayblogs(articles);
    }catch (error){
        console.error("Error fetching random news",error);
    }
} )();