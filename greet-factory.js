const moment = require('moment');
module.exports = function greeting(namesData) {

	var storeNames = namesData || {};

	const RegExp = /^[A-Za-z]+$/;
	var strMessage = ' ';
	let allUsers = [];


	function greetUser(myName, lang) {
		let theName = '';
		let strName = myName.trim();

		try {

			if (strName !== '') {
				if (strName.match(RegExp)) {
					theName = strName.charAt(0).toUpperCase() + strName.slice(1).toLowerCase();

					if (lang === 'english' || lang === 'afrikaans' || lang === 'isixhosa') {
						if (lang === 'english') {
							strMessage = 'Hello, ' + theName;

						} else if (lang === 'afrikaans') {
							strMessage = 'Hallo, ' + theName;

						} else if (lang === 'isixhosa') {
							strMessage = 'Molo, ' + theName;

						}

					} else {
						strMessage = 'Error! Please select a language';

					}

				} else {
					strMessage = 'Error! Do not enter special characters';

				}

			} else {
				strMessage = 'Error! Please select enter your name';

			}

		}

		catch (err) {
			console.error('Somethin went wrong', err);
			throw err;
		}


	}


	function addNames(userName, lang) {

		let name = userName.trim()
		if (name !== "" && lang !== "") {
			if (name.match(RegExp)) {
				strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
				if (!storeNames[strName]) {
					storeNames[strName] = 1;
				} else {
					storeNames[strName]++;

				}
			}
		}
	}

	function greetMsg() {
		return strMessage;
	}

	function getCounter() {
		return Object.keys(storeNames).length;

	}

	function namesAdded() {
		return storeNames;

	}
    let counter = 0;
	let username="";

	function setData() {

		
			allUsers.push({
				username: String(username),
				count: counter
			})


	}

	function storedData() {
		return allUsers;

	}

	return {
		getCounter,
		namesAdded,
		greetUser,
		greetMsg,
		addNames,
		setData,
		storedData




	}
}
