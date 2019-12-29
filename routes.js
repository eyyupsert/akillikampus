module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/anasayfa',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });
  //benim kodlarım anasayfa ekleme
  app.get('/anasayfa', function(req, res){
    res.sendFile(__dirname+"/anasayfa.html");
   });
   //benim koldarım
  
   //benim kodlarım profil sayfası ekleme
  app.get('/profile', function(req, res){
    res.sendFile(__dirname+"/profile.html");
   });
   //benim koldarım


   //benim kodlarım etkinlik sayfası ekleme
  app.get('/etkinlikolustur', function(req, res){
    var aciklama = req.body.aciklama;
    console.log(aciklama);
    res.sendFile(__dirname+"/etkinlikolustur.html");
   });
   //benim koldarım
 
    //benim kodlarım hakkımzda sayfası ekleme
  app.get('/hakkimizda', function(req, res){
    res.sendFile(__dirname+"/hakkimizda.html");
   });
   //benim koldarım
 

  
 
   app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });
/*
 app.get('/anasayfa', function(req, res){
    res.render('anasayfa.ejs', {message: req.flash('anasayfa')});
   });*/


 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs', {
   user:req.user
  });
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}