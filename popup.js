document
  .getElementById("linkForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const linkInput = document.getElementById("linkInput");
    const link = linkInput.value;

    if (link) {
      chrome.storage.sync.get({ links: [] }, function (result) {
        const links = result.links;
        links.push(link);
        chrome.storage.sync.set({ links: links });
        linkInput.value = "";
        updateLinkList();
      });
    }
  });

function updateLinkList() {
  chrome.storage.sync.get({ links: [] }, function (result) {
    const linkList = document.getElementById("linkList");
    linkList.innerHTML = result.links
      .map(
        (link, index) => `
      <li>
      <a href="${link.split(",")[1]}" target="_blank">${link.split(",")[0]}</a>
      <button id="${link.split(",")[0]}" >x</button>
      </li>`
      )
      .join("");

      chrome.storage.sync.get({ links: [] }, function (result) {
        const len = result.links.length;
        result.links.map((link, index) => {
          document
            .getElementById(link.split(",")[0])
            .addEventListener("click", function (ell) {
              chrome.storage.sync.set({
                links: result.links
                  .slice(0, index)
                  .concat(result.links.slice(index + 1, len)),
              });
              updateLinkList()
            });
        });
      });
      
  });
}

updateLinkList();

