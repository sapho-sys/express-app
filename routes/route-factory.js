module.exports =  function (greetings){

    async function homeRoute(req, res){
        req.flash('greetUser' , greetings.getMessage());
    
        res.render("index", {
            countNames: await greetings.getCounter()
            
        });
    }
    //promise-produce
    async function actionRoute(req, res){
        //result-consume
        await greetings.greetMe(req.body.userName, req.body.language);
        await greetings.namesAdded(req.body.userName, req.body.language);
        await greetings.getCounter();
    
        res.redirect('/');


    }
    //promise
    async function greetedUsers(req,res){
        //result-consume
        res.render('greeted', {
            greetedNames: await greetings.namesAdded()
    
        });

    }
    async function overviewRoute(req, res) {
        const userSelected = req.params.username;
        const greetedCount = await greetings.namesAdded(userSelected);
    
        res.render('overview', {
            userSelected,
            greetedCount
    
        });
    }

    async function resetRoute(req, res) {
        await greetings.resetData()
    
        res.redirect('/');
    
    }

    return{
        homeRoute,
        actionRoute,
        greetedUsers,
        overviewRoute,
        resetRoute
    }
}