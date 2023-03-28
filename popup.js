const delayInputElement = document.getElementById("delay")
const persistInputElement = document.getElementById("persistDuration")


// Load values from localstorage on popup init
chrome.storage.sync.get("startTimeOffsetInMinutes", data => delayInputElement.value = data.startTimeOffsetInMinutes)
chrome.storage.sync.get("persistDuration", data => persistInputElement.checked = !!data.persistDuration)


// Add listeners to keep localstorage in sync as user updates controls
delayInputElement.addEventListener("input", e => {
  const startTimeOffsetInMinutes = parseInt(e.target.value)
  chrome.storage.sync.set({ startTimeOffsetInMinutes })
})
persistInputElement.addEventListener("change", e => {
  const persistDuration = e.target.checked
  chrome.storage.sync.set({ persistDuration })
})

