module.exports = function greeter() {
    const RegExp = /^[A-Za-z]+$/;
	var strMessage = ' ';


    function greetUser(myName, lang) {
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

    function applyColor() {
        if (strMessage === 'Error! Please select a language' ||
            strMessage === 'Error! Do not enter special characters'
            || strMessage === 'Error! Please select enter your name') {
            return 'error'
        } else {
            return 'retry'
        }
    }

    function greetMsg() {
        return strMessage;
    }

    return {
        greetUser,
        greetMsg,
        applyColor
    }


}