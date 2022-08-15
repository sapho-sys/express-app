const assert = require('assert');
const greeting = require('../greet2-factory');
const pgp = require('pg-promise')();

describe('Greetings test without Databases', function(){
    it('should greet Sapho in English, if English radio button has be checked.', function () {
        let greetExercise = greeting();
         greetExercise.greetUser('saPhO', 'english');
        assert.equal('Hello, Sapho',  greetExercise.greetMsg());
    });
    it('should greet Thanos in Afrikaans, if Afrikaans radio button has be checked.',  function () {
        let greetExercise = greeting();
         greetExercise.greetUser('thaNos', 'afrikaans');
        assert.equal('Hallo, Thanos',  greetExercise.greetMsg());
    });
    it('should greet Lukhanyo in isiXhosa, if isiXhosa radio button has be checked.',  function () {
        let greetExercise = greeting();
         greetExercise.greetUser('lukhanYo', 'isixhosa');
        assert.equal('Molo, Lukhanyo',  greetExercise.greetMsg());

    });


})