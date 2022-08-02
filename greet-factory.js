const moment = require('moment');
module.exports = function greeting(db) {

	const data = db;
	const RegExp = /^[A-Za-z]+$/;
	var strMessage = ' ';
	


	async function greetUser(myName, lang) {
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


	async function addNames(userName, lang) {

		let name = userName.trim()
		if (name !== "" && lang !== "") {
			if (name.match(RegExp)) {
				strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
				if (lang === 'english' || lang === 'afrikaans' || lang === 'isixhosa') {
					const sql = await data.manyOrNone('SELECT * FROM users_greeted WHERE greet_users = $1', [strName]);

					if (sql[0].rows == 0) {
						await data.none('INSERT INTO users_greeted (greeted_users, counter) VALUES ($1,$2)', [strName, 1]);
					} else {
						await data.none('UPDATE users_greeted SET counter = counter + 1 WHERE greeted_users = $1', [strName]);
					}

				}

			}
		}
	}

	function greetMsg() {
		return strMessage;
	}

	async function getCounter() {
		const dataLength = await data.manyOrNone('SELECT COUNT(*) FROM users_greeted');
		return dataLength.rows[0].count;

	}

	async function resetDB() {
		strMessage = "Date erased...";
		return data.none('DELETE FROM users_greeted');
	}

	function namesAdded() {
		return storeNames;

	}
	
	

	

	return {
		getCounter,
		namesAdded,
		greetUser,
		greetMsg,
		addNames,
		resetDB




	}
}
