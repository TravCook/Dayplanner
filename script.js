$(document).ready(function() {
var dayDisplay = $("#currentDay")
var timeBlocks = $(".container")
var date = moment().format('llll');
var hourBlock
var schedData = []
//UI is provided for this homework
//we can build it in html and then have the data render in
//GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
//  THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
//  THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
//  THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
//  THEN I can enter an event
// WHEN I click the save button for that timeblock
//  THEN the text for that event is saved in local storage
// WHEN I refresh the page
//  THEN the saved events persist


// create a function to write the current day out at the top of the page
function currentDay(){
  dayDisplay.text(date)
}
currentDay();
var hourComp = moment().format('H')
// render out a time block for every hour of the day (24) 
function hourRender(){
  for(i=0;i<24;i++){
    hourBlock = $("<div>")
    var saveButton = $("<button>")
    var textArea = $("<textarea>")
    saveButton.addClass("saveBtn")
    saveButton.textContent = "SAVE";
    textArea.attr("hourIdx", i)
    hourBlock.addClass("row description time-block row hour")
    hourBlock.attr("hourStart", i)
    hourBlock.attr("hourEnd", i+1)
    hourBlock.append(saveButton)
    hourBlock.append(textArea)

    if(i < hourComp){
      hourBlock.addClass("past")
      timeBlocks.append(hourBlock)
    }else if( i === hourComp){
      hourBlock.addClass("present")
      timeBlocks.append(hourBlock)
    }else{
      hourBlock.addClass("future")
      timeBlocks.append(hourBlock)
    }
  }
}
hourRender()

function textSave(event){
  event.preventDefault();
  var scheduleText = event.target.parentElement.lastChild.value.trim();
  var hourNum = event.target.parentNode.attributes.hourstart.value;
  var dataObj = { hourNum : scheduleText};
  schedData.push(dataObj)
  localStorage.setItem("Schedule", schedData)
}

function pageload(){
 var data = localStorage.getItem("Schedule")
  console.log(data)
}
pageload()



$(".saveBtn").on("click", textSave)
// create an on click event that lets a user save data inside of an hour block


// create an onclick event for a save button that saves the text for that hour in local storage


// the save should persist through a page refresh
});