CREATE TABLE eventos (
    id_evento int not null primary key auto_increment,
    typeEvento varchar(255),
    dataEvento varchar(255),
    vagasEvento varchar(255)
);

CREATE TABLE eventosTickets (
    id_ticket int not null primary key auto_increment,
    id_evento varchar(255),
    ticket varchar(255),
    personaData varchar(255)
);

CREATE TABLE eventosListaPersona (
    id_ListaPersona int not null primary key auto_increment,
    id_evento varchar(255),
    nome varchar(255),
    rg varchar(255)
);

SELECT * FROM PESSOAS;