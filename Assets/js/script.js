var rightNow = moment().format('MMMM Do, YYYY');
var rightNowHour = moment().format('hh A');
var savedTasks = [];
console.log(rightNowHour);

$('#currentDay').text(rightNow);

const timeStatus = () => {
	var textAreaEl = $('.input-group');
	for (var i = 0; i < textAreaEl.length; i++) {
		var blockStatus = $(textAreaEl[i]).find('span').text().trim();
		var blockTime = moment(blockStatus, 'hh A').format('hh A');
		console.log(blockTime.valueOf());
		if (moment(blockTime, 'hh A').isBefore({ rightNowHour }, 'hh A')) {
			$(textAreaEl[i]).find('textarea').addClass('bg-secondary');
		} else if (blockTime === rightNowHour) {
			$(textAreaEl[i]).find('textarea').addClass('bg-danger');
		} else if (moment(blockTime, 'hh A').isAfter({ rightNowHour }, 'hh A')) {
			$(textAreaEl[i]).find(`textarea`).addClass('bg-success');
		}
	}
};

timeStatus();

$('.form-control').on('keyup', function () {
	console.log(this);
	var desc = $(this).val();
	console.log(desc);
});

// ToDo add event listener to save button
//  check if textarea has a value, if true then save value to local storage
// else do nothing

$('.saveBtn').on('click', function () {
	var desc = $(this).parents('.input-group').find('.form-control').val(); //.val();
	console.log(desc);
	if (desc) {
		var taskHour = $(this).attr('id');
		savedTasks.push({ hour: taskHour, desctription: desc });
		localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
	}
});
