module.exports = function greeting(db) {
	console.log();

	const data = db;
	const RegExp = /^[A-Za-z]+$/;
	var strMessage = ' ';
	


	async function greetUser(myName, lang) {
		let theName = '';
		let strName = myName.trim();



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

		async function applyColor(){
			if(strMessage === 'Error! Please select a language' || 
			strMessage === 'Error! Do not enter special characters'
			 || strMessage === 'Error! Please select enter your name'){
				return 'error'
			 }else{
				return 'retry'
			 }
		}
   
	


	async function addNames(userName, lang) {
		let name = userName.trim()
		try{
			if (name !== "" && lang !== "") {
				if (name.match(RegExp)) {
					strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
					if (lang === 'english' || lang === 'afrikaans' || lang === 'isixhosa') {
						const sql = await data.manyOrNone('SELECT * FROM users_greeted WHERE greeted_users  = $1', [strName]);
	
						console.log(sql)
						if (sql.length == 0) {
							await data.manyOrNone('INSERT INTO users_greeted (greeted_users, counter) VALUES ($1,$2)', [strName, 1]);
						} else {
							await data.manyOrNone('UPDATE users_greeted SET counter = counter + 1 WHERE greeted_users = $1', [strName]);
						}
	
					}
	
				}
			}

		}
		 catch(err){
			console.error('Somethin went wrong', err);
			throw err;

		 }

		
		
	}

	 function greetMsg() {
		return strMessage;
	}

	async function getCounter() {
		const dataLength = await data.manyOrNone('SELECT COUNT(*) FROM users_greeted');
		console.log(dataLength);
		 return dataLength[0].count;

	}

	async function resetDB() {
		return data.none('DELETE FROM users_greeted');
	}

	async function namesAdded() {
		const storedNames = await data.manyOrNone('SELECT * FROM users_greeted');

		return storedNames;
	}

	async function greetedPool(username){
		const sqlData = await data.manyOrNone('SELECT * FROM  users_greeted  WHERE greeted_users = $1',[username]);
		const myCount = sqlData;
		return myCount[0].counter;
	}

	

	
	
	

	

	return {
		getCounter,
		namesAdded,
		greetUser,
		greetMsg,
		addNames,
		resetDB,
		greetedPool,
		applyColor
	}
}
