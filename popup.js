document.getElementById('linkForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const linkInput = document.getElementById('linkInput');
    const link = linkInput.value;
  
    if (link) {
      chrome.storage.sync.get({ links: [] }, function (result) {
        const links = result.links;
        links.push(link);
        chrome.storage.sync.set({ links: links });
        linkInput.value = '';
        updateLinkList();
      });
    }
  });
  
  function updateLinkList() {
    chrome.storage.sync.get({ links: [] }, function (result) {
      const linkList = document.getElementById('linkList');
      linkList.innerHTML = result.links.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('');
    });
  }
  
  updateLinkList();
  