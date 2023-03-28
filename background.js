const defaults = {
  startTimeOffsetInMinutes: 5,
  persistDuration: false
}

const handleExtensionInstalled = () => {
  chrome.storage.sync.get("startTimeOffsetInMinutes", data => {
    const startTimeOffsetInMinutes = data.startTimeOffsetInMinutes ? data.startTimeOffsetInMinutes : defaults.startTimeOffsetInMinutes
    chrome.storage.sync.set({ startTimeOffsetInMinutes })
  })
  chrome.storage.sync.get("persistDuration", data => {
    const persistDuration = data.persistDuration ? data.persistDuration : defaults.persistDuration
    chrome.storage.sync.set({ persistDuration })
  })
}

chrome.runtime.onInstalled.addListener(handleExtensionInstalled)
