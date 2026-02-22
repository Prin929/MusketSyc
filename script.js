async function loadPosts() {
  const response = await fetch('posts.json');
  const posts = await response.json();
  const randomBtn = document.getElementById('random-btn');
if (randomBtn) {
  randomBtn.onclick = () => {
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    window.location.href = `post.html?id=${randomPost.id}`;
  };
}

  const container = document.getElementById('posts-container');
  if (!container) return;

  posts.reverse().forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post-card');
    div.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-date">${post.date}</div>
    `;
    div.onclick = () => {
      window.location.href = `post.html?id=${post.id}`;
    };
    container.appendChild(div);
  });
}

async function loadSinglePost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const response = await fetch('posts.json');
  const posts = await response.json();

  const post = posts.find(p => p.id == id);

  const container = document.getElementById('post-content');
  if (!post || !container) return;

  container.innerHTML = `
    <h1>${post.title}</h1>
    <p class="post-date">${post.date}</p>
    <p>${post.content.replace(/\n/g, "<br>")}</p>
  `;
}

loadPosts();
loadSinglePost();

