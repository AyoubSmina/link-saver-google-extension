chrome.contextMenus.create({
    title: "Save Link to Link Saver",
    contexts: ["link"],
    onclick: function (info, tab) {
      chrome.storage.sync.get({ links: [] }, function (result) {
        const links = result.links;
        links.push(info.linkUrl);
        chrome.storage.sync.set({ links: links });
      });
    }
  });