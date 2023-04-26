// get current date (formatted)
var today = moment().format("dddd, MMMM Do");
// display current date to header
$("#currentDay").text(today);

// use setInterval to periodically update style of textareas



// save tasks to localStorage


// create row for each hour block
    // assign id attribute to time
    // 3 columns per row (time, textarea, save button)
var displayPlanner = function() {
    for (i = 6; i < 23; i++) {
        var hourRow =  $("<div>").addClass("row");

        var hourTitle = $("<div>")
            .addClass("col-2")
            .text(moment().hour(i).format("h A"));

        var hourTasks = $("<textarea>")
            .addClass("col-8")
            .attr("id", i);

        var saveBtn =  $("<button>").addClass("col-2");

        // append columns to row
        hourRow.append(hourTitle, hourTasks, saveBtn);
        // append row to container
        $(".container").append(hourRow);

    }

};


// load tasks from localStorage on load
var loadTasks = function() {

};

displayPlanner();
// loadTasks();