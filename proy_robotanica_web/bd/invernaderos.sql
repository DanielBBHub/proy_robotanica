
drop table invernaderos;

create table invernaderos{
    primary key not null dniUser,
    nombre varchar(50) not null,
    direccion varchar(50) not null,
    area int not null,
    tipo varchar(50) not null,
    foreign key (idInvernadero) references Productos(idInvernadero)
}

insert into invernaderos values('12345678A', 'Invernadero1', 'Calle Falsa 123', 100, 'Hidroponico');