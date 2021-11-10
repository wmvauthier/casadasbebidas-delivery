CREATE TABLE usuarios (
    id_usuario int not null primary key auto_increment,
    login varchar(500),
    senha varchar(100)
);

INSERT INTO usuarios (login, senha)
VALUES ('admin', '12345');

SELECT * FROM USUARIOS;

CREATE TABLE produtos (
    id_produto int not null primary key auto_increment,
    nome varchar(255),
    imagem varchar(255),
    valor float
);

CREATE TABLE pedidos (
    id_produto int not null primary key auto_increment,
    cliente varchar(255),
    endereço varchar(255),
    contato varchar(255),
    ponto_referencia varchar(255),
    itens varchar(255),
    andamento varchar(255),
    valor float
);

INSERT INTO produtos (nome, imagem, valor)
VALUES ('Coca Cola 2L', 'https://donbenicio.com.br/wp-content/uploads/2020/02/refrigerante_coca_cola_pet_2l.png', 5.50);

