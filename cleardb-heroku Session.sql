CREATE TABLE igrejas (
    id_igreja int not null primary key auto_increment,
    nome varchar(255),
    endereco varchar(255),
    endereco_numero varchar(255),
    endereco_complemento varchar(255),
    endereco_bairro varchar(255),
    endereco_cidade varchar(255),
    endereco_estado varchar(255),
    endereco_pais varchar(255),
    endereco_telefone varchar(255),
    pastor varchar(255),
    regiao varchar(255),
    classificacao varchar(255),
    sede varchar(255),
    rede_social_instagram varchar(255),
    rede_social_facebook varchar(255),
    rede_social_youtube varchar(255),
    imagem_igreja varchar(500)
);

CREATE TABLE pessoas (
    id_pessoa int not null primary key auto_increment,
    imagem_pessoa varchar(500),
    nome varchar(255),
    nome_pai varchar(255),
    nome_mae varchar(255),
    nome_conjuge varchar(255),
    nome_responsavel varchar(255),
    contato_responsavel varchar(255),
    data_nascimento varchar(255),
    cpf varchar(255),
    rg varchar(255),
    endereco varchar(255),
    endereco_numero varchar(255),
    endereco_complemento varchar(255),
    endereco_bairro varchar(255),
    endereco_cidade varchar(255),
    endereco_estado varchar(255),
    endereco_pais varchar(255),
    endereco_telefone varchar(255),
    igreja varchar(255),
    tipo varchar(255),
    cargo varchar(255),
    departamento varchar(255),
    situacao varchar(255),
    profissao varchar(255),
    data_conversao varchar(255),
    igreja_conversao varchar(255),
    data_batismo varchar(255),
    igreja_batismo varchar(255),
    tipo_de_recebimento varchar(255)
);

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

CREATE TABLE eventosListaPersona (
    id_ListaPersona int not null primary key auto_increment,
    id_evento varchar(255),
    nome varchar(255),
    rg varchar(255),
    status varchar(255)
);

CREATE TABLE eventos (
    id_evento int not null primary key auto_increment,
    typeEvento varchar(255),
    dataEvento varchar(255),
    vagasEvento varchar(255)
);

CREATE TABLE musics (
    id_music int not null primary key auto_increment,
    title varchar(255),
    singer varchar(255),
    tags varchar(255),
    link varchar(255)
);

SELECT * FROM eventos;

SELECT * FROM musics;

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
