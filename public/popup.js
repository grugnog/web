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
    // "https://api.a11ywatch.com"
    const response = await fetch(`http://www.a11ywatch.com/api/website-check?url=${location.href}`)
    const data = await response.json();
    console.log(data)
}

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}