
Drop table Productos;
create table Productos{
    primary key not null auto_increment idInvernadero,
    productos varchar(50) not null,
    madurez varchar(50) not null,
    fechaPlantacion date not null,
}

insert into Productos values('Tomate', 'Verde', '2020-01-01');