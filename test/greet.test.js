const assert = require('assert');
const greeting = require('../greet-factory');
const pgp = require('pg-promise')();
// const pgp = pgPromise();


const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_users';

const config = {
    connectionString
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}



const db = pgp(config);





describe('Greetings App', function () {
   

        beforeEach(async function () {
            // clean the tables before each test run
            await db.query('TRUNCATE TABLE users_greeted restart identity;');
            await db.query('DELETE FROM users_greeted;')
        });


        it('should increment Sapho as a value to my greeted-users property and give it a counter of 1 which will represent how many time(s) is the name greeted.', async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('saPhO', 'english');

            assert.deepEqual([{id: 1, greeted_users: "Sapho", counter: 1 }], await greetExercise.namesAdded());

        });
        it("shouldn't increment Sapho if the name is already in my object but rather increment the counter of it to 3.", async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('saphO', 'english');
            await greetExercise.addNames('sapho', 'english');
            await greetExercise.addNames('saPho', 'english');

            assert.deepEqual([{id: 1, greeted_users: "Sapho", counter: 3 }], await greetExercise.namesAdded());

        });
        it('should add a user to my array of objects and give it a counter value which will represent how many time(s) is the name greeted.', async function () {
            let greetExercise = greeting(db);


            await greetExercise.addNames('thanoS', 'english');
            await greetExercise.addNames('phumza', 'afrikaans');
            await greetExercise.addNames('lukhanyo', 'isixhosa');
            await greetExercise.addNames('lukhanyo', 'isixhosa');

            assert.deepEqual([{id:1, greeted_users: "Thanos", counter: 1 }, {id:2, greeted_users: "Phumza", counter: 1 }, {id:3, greeted_users: "Lukhanyo", counter: 2 }], await greetExercise.namesAdded());

        });
        
        it('should increment the counter from 0 to 1, when one name is greeted.', async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('saPho', 'english');

            assert.deepEqual(1, await greetExercise.getCounter());

        });
        it("shouldn't increment the counter, when the name is greeted again.", async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('saPho', 'english');
            await greetExercise.addNames('SapHo', 'isixhosa');

            assert.deepEqual(1, await greetExercise.getCounter());

        });
        it('should increment the counter to 2, once 2 names are greeted.', async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('lukhanYo', 'english');
            await greetExercise.addNames('thanOs', 'isixhosa');

            assert.deepEqual(2, await greetExercise.getCounter());

        });
        it('should increment the counter to 3, once the names are greeted.', async function () {
            let greetExercise = greeting(db);

            await greetExercise.addNames('hluMa', 'english');
            await greetExercise.addNames('sapho', 'isixhosa');
            await greetExercise.addNames('luKHanyo', 'Afikaans');
            await greetExercise.addNames('thaNos', 'Afrikaans');
            await greetExercise.addNames('phuMza', 'isixhosa');

            assert.deepEqual(3, await greetExercise.getCounter());

        });
        
        
    after( async function() {
        db.$pool.end();
    });


});

