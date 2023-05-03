
DROP TABLE productos;
CREATE TABLE productos{
    primary key idInvernadero,
    productos varchar(50) not null,
    madurez varchar(50) not null,
    fechaPlantacion date not null,
}

insert into productos values('8AInvernadero1','Tomate,Pepino', 'Verde,Verde', '2020-01-01,2020-01-03');
insert into productos values('72AInvernadero2','Tomate,Calabaza', 'Verde,Verde', '2020-01-01,2020-01-03');