CREATE TABLE IF NOT EXISTS tblTulkur (
  id serial primary key,
  nafn varchar(64) not null, 
  simi varchar(64) not null,
  netfang varchar(256) not null
);

CREATE TABLE IF NOT EXISTS tblVerkefni (
  id serial primary key,
  heiti varchar(64) not null, 
  stadur varchar(64) not null,
  dagur varchar(64) not null,
  byrja_timi varchar(64) not null,
  endir_timi varchar(64) not null,
  vettvangur varchar(64) not null
);

CREATE TABLE IF NOT EXISTS tblVinna (
  id serial primary key,
  idtulkur integer not null, 
  idverkefni integer not null,
  constraint idtulkur foreign key (idtulkur) references tblTulkur(id),
  constraint idverkefni foreign key (idverkefni) references tblVerkefni (id)
);
