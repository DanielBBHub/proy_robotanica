create table Productos(
	idInvernadero    varchar(9)    PRIMARY KEY,
    productos   varchar(50)    not null,
    madurez    varchar(50)    not null,
    fechaPlantacion    date    not null
);

insert into Productos values('78AInvernadero1','Tomate,Pepino', 'Verde,Verde', '2020-01-01,2020-01-03');
insert into Productos values('72AInvernadero2','Tomate,Calabaza', 'Verde,Verde', '2020-01-01,2020-01-03');