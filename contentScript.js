var observeDOM = (function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe(obj, {childList:true, subtree:true})
      return mutationObserver
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

const mutateTime = async function(containerElementJSName, mutationInMinutes) {
  // Grab whitespace to click out of input later
  let modalWhiteSpace = document.querySelectorAll("[jsname='uxAMZ']")[0] // uxAMZ is the jsname value of the div containing the white space of the part of the modal that doesn't contain the title input or the buttons at the bottom

  // Mutate iCal data attribute
  const containerElement = document.querySelectorAll(`[jsname="${containerElementJSName}"]`)[0]
  const originalIcalValue = containerElement.getAttribute('data-ical')
  const newIcalValueInt = parseInt(originalIcalValue.substring(1)) + (mutationInMinutes * 100)
  const newIcalValue = 'T' + newIcalValueInt.toString().padStart(6, '0')
  containerElement.setAttribute('data-ical', newIcalValue)

  // Mutate input control (can change to anything, Google looks at the above)
  const inputElement = document.querySelectorAll(`[jsname="${containerElementJSName}"] input`)[0]
  const newValue = "whatever"
  inputElement.setAttribute('data-initial-value', newValue)

  // Click in and out of the input to trigger Google UI scripts (simulate real user input)
  inputElement.click()

  await new Promise(r => setTimeout(r, wait));
  console.log("Clicking out of input")
  modalWhiteSpace.dispatchEvent(new MouseEvent('mousedown'))
  modalWhiteSpace.dispatchEvent(new MouseEvent('mouseup'))
}

const callback = function() {
  if (modalVisible !== !!modalContainer.children.length) {
    modalVisible = !!modalContainer.children.length

    if (modalVisible) {

      // 1. Expand datetime section of modal
      const timeslotButton = document.querySelectorAll('[jsname="TAmOZ"] button')[0] // TAmOZ is the jsname value of the dev containing the button that expands the datetime section of the modal
      timeslotButton.click()

      chrome.storage.sync.get("startTimeOffsetInMinutes", async data => {
        const offset = parseInt(data.startTimeOffsetInMinutes)

        // 2. Adjust start-time
        await new Promise(r => setTimeout(r, wait))
        console.log("Adjusting start-time")
        await mutateTime("B4GDSd", offset) // B4GDSd is the jsname value of the div containing the tree that contains the start-time input

        chrome.storage.sync.get("persistDuration", async data => {
          const persist = !!data.persistDuration
          if (!persist) {

            // 3. Adjust the subsequently changed end-time back to what it was
            //    (Google tries to preserve the duration of the event, so when the start time changes, so does the end time)
            await new Promise(r => setTimeout(r, wait))
            console.log("Resetting end-time")
            await mutateTime("XCHdmd", -offset) // XCHdmd is the jsname value of the div containing the tree that contains the end-time input
          }

          // 4. Focus back to the "title" input
          await new Promise(r => setTimeout(r, wait))
          console.log("Giving focus back to Title input")
          const titleElement = document.querySelectorAll(`[jsname="GYcwYe"] > [jsname="vhZMvf"] > input`)[0] // GYcwYe and vhZMvf are jsname values in the div tree that contains the title input
          titleElement.focus()
        })
      })
    }
  }
}


let modalVisible = false
const wait = 100
const modalContainer = document.getElementById("yDmH0d") // yDmH0d is the jsname value of the div containing the DOM tree that is the modal (it is visible but empty when the model is not visible)
observeDOM(modalContainer, callback)

