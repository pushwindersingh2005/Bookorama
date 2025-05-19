document.addEventListener('DOMContentLoaded', function() {
  const list = document.querySelector('#book-list ul');
  const forms = document.forms;

  // Delete books
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const li = e.target.closest('li');
      li.remove();
    }
  });

  // Add books
  const addForm = forms['add-book'];
  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = addForm.querySelector('input[type="text"]');
    const value = input.value.trim();

    if (!value) return; // Skip empty input

    // Create elements
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');

    // Add content and classes
    bookName.textContent = value;
    bookName.className = 'name';
    deleteBtn.textContent = 'delete';
    deleteBtn.className = 'delete';
    deleteBtn.setAttribute('role', 'button');
    deleteBtn.setAttribute('tabindex', '0');

    // Append to DOM
    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    // Reset input
    input.value = '';
  });

  // Hide books
  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function() {
    list.style.display = hideBox.checked ? 'none' : 'block';
  });

  // Search books
  const searchBar = forms['search-books'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const books = list.querySelectorAll('li');

    books.forEach(book => {
      const title = book.querySelector('.name').textContent.toLowerCase();
      book.style.display = title.includes(term) ? 'flex' : 'none';
    });
  });

  // Tabbed content
  const tabs = document.querySelector('.tabs');
  const panels = document.querySelectorAll('.panel');

  tabs.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      // Update tab selection
      tabs.querySelectorAll('button').forEach(btn => {
        btn.setAttribute('aria-selected', 'false');
      });
      e.target.setAttribute('aria-selected', 'true');

      // Show corresponding panel
      const targetPanel = document.querySelector(e.target.dataset.target);
      panels.forEach(panel => {
        panel.classList.toggle('active', panel === targetPanel);
      });
    }
  });
});