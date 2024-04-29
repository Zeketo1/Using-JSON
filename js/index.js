const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");

const renderPosts = async (term) => {
    let uri = "http://localhost:3000/posts?_sort=likes";

    const res = await fetch(uri);
    let posts = await res.json();

    console.log(posts);

    if (term) {
        console.log(posts); // Gets the post
        const filtedArry = posts.filter(({ title }) => {
            // Filters it with obj
            console.log(title); // We check if we are getting the title
            return title && title.toLowerCase().includes(term); // We check if anything from the search input exists in the titles
        });
        console.log(filtedArry);
        posts = filtedArry;
    }
    let template = "";

    posts.forEach(({ title, likes, body, id }) => {
        template += `
             <div class="post">
                 <h2>${title}</h2>
                 <p>
                     <small>${likes} likes</small>
                 </p>
                 <p>${body.slice(0, 200)}</p>
                 <a href="details.html?id=${id}">read more....</a>
             </div>
         `;
    });

    container.innerHTML = template;
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
});

window.addEventListener("DOMContentLoaded", () => renderPosts());
