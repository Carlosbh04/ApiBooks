const { Router } = require('express');
const router = Router();
const myBooksCtrl =  require('../controller/book.controller');

//-- Rutas de usuario.
router.post("/register", myBooksCtrl.registerUser);
router.post("/login", myBooksCtrl.loginUser);

//-- Rutas de libros.
router.get("/books", myBooksCtrl.getBook);
router.post("/books", myBooksCtrl.postBook);
router.put("/books", myBooksCtrl.putBook);
router.delete("/books", myBooksCtrl.delBook);

module.exports = router;