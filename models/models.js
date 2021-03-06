var path = require('path');

//Cargar Modelo ORM

var Sequelize = require('sequelize');

//usar BBDD SQLite:
var sequelize = new Sequelize(null,null,null,
		{ dialect: "sqlite", storage:"quiz-sqlite"}
		);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar definicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas DB
sequelize.sync().then(function(){
	//success es para la version anterior ahora es then
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count === 0) {//la tabla se inicializa sola si esta vacia
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma' 
			})
			//Quiz.create({
			//	pregunta: 'Capital de Portugal',
			//	respuesta: 'Lisboa'
			//})
			.then(function(){
				console.log('Base de datos inicializada')
			});
		};
	});
});

//Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //exporta tabla Quiz
exports.Comment = Comment;