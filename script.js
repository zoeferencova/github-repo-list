"use strict";

function emptyContents() {
	$('#results-list').empty();
	$('#results h2').empty();
}

function displayResults(username, response) {
	emptyContents();
	$('#js-error-message').empty();
	$('#results').prepend(`<h2>Search results for: ${username}</h2>`)
	for (let i=0; i < response.length; i++) {
		$('#results-list').append(`<li>${response[i].name}: <a href="https://github.com/${username}/${response[i].name}" target="_blank">https://github.com/${username}/${response[i].name}</a></li>`)
	}
	$('#results').removeClass('hidden');
}

function getRepos(username) {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayResults(username, responseJson))
		.catch(err => {
			emptyContents();
			$('#js-error-message').text(`Something went wrong: ${err.message}`);
		})
}

function watchForm() {
	$('form').submit(event =>  {
		event.preventDefault();
		const username = $('#js-user').val();
		getRepos(username);
		$('#js-user').val('');
	})
}

$(watchForm)