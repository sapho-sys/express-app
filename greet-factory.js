
module.exports = function greeting(namesData) {
    var theName = "";
    var storeNames = namesData || {};
    var counter = 0;
    const RegExp = /^[A-Za-z]+$/;
    let ourList = [];
    var strGreet="";

    function setName(myName) {
        if (myName !== "") {
            theName = myName.trim();

        }
    }

    function getName() {
        return theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();

    }

    
   



    async function greetMe(myName,checkedLanguage) {
        if (myName !== "") {
            theName = myName.trim();
            if (checkedLanguage === "english") {
                let theName = getName();
                strGreet = "Hello, " + theName;
    
            } else if (checkedLanguage === "afrikaans") {
                let theName = getName();
                strGreet = "Hallo, " + theName;
    
            } else if (checkedLanguage === "isixhosa") {
                let theName = getName();
                strGreet = "Molo, " + theName;
    
            }

        }
        
        
       
    }

    async function addNames(name, lang) {
        if (name !== "" && lang !== "") {
            if (name.match(RegExp)) {
                var strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                if (!storeNames[strName]) {
                    storeNames[strName] = 1;
                    counter++;

                } else {
                    storeNames[strName]++;

                }
            }else{
                errorMessage = "error1";

            }
        } else{
            errorMessage = "error2";
        }
        
    }
    async function getMessage(){
        return strGreet;
    }

    async function getCounter() {
        return Object.keys(storeNames).length;

    }

    async function namesAdded() {
       return storeNames;
    }
    

    return {
        setName,
        getName,
        greetMe,
        addNames,
        getCounter,
        namesAdded,
        getMessage

    }
}