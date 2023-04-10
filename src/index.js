
const prompt = require("prompt-sync")({ sigint: true })
const { google } = require('googleapis')
const authFile = require("./authFile")

const calendar = google.calendar({
    version:'v3', 
    auth:authFile.oAuth2Client
})

let arrayOfTickets = []
let arrayOfEvents = []
let dailyStartTime = 0900
let dailyBreakTime = 1300
let dailyBreakEnd = 1400
let dailyEntTime = 1800
let sprintStartStr = prompt("Enter Start Date Of The Sprint (YYYY-MM-DD) ")
var sprintStart = new Date(sprintStartStr)
sprintStart.setHours(9,0,0,0)
let sprintEndStr = prompt("Enter end Date Of The Sprint (YYYY-MM-DD) ")
var sprintEnd = new Date(sprintEndStr.toString())
let numTickets = prompt("Enter Number Of Tickets In The Sprint ")

let sprintDiff = sprintEnd - sprintStart
console.log(sprintDiff)

for (let index = 0; index < numTickets; index++) {
    let ticketName = prompt("Enter Ticket Name ")
    let spVal = prompt("Enter Ticket Story Points value ")
    let insertObj = {
        Ticket: ticketName,
        SP: spVal
    }
    arrayOfTickets[index] = insertObj
}

let calId = prompt("Enter Google Calendar ID")

for(let i = 0; i<arrayOfTickets.length;i++){
    endDate = new Date(sprintStart)
    var hours = (arrayOfTickets[i].SP*2)
    endDate.setHours(sprintStart.getHours() + hours)
    let event = {
        summary: arrayOfTickets[i].Ticket,
        Description: "Hours for " +arrayOfTickets[i].ticketName,
        colorId: 1,
        start:{
            dateTime: sprintStart,
            timeZone: 'America/Phoenix'
        },
        end:{
            dateTime: endDate,
            timeZone: 'America/Phoenix'
        }
    }
    calendar.freebusy.query(
        {
            resource: {
              timeMin: sprintStart.toISOString(),
              timeMax: endDate.toISOString(),
              timeZone: 'America/Denver',
              items: [{ id: calId }],
            },
        },
        (err, res) => {
            if (err) return console.error('Free Busy Query Error: ', err)

            const eventArr = []

            if (eventArr.length === 0)
              return calendar.events.insert(
                { calendarId: calId, resource: event },
                err => {
                  if (err) return console.error('Error Creating Calender Event:', err)
                  return console.log('Calendar event successfully created.')
                }
              )

            return console.log(`Sorry I'm busy...`)
          }
    )
    sprintStart = endDate
}