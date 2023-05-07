DROP TABLE Productos;
create table Productos(
	idInvernadero    varchar(9)    PRIMARY KEY,
    productos   varchar(50)    not null,
    madurez    varchar(50)    not null,
    fechaPlantacion    varchar(255)    not null,
    coords    varchar(255)    not null 
      
);

insert into Productos values('78AInvernadero1','Tomate,Pepino', 'Verde,Verde', '2020-01-01,2020-01-03', '2,2,3,3');
insert into Productos values('72AInvernadero2','Tomate,Calabaza', 'Verde,Verde', '2020-01-01,2020-01-03', '1,2,4,1');