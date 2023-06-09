Offset start-times in Google Calendar
=====================================
Want to start all of your meetings at 5 minutes after the hour by default? That's what this extension can do for you! It offsets meeting start-times by default when adding a new event in the Google Calendar web UI, using an offset you configure (defaults to a 5 minute delay). Works with the Speedy Meetings setting in Google Calendar too, so you can leave some room **before** and after your meeting. Back-to-back meetings are draining; give your attendees time to eat!

This was a quick 2-day project to add a bit more flexibility to the Google Calendar UI.

[🏪 Install it from the Chrome Web Store](https://chrome.google.com/webstore/detail/offset-start-times-in-goo/lpgnioiegbijnllaabmnnjflkfnjnhbn/related?hl=en)

### Motivation
Meetings can dominate workdays, leaving frequent meeting attenders hungry, sitting for hours at a time, and visiting the bathroom late. Moreover, [people are more engaged and less anxious when they get breaks between meetings](https://www.microsoft.com/en-us/worklab/work-trend-index/brain-research). If meeting creators employ Google's Speedy Meetings setting, that can help, but generally it's more difficult to end a meeting ten minutes before the hour than it is to start a meeting at five minutes after the hour. For frequent meeting attenders, leaving some room on **both** sides of a meeting ensures they can take some time to tend to themselves, and/or do some prep for the next meeting.

### Mechanism
The extension works by injecting a content script into the Google Calendar page at load time. The script does the following:
1. Observes the DOM to detect when the "Add Event" modal is open
2. Expands the datetime section inside the modal upon opening
3. Changes the start-time value
4. Dispatches click and mousedown MouseEvents to trigger Google's page scripts to run
5. Changes the end-time if meeting duration is not persisted
6. Give focus back to the Title input element
