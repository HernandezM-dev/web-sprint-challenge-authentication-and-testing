const router = require('express').Router();

router.post('/register', (req, res) => {
  const userInfo = req.body;
  const isValid = validateUser(userInfo);

  if (isValid) {
      // hash the password before saving the user to the database
      const rounds = process.env.BCRYPT_ROUNDS || 4;
      const hash = bcryptjs.hashSync(userInfo.password, rounds);
      userInfo.password = hash;

      Users.add(userInfo)
          .then(inserted => {
              res.status(201).json({ data: inserted });
          })
          .catch(error => {
              res.status(500).json({ message: error.message });
          });
  } else {
      res.status(400).json({
          message: "Invalid information, plese verify and try again",
      });
  }
});

router.post('/login', (req, res) => {

});

router.get("/logout", (req, res) => {
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              res.status(500).json({
                  message: "Logout Successful",
              });
          } else {
              res.status(204).end();
          }
      });
  } else {
      res.status(204).end();
  }
});


function validateUser(user) {
  // has username, password and role
  return user.username && user.password && user.role ? true : false;
}

function validateCredentials(creds) {
  // has username, password and role
  return creds.username && creds.password ? true : false;
}
module.exports = router;
