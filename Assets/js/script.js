var rightNow = moment().format('MMMM Do, YYYY');
var rightNowHour = moment().format('hh A');
var savedTasks = [];
console.log(rightNowHour);

// display current date to dom

$('#currentDay').text(rightNow);

// adds bootstrap color classes to hour blocks depending on current time

const timeStatus = () => {
	// target dom element
	var textAreaEl = $('.input-group');
	// iterate through all elements with same dom target
	for (var i = 0; i < textAreaEl.length; i++) {
		// convert HTML inside span to a moment object
		var blockStatus = $(textAreaEl[i]).find('span').text().trim();
		var blockTime = moment(blockStatus, 'hh A').format('hh A');
		//moment(blockTime, 'hh A').isBefore({ rightNowHour }, 'hh A')
		// compare block time to current time and assign color
		if (blockTime < rightNow) {
			$(textAreaEl[i]).find('textarea').addClass('bg-secondary');
		} else if (blockTime === rightNowHour) {
			$(textAreaEl[i]).find('textarea').addClass('bg-danger');
		} else if (moment(blockTime, 'hh A').isAfter({ rightNowHour }, 'hh A')) {
			$(textAreaEl[i]).find(`textarea`).addClass('bg-success');
		}
	}
};

// displays saved tasks from local storage

const displayTasks = () => {
	// get the data from local storage
	var tasks = localStorage.getItem('savedTasks');
	// if data exists in localStorage then put into array
	if (tasks) {
		savedTasks = JSON.parse(tasks);
		console.log(savedTasks);
	}

	// loop through each dom element
	var localLength = savedTasks.length;
	var textAreaEl = $('.input-group');
	for (var i = 0; i < textAreaEl.length; i++) {
		// once inside current dom
		// loop through storage array and compare "id" to save the correct data
		for (var j = 0; j < localLength; j++) {
			var id = savedTasks[j].hour;
			console.log(id);
			if ($(textAreaEl[i]).find('.saveBtn').attr('id') === id) {
				$(textAreaEl[i]).find('.form-control').val(savedTasks[j].description);
			}
		}
	}
};

timeStatus();
displayTasks();

// sets the description of current form on keyup
$('.form-control').on('keyup', function () {
	//console.log(this);
	var desc = $(this).val();
	//console.log(desc);
});

// listens for save button press
$('.saveBtn').on('click', function () {
	// target value of textarea parent from button
	var desc = $(this).parents('.input-group').find('.form-control').val(); //.val();
	console.log(desc);
	// if form has data then save to local storage
	if (desc) {
		var taskHour = $(this).attr('id');
		savedTasks.push({ hour: taskHour, description: desc });
		localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
	}
});
