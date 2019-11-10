CREATE DATABASE bamazon_db;

create table products(
item_id int auto_increment not null,
product_name varchar(50),
department_name varchar(50),
price decimal(5,3),
stock_quantity int,

primary key(item_id)
);



insert into products(product_name,department_name,price,stock_quantity)
values("cool shirt","Apperal",15,30),
("cool shorts","Apperal",20,30),
("head gear","Sporting Goods",80,15),
("knee pads","Sporting Goods",30,10),
("elbow pads","Sporting Goods",15.32,15),
("Hand Wraps", "Sporting Goods",5,30),
("A good Attitude","Sporting Goods",1,1);


select * from products