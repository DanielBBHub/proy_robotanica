DROP TABLE Usuarios;
create table Usuarios(
	nombreApellidos    varchar(255),
    correo   varchar(50)    not null,
    telefono    INTEGER,
    pass    varchar(50)    not null,
    dni    varchar(9)    not null PRIMARY KEY,
    token varchar(250),
    verify INTEGER DEFAULT 0,
    imagen varchar(255)
);

insert into Usuarios values('Carlos Ipiens', 'cipiqui@epsg.upv.es',111111111, '123456', '12345678A', NULL, 0, "");
insert into Usuarios values('Daniel Benavides', 'dabebel@epsg.upv.es', 222222222,'25432184', '87654321A', NULL, 0, "");
