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

select
    *
from
    pessoas;