CREATE TABLE usuarios (
    id_usuario int not null primary key auto_increment,
    login varchar(500),
    senha varchar(100)
);

INSERT INTO usuarios (login, senha)
VALUES ('admin', '12345');

SELECT * FROM USUARIOS;

CREATE TABLE usuarios (
    id_usuario int not null primary key auto_increment,
    login varchar(500),
    senha varchar(100)
);

CREATE TABLE eventosTickets (
    id_ticket int not null primary key auto_increment,
    id_evento varchar(255),
    ticket varchar(255),
    personaData varchar(255)
);

SELECT * FROM eventos;

ALTER TABLE eventos ADD horaEvento varchar(255);

DELETE FROM eventos where id_evento = '201';

SELECT * FROM eventosListaPersona;
SELECT * FROM eventostickets;

select * from eventos;

UPDATE eventos SET horaEvento = "15:00" where id_evento = 338;
UPDATE eventos SET dataEvento = "09/05/2021" where id_evento = 358;

INSERT INTO musics (title, singer, tags, link)
VALUES ('Santo', 'Fernanda Brum', 'SANTO', 'https://www.youtube.com/watch?v=dODbncqqIKU');

INSERT INTO eventos (typeEvento, dataEvento, vagasEvento, horaEvento)
VALUES ('1', '20/06/2021', '45', '15:00');

SELECT * FROM pessoas WHERE tipo IN ('Membro', 'Obreiro', 'Pastor', 'Convenção');

