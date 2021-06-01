let changeColor = document.getElementById("changeColor");
let scanPage = document.getElementById("scanPage");
let scanResults = document.getElementById("scanResults");

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
    // "https://api.a11ywatch.com"
    try {
        const response = await fetch(`https://www.a11ywatch.com/api/scan?url=${encodeURI(location.href)}`)
        const data = await response.json();
        console.log(data)
        scanResults.innerHTML = JSON.stringify(data);
    } catch (e) {
        console.error(e)
    }
}

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}