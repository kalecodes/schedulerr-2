var schedule = [];

// get current date (formatted)
var today = moment().format("dddd, MMMM Do");
// display current date to header
$("#currentDay").text(today);

var auditTime = function(textareaEl) {
    var time = $(textareaEl).attr("id");
    var currentTime = moment().hour();
    $(textareaEl).removeClass();

    if (time < currentTime) {
        $(textareaEl).addClass("col-8 form-control past");
    }
    else if (time == currentTime) {
        $(textareaEl).addClass("col-8 form-control present");
    }
    else if (time > currentTime) {
        $(textareaEl).addClass("col-8 form-control future");
    }
};

// save tasks to localStorage
var saveSchedule = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

// load tasks from localStorage on load
var loadTasks = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));

    if (!schedule) {
        schedule = [];
    }

    console.log(schedule);

    schedule.forEach(function(task) {
        $("#" + task.id).text(task.task);
    });
};

// create row for each hour block
    // assign id attribute to time
    // 3 columns per row (time, textarea, save button)
var displayPlanner = function() {
    for (i = 6; i < 23; i++) {
        var hourRow =  $("<div>")
            .addClass("row")
            .attr("id", "row-" + i);

        var hourTitle = $("<div>")
            .addClass("col-2 badge badge-dark pt-4")
            .text(moment().hour(i).format("h A"));

        var hourTasks = $("<textarea>")
            .addClass("col-8 form-control")
            .attr("id", i);

        var saveBtn =  $("<button>")
            .addClass("col-2 btn btn-info save-btn")
            .attr("id", "btn-" + i);

        // append columns to row
        hourRow.append(hourTitle, hourTasks, saveBtn);
        // append row to container
        $(".container").append(hourRow);

        auditTime(hourTasks);
    }

    loadTasks();
};

displayPlanner();

// use setInterval to periodically update style of textareas
setInterval(function(){
    $("textarea").each(function(index,el) {
        auditTime(el);
    })
}, (1000 * 60) * 5);

// event listener for save buttons
$(".row").on("click", "button", function() {
    console.log(this);
    var row = $(this).attr("id").replace("btn-",  "");
    console.log(row);

    var text = $("#" + row).val().trim();
    console.log(text);

    schedule.push({
        id: row,
        task: text
    });

    console.log(schedule);

    saveSchedule();
});
