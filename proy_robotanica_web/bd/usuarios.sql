DROP TABLE Usuarios;
create table Usuarios(
	nombreApellidos    varchar(255),
    correo   varchar(50)    not null,
    pass    varchar(50)    not null,
    dni    date    not null PRIMARY KEY
);

insert into Usuarios values('Carlos Ipiens', 'cipiqui@epsg.upv.es','123456', '12345678A');
insert into Usuarios values('Daniel Benavides', 'dabebel@epsg.upv.es','25432184', '87654321A');
