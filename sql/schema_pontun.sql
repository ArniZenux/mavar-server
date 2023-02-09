/* Beiðni */
CREATE TABLE IF NOT EXISTS tblBeidni (
  id serial primary key,
  zname varchar(64) not null, 
  zdesc varchar(300) not null, 
  place varchar(64) not null,
  zday varchar(64) not null,
  start_time varchar(64) not null,
  last_time varchar(64) not null,
  zstatus integer not null,
  explanation varchar(64),
  interpreter varchar(64)
);

/* Viðskiptavinur */
CREATE TABLE IF NOT EXISTS tblCustom (
  id serial primary key,
  zname varchar(64) not null, 
  phonenr varchar(64) not null,
  email character varying(100) not null
);

/* Custom order a project and interpreter works on a project*/
CREATE TABLE IF NOT EXISTS tblOrder (
  id serial primary key,
  idcustom integer not null, 
  idproject serial,
  constraint idcustom foreign key (idcustom) references tblCustom(id),
  constraint idproject foreign key (idproject) references tblProject (id)
);

CREATE TABLE IF NOT EXISTS tblUsers (
  id serial primary key,
  nameuser varchar(64) not null, 
  email character varying(100) not null, 
  phonenr varchar(10) not null, 
  username character varying(64) not null,
  password character varying(256) not null,
  admin boolean not null
);