
module.exports = function greeting(namesData) {
    var theName = "";
var storeNames = namesData || {};
    var counter = 0;
    const RegExp = /^[A-Za-z]+$/;

    function setName(myName) {
        if (myName !== "" ) {
            theName = myName.trim();   
           
        }
    }

    function getName() {
        return  theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();

    }

    

    function greetMe(checkedLanguage) {
            if (checkedLanguage === "english") {
                return "Hello, " + getName();
 
            } else if (checkedLanguage === "afrikaans") {
                return "Hallo, " + getName();

            } else if (checkedLanguage === "isixhosa") {
                return "Molo, " + getName();

            } 
    }

    function addNames(name, lang) {
        if(name !=="" && lang !== ""){
            if (name.match(RegExp)) {
                var strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                if(!storeNames[strName]) {
                    storeNames[strName] = 1;
                    counter++;
                    
                } else {
                    storeNames[strName]++;

                }
            } 
        }
        
    }

    function getCounter(){
        return Object.keys(storeNames).length;

    }

    function namesAdded(){ 
        return storeNames;

    }

    return {
        setName,
        getName,
        greetMe,
        addNames,
        getCounter,
        namesAdded,

    }
}