const express = require('express');
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const router = new express.Router();


class Person {
  constructor (nom,prenom,datenaisssance,adresseemail,rue,commune,codepostal){
    this.nom = nom;
    this.prenom = prenom;
    this.datenaisssance = datenaisssance;
    this.adresseemail = adresseemail;
    this.rue = rue;
    this.commune = commune;
    this.codepostal = codepostal;
  }
}
const personlist = [];


/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', { title: 'Express TP10' });
});

router.get('/Form', (req, res, next) => {

  res.render('Form', { title: 'Authentification' });
});


router.post(
  '/Form',
  [
    body('nom', "Empty name").trim().isLength({ min: 3 }).escape(),
    body('prenom', "Empty lastname").trim().isLength({ min: 3 }).escape(),
    body('adresse email').trim().isEmail().escape(),
    body('date de naissance').trim().isDate().isAfter("1900-01-01").toDate(),
    body('rue').trim().isLength({ min: 1 }).escape(),
    body('commune').trim().isLength({ min: 1 }).escape(),
    body('numero').trim().isLength({ min: 1 }).escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(createError(400));
    } else {

      const newperson = new Person(req.body.nom, req.body.prenom, req.body.codepostal);
      personlist.push(newperson);
      req.session.newperson;
      res.status(201);
      res.send('created');

    }
      res.redirect('/');
  });

module.exports = router;
