const routes = {
  home: `<h1>Welcome to Wang Fuk Court Fire Support</h1><p>This is the Home page content.</p>`,

support: async function() {
  // Fetch multiple recent forum posts
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await response.json();
  
  let forumHTML = `<h1>Community Forum Feed</h1>
                   <div class="forum-posts">`;
  
  posts.forEach(post => {
    forumHTML += `
      <div class="forum-post">
        <h3>${post.title}</h3>
        <p class="post-author">by User ${post.id} • ${new Date().toLocaleDateString()}</p>
        <p>${post.body.substring(0, 150)}...</p>
        <a href="#read-more-${post.id}" class="read-more">Read more →</a>
      </div>`;
  });
  
  forumHTML += `</div>`;
  return forumHTML;
},


  donate: `<h1>Donate</h1>
    <form id="donationForm">
      <label for="name">Full Name:</label><br>
      <input type="text" id="name" name="name" required><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br>
      <label for="amount">Donation Amount (USD):</label><br>
      <input type="number" id="amount" name="amount" min="1" required><br><br>
      <button type="submit">Donate</button>
    </form>
    <div id="donationMessage"></div>`
};

async function render() {
  const hash = window.location.hash.substring(1) || 'home';
  const root = document.getElementById('root');

  if (routes[hash]) {
    let content = '';
    if (typeof routes[hash] === 'function') {
      root.innerHTML = '<p>Loading...</p>';
      content = await routes[hash]();
    } else {
      content = routes[hash];
    }
    root.innerHTML = content;

    // Attach donation form submit handler dynamically
    if (hash === 'donate') {
      const form = document.getElementById('donationForm');
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const amount = form.amount.value;
        const messageDiv = document.getElementById('donationMessage');

        if (!name || !email || !amount) {
          messageDiv.textContent = 'Please fill in all required fields.';
          return;
        }

        messageDiv.textContent = 'Processing your donation...';

        // Simulate API call or real payment flow here
        await new Promise(resolve => setTimeout(resolve, 1500));

        messageDiv.textContent = `Thank you, ${name}, for your generous donation of $${amount}!`;
        form.reset();
      });
    }
  } else {
    root.innerHTML = '<h1>404: Page Not Found</h1>';
  }
}

// Navigation click listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = link.getAttribute('href').substring(1);
    });
  });
  render();
});

window.addEventListener('hashchange', render);
