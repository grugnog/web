let changeColor = document.getElementById("changeColor");
let scanPage = document.getElementById("scanPage");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  

  scanPage.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getPageIssues,
    });
  });
  

async function getPageIssues() {
    try {
        const response = await fetch(`https://api.a11ywatch.com/api/scanWebsiteAsync?url=${encodeURI(location.href)}`)
        const data = await response.json();
        let scanResults = document.getElementById("scanResults");

        console.log(data)

        if (scanResults) {
            scanResults.innerHTML = JSON.stringify(data);
        }
        
    } catch (e) {
        console.error(e)
    }
}

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}