document.addEventListener('DOMContentLoaded', function() {
	let greetMsg = document.querySelector('.greet-message');

	if (greetMsg.innerHTML !== '') {
		setTimeout(function() {
			greetMsg.innerHTML = '';

		}, 3000);
	}
});