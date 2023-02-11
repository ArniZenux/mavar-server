/* Interpreter */ 
CREATE TABLE IF NOT EXISTS tblInterpreter (
  id serial primary key,
  zname varchar(64) not null, 
  phonenr varchar(64) not null,
  email varchar(256) not null,
  zstatus varchar(64) not null
);

/* Customs */
CREATE TABLE IF NOT EXISTS tblCustom (
  id serial primary key,
  znamec varchar(64) not null, 
  phonenr varchar(64) not null,
  email character varying(100) not null
);

/* Project */
CREATE TABLE IF NOT EXISTS tblProject (
  id serial primary key,
  title varchar(64) not null, 
  place varchar(64) not null,
  zday varchar(64) not null,
  start_time varchar(64) not null,  
  last_time varchar(64) not null,
  scene varchar(64) not null,
  start_event varchar(64) not null,
  last_event varchar(64) not null,
  allDay boolean not null 
);

/* Interpreter works a project */
CREATE TABLE IF NOT EXISTS tblWorks (
  id serial primary key,
  idinterpreter integer not null, 
  idproject serial,
  constraint idinterpreter foreign key (idinterpreter) references tblInterpreter(id),
  constraint idproject foreign key (idproject) references tblProject (id)
);

/* Custom order a project and interpreter works on a project*/
CREATE TABLE IF NOT EXISTS tblOrder (
  id serial primary key,
  idcustom integer not null, 
  idproject serial,
  constraint idcustom foreign key (idcustom) references tblCustom(id),
  constraint idproject foreign key (idproject) references tblProject (id)
);

CREATE TABLE IF NOT EXISTS tblEventTable (
  id serial primary key,
  title varchar(300) not null, 
  start_event varchar(64) not null,
  end_event varchar(64) not null,
  allDay boolean not null
);

CREATE TABLE IF NOT EXISTS tblEventVinna (
  id serial primary key,
  idinterpreter integer not null, 
  idproject serial, 
  constraint idinterpreter foreign key (idinterpreter) references tblInterpreter(id),
  constraint idproject foreign key (idproject) references tblEventTable (id)
);

/* Notandi og password for login */
CREATE TABLE IF NOT EXISTS tblUsers (
  id serial primary key,
  zname varchar(64) not null, 
  email character varying(100) not null, 
  phonenr varchar(10) not null, 
  username character varying(64) not null,
  password character varying(256) not null,
  admin boolean not null
);

/* Pöntunarsíða og bókunarsíða */
/*  Beiðni  -> tblRequest */ 
CREATE TABLE IF NOT EXISTS tblBeidni (
  id serial primary key,
  znamec varchar(64) not null, 
  zdesc varchar(300) not null, 
  place varchar(64) not null,
  zday varchar(64) not null,
  start_time varchar(64) not null,
  last_time varchar(64) not null,
  zstatus integer not null,
  zchecked integer not null,
  explanation varchar(64),
  interpreter varchar(64)
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

/*
CREATE TABLE IF NOT EXISTS tblList (
  id serial primary key,
  lysing varchar(300) not null, 
  stadur varchar(64) not null,
  dagur varchar(64) not null,
  byrja_timi varchar(64) not null,
  tulkur varchar(64) not null 
);*/

/*CREATE TABLE IF NOT EXISTS tblVinna (
  id serial primary key,
  idtulkur integer not null, 
  idverkefni integer not null,
  constraint idtulkur foreign key (idtulkur) references tblTulkur(id),
  constraint idverkefni foreign key (idverkefni) references tblVerkefni (id)
);*/

/*
CREATE TABLE IF NOT EXISTS tblVerkefni (
  id serial primary key,
  heiti varchar(64) not null, 
  stadur varchar(64) not null,
  dagur varchar(64) not null,
  byrja_timi varchar(64) not null,
  endir_timi varchar(64) not null,
  vettvangur varchar(64) not null,
  nameuser varchar(64) not null 
);*/