'use strict';

/*window.onload = function() {
  var input = document.getElementById("#title").focus();
}

*/
function current_date() {
            var d = new Date();
            return (d.getMonth()+1) + "/" +
                        d.getDate() + "/" +
                        d.getFullYear();
}

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#newnote').click(addNote);
	$('#submitNote').click(submitNewNote);
	$('#title').keypress(function(e) {
		if (e.which == 13) {
			addNote(e);
		}
	});
	// consider for notes too! but need to attach handler when creating
	$('#addNewButton').click(addNote);
	$('#date').text(current_date());
}

function addNote(e) {
	var newnote = $('<li><div contenteditable="true" class="note"></di></li>');
	//var newnote = $('<li><textarea onkeyup="new resize_input(this);" virtual rows="1" class="note"></textarea></li>');
	//var newnote = $('<li><input type="text" class="note"></input></li>');
	var notelist = $('#notelist');
	notelist.append(newnote);

	$('#notelist li:last-child div').focus();
}

function submitNewNote(e) {
	e.preventDefault();

	var notes = $('.note');
	var numNotes =  notes.length;
	var note_arr = [];
	for (var i = 0; i < numNotes; i++) {
		var note = $(notes[i]).text();
		console.log($(notes[i]).html());
		var note_json = {"tag":0, "note": note}; // tag is for highlight
		note_arr.push(note_json);
	}
	var date = $('#date').text(); // date\n
	var title = $('#title').val();

	var note_wrapper = {
		"date" : date,
		"title" : title,
		"notes" : note_arr};
		//console.log(note_wrapper);


	var form = $('#submitForm');
	var inputdata = $('<input name="noteField" id="noteField" hidden></input>');
	inputdata.val(JSON.stringify(note_wrapper));
	form.append(inputdata);
	form.submit();
	
}

$(document).ready(function () {
  $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});
// goal later: put focus at end of input