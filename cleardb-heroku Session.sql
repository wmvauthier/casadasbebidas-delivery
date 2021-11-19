CREATE TABLE usuarios (
    id_usuario int not null primary key auto_increment,
    login varchar(500),
    senha varchar(100)
);

INSERT INTO usuarios (login, senha)
VALUES ('admin', '12345');

SELECT * FROM USUARIOS;

#Acrescentar o campo de destaque depois
CREATE TABLE produtos (
    id_produto int not null primary key auto_increment,
    nome varchar(255),
    imagem varchar(255),
    valor float
);

CREATE TABLE pedidos (
    id_pedido int not null primary key auto_increment,
    cliente varchar(255),
    endereço varchar(255),
    contato varchar(255),
    ponto_referencia varchar(255),
    itens varchar(65534),
    andamento varchar(255),
    forma_pagamento varchar(255),
    valor float,
    data_hora varchar(255)
);

DROP TABLE PEDIDOS;

INSERT INTO produtos (nome, imagem, valor)
VALUES ('Coca Cola 2L', 'https://donbenicio.com.br/wp-content/uploads/2020/02/refrigerante_coca_cola_pet_2l.png', 5.50);

SELECT * FROM PRODUTOS;

    update pedidos set andamento = 0 where id_pedido = 5;

#padrão de id-qtd-preço
INSERT INTO pedidos (cliente, endereço, contato, ponto_referencia, itens, andamento, data_hora, forma_pagamento, valor)
VALUES ('PirocOsmar', 'Rua AAA', '99652-6767', 'Perto da minha casa', 'Coca-Cola 2L|3|5.5; Heineken 500mL|5|5.5;', '0', '16:07 12/12/2021', 'CRÉDITO', 250);