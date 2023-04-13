// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/admin/login');
}

export function isAdmin(req, res, next){
  if (req.isAuthenticated()){
    const u = req.user;
    console.log('user.admin --> ' + u.admin);
    if(u.admin) {
      return next(); 
    }
  }
  return res.send('Ekki admin\nSkradu thig inn a /admin/login\n');
}