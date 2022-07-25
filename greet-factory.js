module.exports = function greeting(namesData) {

	var storeNames = namesData || {};
	var counter = 1;
	const RegExp = /^[A-Za-z]+$/;
	var strMessage = ' ';


	function greetUser(myName, lang) {
		let theName = '';
		let strName = myName.trim();

		try {
			
			if (strName !== '' ) {
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
						strMessage = 'Error! language not selected';

					}

				} else {
					strMessage = 'Error! special characters entered';

				}

			} else {
				strMessage = 'Error! name not entered';

			}

		}

		catch (err) {
			console.error('Somethin went wrong', err);
			throw err;
		}


	}


	function addNames(name, lang) {
		if (name !== "" && lang !== "") {
			if (name.match(RegExp)) {
				var strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
				if (!storeNames[strName]) {
					storeNames[strName] = 1;
					counter++;

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

	return {
		getCounter,
		namesAdded,
		greetUser,
		greetMsg,
		addNames




	}
}
