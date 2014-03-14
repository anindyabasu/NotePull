'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

var color_hex = '#fff';

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#searchControl .dropdown-menu a').click(getResults);
	//$('#sortFolderDiv .dropdown-menu a').click(doFoldersSort);
	//$('#sortNotesDiv .dropdown-menu a').click(doNotesSort);
}

function populateSearch(results_array) {
	var wrapper_div = $('#searchResults');
	if (results_array.length <= 0) {
		document.getElementById('noResults').style.display = 'block';
		wrapper_div.html(' ');
	}
	else {
		document.getElementById('noResults').style.display = 'none';
		var num = results_array.length;
		var i;
		var ul = '<ul class="search-list">';
		for (i = 0; i < num; ++i) {
			var line = results_array[i];
			//var li = '<li>' + line.note + '</li>';
			if ((i % 2) == 0) {
				var li = '<li class="result-odd result">' + '<a href="/edit/' + line.id.folder 
							+ '/' + line.id.note + '">'+ line.note + '</a></li>';
			}
			else {
				var li = '<li class="result-even result">' + '<a href="/edit/' + line.id.folder 
							+ '/' + line.id.note + '">'+ line.note + '</a></li>';
			}
			ul += li;
		}

		ul += '</ul>';
		wrapper_div.html(ul);

		$('#results  ul').css('border-left', '3px solid ' + color_hex);
	}
}

function getResults(e) {
	e.preventDefault();
	var search_string = $(this).data('color');
	assignColorHex(search_string);
	var search_color = 'Search ' + $(this).text();
	$('#searchButton').text(search_color);
	$.get("/search/"+ search_string, populateSearch);
}

function assignColorHex(color_number_string) {
	console.log(color_number_string);
	if (color_number_string == "2")
		color_hex = 'DarkOrange';
	else if (color_number_string == "1")
		color_hex = 'Crimson';
	else if (color_number_string == "4")
		color_hex = 'Teal';
	else if (color_number_string == "3")
		color_hex = 'LimeGreen';
	else 
		color_hex = '#fff';
}

function doFoldersSort(e) {
	e.preventDefault();
	var sortType = $(this).data('order');
}

function doNotesSort(e) {
	e.preventDefault();
	var sortType = $(this).data('order');
}