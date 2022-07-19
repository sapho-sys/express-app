const assert = require("assert");
const greeting = require("../greet-factory")


describe('Greetings App', function () {
    
    describe('Set the name and get the name', function () {
        it('should display "Sapho", when Sapho has been entered in the textbox', async function () {
            let greetExercise = greeting();

            await greetExercise.setName('Sapho');
            assert.equal('Sapho', greetExercise.getName());

        });
        it('should display "Thanos", when Thanos has been entered in the textbox', async function () {
            let greetExercise = greeting();

            await greetExercise.setName('thanos');
            assert.equal('Thanos', greetExercise.getName());

        });
        it('should display "Lukhanyo", when Lukhanyo has been entered into the textbox', async function () {
            let greetExercise = greeting();

            await greetExercise.setName('LUKHANYO');
            assert.equal('Lukhanyo', greetExercise.getName());

        });
    });

    describe('Greet our users', function () {
        it('should greet Sapho in English, if English radio button has be checked.', async function () {
            let greetExercise = greeting();

                  
            await greetExercise.greetMe('saPhO','english');

            assert.equal('Hello, Sapho', await greetExercise.getMessage());

        });
        it('should greet Thanos in Afrikaans, if Afrikaans radio button has be checked.', async function () {
            let greetExercise = greeting();

        
            await greetExercise.greetMe('thaNos','afrikaans');

            assert.equal('Hallo, Thanos', await greetExercise.getMessage());

        });
        it('should greet Lukhanyo in isiXhosa, if isiXhosa radio button has be checked.', async function () {
            let greetExercise = greeting();

           
            await greetExercise.greetMe('lukhanYo','isixhosa');

            assert.equal('Molo, Lukhanyo', await greetExercise.getMessage());

        });
    });

    describe('Increment names to my empty object', function () {
        it('should increment Sapho as a key to my empty object and give it a value of 1 which will represent how many time(s) is the name greeted.', async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('saPhO', 'english');

            assert.deepEqual({ Sapho: 1 }, await greetExercise.namesAdded());

        });
        it("shouldn't increment Sapho if the name is already in my object but rather increment the value of it to 3.", async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('saphO', 'english');
            await greetExercise.addNames('sapho', 'english');
            await greetExercise.addNames('saPho', 'english');

            assert.deepEqual({ Sapho: 3 }, await greetExercise.namesAdded());

        });
        it('should add 1 name to my local storage and give it a value of 1 which will represent how many time(s) is the name greeted.', async function () {
            let greetExercise = greeting();


            await greetExercise.addNames('thanoS', 'english');
            await greetExercise.addNames('phumza', 'afrikaans');
            await greetExercise.addNames('lukhanyo', 'isixhosa');

            assert.deepEqual({ Thanos: 1, Phumza: 1, Lukhanyo: 1 }, await greetExercise.namesAdded());

        });
        it('should add 2 names to my local storage and give it a value of 2 which will represent how many time(s) is the name greeted.', async function () {
            let greetExercise = greeting();


            await greetExercise.addNames('thanos', 'english');
            await greetExercise.addNames('phumza', 'afrikaans');
            await greetExercise.addNames('lukhanyo', 'isixhosa');
            await greetExercise.addNames('thaNos', 'isixhosa');
            await greetExercise.addNames('lukhanYO', 'English');
            await greetExercise.addNames('Phumza', 'Afrikaans');

            assert.deepEqual({ Thanos: 2, Phumza: 2, Lukhanyo: 2 }, await greetExercise.namesAdded());

        });
    });

   
    describe('Greet counter', function () {
        it('should increment the counter from 0 to 1, when one name is greeted.', async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('saPho', 'english');

            assert.deepEqual(1, await greetExercise.getCounter());

        });
        it("shouldn't increment the counter, when the name is greeted again.", async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('saPho', 'english');
            await greetExercise.addNames('SapHo', 'isixhosa');

            assert.deepEqual(1, await greetExercise.getCounter());

        });
        it('should increment the counter to 2, once 2 names are greeted.', async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('lukhanYo', 'english');
            await greetExercise.addNames('thanOs', 'isixhosa');

            assert.deepEqual(2, await greetExercise.getCounter());

        });
        it('should increment the counter to 5, once the names are greeted.', async function () {
            let greetExercise = greeting();

            await greetExercise.addNames('hluMa', 'english');
            await greetExercise.addNames('sapho', 'isixhosa');
            await greetExercise.addNames('luKHanyo', 'Afikaans');
            await greetExercise.addNames('thaNos', 'Afrikaans');
            await greetExercise.addNames('phuMza', 'isixhosa');

            assert.deepEqual(5, await greetExercise.getCounter());

        });
    });
});