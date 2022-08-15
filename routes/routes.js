
const greeter = require('../greet2-factory');
module.exports = function (greeting,greeter) {
    async function defaultRoute(req, res) {
        res.render('index', {
            greetedUsers: await greeting.getCounter(),
            color: greeter.applyColor()
        });

    }

    async function HomePage(req, res) {
        try {
            greeter.greetUser(req.body.username, req.body.choice);
            await greeting.addNames(req.body.username, req.body.choice);
            let greeterMsg = greeter.greetMsg();
            let greetedUsers = await greeting.getCounter();
            let color = greeter.applyColor()
            res.render('index', {
                greeterMsg,
                greetedUsers,
                color
            
            })
        } catch (error) {
            console.log(error);
        }


    }

    async function Detail(req, res) {
        let bigData = await greeting.namesAdded()
        res.render('detail', {
            allUsers: bigData
        });

    }

    async function Information(req, res) {
        const user_greeted = req.params.username;
        const greetedNum = await greeting.greetedPool(user_greeted);
        res.render('info', {
            user_greeted,
            greetedNum
        })

    }

    async function Reset(req, res) {
        await greeting.resetDB();
        res.redirect('/');
    }

    return {
        defaultRoute,
        Information,
        Detail,
        HomePage,
        Reset
    }




}