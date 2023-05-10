DROP TABLE Usuarios;
create table Usuarios(
	nombreApellidos    varchar(255),
    correo   varchar(50)    not null,
    telefono    INTEGER,
    pass    varchar(50)    not null,
    dni    varchar(9)    not null PRIMARY KEY
);

insert into Usuarios values('Carlos Ipiens', 111111111,'cipiqui@epsg.upv.es','123456', '12345678A');
insert into Usuarios values('Daniel Benavides', 222222222, 'dabebel@epsg.upv.es','25432184', '87654321A');
