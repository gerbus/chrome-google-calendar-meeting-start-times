const observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return;

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }

    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()


let modalVisible = false
const modalContainer = document.getElementById("yDmH0d")
observeDOM(modalContainer, async () => {
  if (modalVisible !== !!modalContainer.children.length) {
    console.log(`modalVisible is now ${!!modalContainer.children.length}`)
    modalVisible = !!modalContainer.children.length

    if (modalVisible) {
      // 1. Expand datetime section
      const timeslotButton = document.querySelectorAll('[jsname="GIdnzc"] button')[0]
      timeslotButton.click()

      // 2. Mutate data
      const startTimeContainerJSName = "B4GDSd"
      //    iCal data
      const starttimeContainer = document.querySelectorAll(`[jsname="${startTimeContainerJSName}"]`)[0]
      const originalStartIcalValue = starttimeContainer.getAttribute('data-ical')
      const newStartIcalValue = originalStartIcalValue.substring(0,originalStartIcalValue.length - 3) + '500'
      starttimeContainer.setAttribute('data-ical', newStartIcalValue)

      //    Start time input control
      const starttimeElement = document.querySelectorAll(`[jsname="${startTimeContainerJSName}"] input`)[0]
      const originalStartValue = starttimeElement.value
      const newStartValue = originalStartValue.substring(0, originalStartValue.length - 1) + '5'
      starttimeElement.value = newStartValue
      starttimeElement.setAttribute('data-initial-value', newStartValue)

      await new Promise(r => setTimeout(r, 200));

      // 3. Commit data
      //    Click into start time input, and then dispatch mousedown in modal white space to trigger Google's scripts
      starttimeElement.click()
      const modalWhiteSpace = document.querySelectorAll("[jsname='uxAMZ']")[0]
      modalWhiteSpace.dispatchEvent(new MouseEvent('mousedown'))

      await new Promise(r => setTimeout(r, 200));

      // 4. Mutate more data
      //    Change the subsequent end time back to what it was
      const endTimeContainerJSName = "XCHdmd"
      //    iCal data
      const endtimeContainer = document.querySelectorAll(`[jsname="${endTimeContainerJSName}"]`)[0]
      const originalEndIcalValue = endtimeContainer.getAttribute('data-ical')
      const newEndIcalValue = originalEndIcalValue.substring(0,originalEndIcalValue.length - 3) + '000'
      endtimeContainer.setAttribute('data-ical', newEndIcalValue)

      //    End time input control
      const endtimeElement = document.querySelectorAll(`[jsname="${endTimeContainerJSName}"] input`)[0]
      const originalEndValue = endtimeElement.value
      const newEndValue = originalEndValue.substring(0, originalEndValue.length - 1) + '0'
      endtimeElement.value = newEndValue
      endtimeElement.setAttribute('data-initial-value', newEndValue)

      await new Promise(r => setTimeout(r, 200));

      // 5. Commit data
      //    Click into end time input, and then dispatch mousedown in modal white space to trigger Google's scripts
      endtimeElement.click()
      modalWhiteSpace.dispatchEvent(new MouseEvent('mousedown'))
    }
  }
})



