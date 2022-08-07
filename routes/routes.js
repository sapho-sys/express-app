module.exports = function (greeting) {
    async function Autopilot(req, res) {
        req.flash('message', greeting.greetMsg());

        res.render('index', {
            greetedUsers: await greeting.getCounter(),
            greetUsers: await greeting.greetMsg()


        });


    }

    async function HomePage(req, res) {
        try {
            await greeting.greetUser(req.body.username, req.body.choice);

            await greeting.addNames(req.body.username, req.body.choice);

            let greeter = await greeting.greetMsg();

            let greetedUsers = await greeting.getCounter();

            res.render('index', {
                greeter,
                greetedUsers
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
        Autopilot,
        Information,
        Detail,
        HomePage,
        Reset
    }




}