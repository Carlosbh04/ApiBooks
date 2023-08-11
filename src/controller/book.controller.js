const {pool} = require('../database');

//-- Funciones para controlar al usuario.
function validateUserData(data) {
  if (!data.name || !data.last_name || !data.email || !data.password) {
      return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
      return false;
  }

  // Verificar el campo photo solo si está presente en los datos
  if (data.photo && typeof data.photo !== 'string') {
      return false;
  }

  return true;
}
async function registerUser(req, res) {
  const { name, last_name, email,photo, password } = req.body;

  if (!validateUserData({ name, last_name, email, photo, password })) {
      const answer = { error: true, code: 400, message: "Datos de usuario inválidos", data: null, result: null };
      return res.status(400).send(answer);
  }

  const params = [name, last_name, email, photo, password];
  const sql = `INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?,?);`;

  try {
      const [result] = await pool.query(sql, params);
      const answer = { error: false, code: 200, message: "Usuario registrado correctamente", data: null, result: result };
      res.send(answer);
  } catch (error) {
      const answer = { error: true, code: 500, message: "Error al registrar el usuario", data: null, result: null };
      res.status(500).send(answer);
  }
}

async function loginUser(req,res){
    //-- Obtener los datos del nuevo usuario por el body de la petición
    const {email,password} = req.body;
    const params = [email,password];
    let sql = `SELECT Id_user,name,last_name,email,photo FROM user WHERE email = ? AND password = ?;`;
    let answer;

    try {
        const [result] = await pool.query(sql,params);
        if (result.length === 0) {
            answer = {error: true, code: 200, message: "User not found", data:null, result:result};
        }else{
            answer = {error: false, code: 200, message: "User found", data:null, result:result};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

//-- Funciones para gestionar los libros.

async function getBook(req,res){
    const {Id_user,Id_book} = req.query;
    const params = [Id_user,Id_book];
    let answer;
    let sql;
    //-- Definir las peticiones dependiendo de los dos casos q se pueden dar
    if (Id_user != undefined && Id_book == undefined) {
        sql = `SELECT * FROM book WHERE Id_user = ?;`;
    }else{
        sql = `SELECT * FROM book WHERE Id_user = ? AND Id_book = ?;`;
    }

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Book not found", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book found", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

async function postBook(req,res){
    const {Id_user,title,type,author,price,photo} = req.body;
    const params = [Id_user,title,type,author,price,photo];
    let sql= `INSERT INTO book (Id_user,title,type,author,price,photo) VALUES (?,?,?,?,?,?);`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Registration error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book registered correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}


async function putBook(req,res){
    const {Id_book,Id_user,title,type,author,price,photo} = req.body;
    const params = [
        title? title: null,
        type? type: null,
        author? author: null,
        price? price: null,
        photo? photo: null,
        Id_book? Id_book: null,
        Id_user? Id_user: null
    ];
    let sql = `UPDATE book SET title = COALESCE(?,title),
                                    type = COALESCE(?,type),
                                    author = COALESCE(?,author),
                                    price = COALESCE(?,price),
                                    photo = COALESCE(?,photo)
                                    WHERE id_book = ? AND id_user = ?;`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Update error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book updated correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

async function delBook(req,res){
    const {Id_book} = req.body;
    const params = [Id_book];
    let sql= `DELETE FROM book WHERE Id_book = ?`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Delete error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book deleted correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {registerUser,loginUser,getBook,postBook,putBook,delBook};