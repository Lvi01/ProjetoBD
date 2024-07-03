CREATE TABLE Cartas (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255) NOT NULL,
    Tipo VARCHAR(50),
    Raridade VARCHAR(50),
    Expansao VARCHAR(100),
    Condicao VARCHAR(50),
    PrecoCompra DECIMAL(10, 2),
    PrecoVenda DECIMAL(10, 2),
    QuantidadeEstoque INT
);

CREATE TABLE Clientes (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255) NOT NULL,
    Endereco VARCHAR(255),
    Telefone VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE Vendas (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ClienteID INT,
    DataVenda DATE,
    TotalVenda DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

CREATE TABLE ItensVenda (
    VendaID INT,
    CartaID INT,
    Quantidade INT,
    PrecoUnitario DECIMAL(10, 2),
    FOREIGN KEY (VendaID) REFERENCES Vendas(ID),
    FOREIGN KEY (CartaID) REFERENCES Cartas(ID)
);

CREATE TABLE Compras (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ClienteID INT,
    DataCompra DATE,
    TotalCompra DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

CREATE TABLE ItensCompra (
    CompraID INT,
    CartaID INT,
    Quantidade INT,
    PrecoUnitario DECIMAL(10, 2),
    FOREIGN KEY (CompraID) REFERENCES Compras(ID),
    FOREIGN KEY (CartaID) REFERENCES Cartas(ID)
);

CREATE TABLE Trocas (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ClienteID INT,
    DataTroca DATE,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

CREATE TABLE ItensTroca (
    TrocaID INT,
    CartaOferecidaID INT,
    CartaRecebidaID INT,
    FOREIGN KEY (TrocaID) REFERENCES Trocas(ID),
    FOREIGN KEY (CartaOferecidaID) REFERENCES Cartas(ID),
    FOREIGN KEY (CartaRecebidaID) REFERENCES Cartas(ID)
);