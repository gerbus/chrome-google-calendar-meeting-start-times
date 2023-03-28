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

  await new Promise(r => setTimeout(r, 100))

  // Click in and out of the input to trigger Google UI scripts (simulate real user input)
  inputElement.click()
  const modalWhiteSpace = document.querySelectorAll("[jsname='uxAMZ']")[0]
  modalWhiteSpace.dispatchEvent(new MouseEvent('mousedown'))

  await new Promise(r => setTimeout(r, 100));
}

const callback = async function() {
  if (modalVisible !== !!modalContainer.children.length) {
    console.log(`modalVisible is now ${!!modalContainer.children.length}`)
    modalVisible = !!modalContainer.children.length

    if (modalVisible) {
      // 1. Expand datetime section of modal
      const timeslotButton = document.querySelectorAll('[jsname="GIdnzc"] button')[0]
      timeslotButton.click()

      // 2. Delay start time
      await mutateTime("B4GDSd",5)

      // 3. Change the subsequently changed end time back to what it was
      //    (Google tries to preserve the duration of the event, so when the start time changes, so does the end time)
      await mutateTime("XCHdmd",-5)

      // 4. Focus back to the "title" input
      const titleElement = document.querySelectorAll(`[jsname="Y9wHSb"] input`)[0]
      titleElement.focus()
    }
  }
}


let modalVisible = false
const modalContainer = document.getElementById("yDmH0d")
observeDOM(modalContainer, callback)

