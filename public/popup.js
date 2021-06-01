// let changeColor = document.getElementById('changeColor')
let scanPage = document.getElementById('scanPage')
let scanResults = document.getElementById('a11yScanResults')
let a11yPageScanned = document.getElementById('a11yPageScanned')

chrome.runtime.onMessage.addListener(function(details) {
    // alert('Message from frame: ' + details.data);
    const dataParsed = JSON.parse(details.data);
    a11yPageScanned.innerHTML = dataParsed.url
    scanResults.innerHTML = JSON.stringify(dataParsed)
});

chrome.storage.sync.get('color', ({ color }) => {
  scanPage.style.backgroundColor = color
})

scanPage.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
   
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageIssues,
  })
})

const getPageIssues = async () => {
    try {
      const response = await fetch(
        `https://api.a11ywatch.com/api/scanWebsiteAsync?websiteUrl=${encodeURI(
          location.href
        )}`,
        {
          method: 'POST',
        }
      )
      const data = await response.json()
  
      console.log(data)
  
      if (data.website) {
        const web =  data.website
        const dataSource =  JSON.stringify(Object.assign({}, web, {html: null}));
        chrome.runtime.sendMessage({sendBack:true, data:dataSource});
      }
    } catch (e) {
      console.error(e)
    }
  }
