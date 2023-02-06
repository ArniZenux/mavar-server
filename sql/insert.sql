 INSERT INTO tblTulkur 
(zname, phonenr, email, zstatus) 
VALUES ('Eyrún Helga', 
        '9871234', 
        'eh@mavar.is',
        'Hættur'
      );

INSERT INTO tblTulkur 
(zname, phonenr, email, zstatus) 
VALUES ('Anna Dagmar', 
        '9877777', 
        'ad@mavar.is',
        'Virkur'
      );

INSERT INTO tblTulkur 
(zname, phonenr, email, zstatus) 
VALUES ('Sigrún Erna', 
        '4448785', 
        'se@mavar.is',
        'í leyfi'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Marel í viðtal', 
        'Garðabæ', 
        '23.12.2022',
        '9:00',
        '10:00',
        'Atvinnumál',
        'Þórhallur Snær Árnasson'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Brúðkaup þeirra Katheine og John Romer', 
        'Viðey', 
        '1.7.2022',
        '12:00',
        '18:00',
        'Almennt',
        'Páll Óskar Jónasson'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '11.10.2022',
        '19:00',
        '20:00',
        'Skólamál',
        'Haukur Hjálmarsson'
      );

INSERT INTO tblVinna 
(idtulkur, idverkefni) 
VALUES ('1', 
        '1' 
      );

INSERT INTO tblVinna 
(idtulkur, idverkefni) 
VALUES ('2', 
        '2' 
      );

INSERT INTO tblVinna 
(idtulkur, idverkefni) 
VALUES ('2', 
        '3' 
      );

INSERT INTO tblUsers 
(nameuser, email, phonenr, username, password, admin) 
VALUES ('Admin',
        'admin@shh.is',
        '1234567',
        'admin', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        true
      );

INSERT INTO tblUsers 
(nameuser, email, phonenr, username, password, admin) 
VALUES ('John', 
        'anna@simnet.is',
        '9876543',
        'anna', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblCustom 
(zname, email, phonenr) 
VALUES ('Þór Ingi Jónsson',
        '5551254',
        'thor@hti.is'
      );

INSERT INTO tblCustom 
(zname, email, phonenr) 
VALUES ('Hjördis Ösp Karlsdóttir',
        '8548362',
        'hjordis_osp@gmail.com'
      );

INSERT INTO tblBeidni
(zname, zdesc, place, zday, start_time, last_time, zstatus, explanation, interpreter)
VALUES ('Þórhallur Ingasson',
        'Námskeið í Reykjavíkarskóli um ljós og hljóð',
        'Reykjavík',
        '18.11.2022',
        '18:00',
        '18:30',
        1,
        'Túlkur kemur',
        'Árný Rósa'
       );

INSERT INTO tblBeidni
(zname, zdesc, place, zday, start_time, last_time, zstatus, explanation, interpreter)
VALUES ('Sæþór Jónsson',
        'Námskeið í FB',
        'Reykjavík',
        '11.03.2023',
        '11:00',
        '00:00',
        0,
        'Enginn laus',
        'Enginn laus'
       );

INSERT INTO tblBeidni
(zname, zdesc, place, zday, start_time, last_time, zstatus, explanation, interpreter)
VALUES ('Sæþór Jónsson',
        'Fundur með ráðherra um túlkamál',
        'Reykjavík',
        '11.04.2023',
        '10:00',
        '12:00',
        3,
        'Afbókun',
        'Afbókun'
       );

INSERT INTO tblList
(lysing, stadur, dagur, byrja_timi, tulkur)
VALUES ('Námskeið í vinnuskólann',
        'Reykjavík',
        '11.12.2022',
        '11:00',
        'Rósa Björk'
       );

INSERT INTO tblEventTable
(title, start_event, end_event, allDay)
VALUES ('Bauhaus - stöðufundur',
        'January 2, 2023 10:00:00',
        'January 2, 2023 12:00:00',
        true
       );

INSERT INTO tblEventTable
(title, start_event, end_event, allDay)
VALUES ('Byko - stöðufundur',
        'January 12, 2023 10:00:00',
        'January 12, 2023 12:00:00',
        true
       );

INSERT INTO tblEventTable
(title, start_event, end_event, allDay)
VALUES ('Vinnufundur Sigrun - Hafnarfjörður',
        'January 26, 2023 20:00:00',
        'January 26, 2023 21:00:00',
        true
       );

INSERT INTO tblEventTable
(title, start_event, end_event, allDay)
VALUES ('Húsafundur Sigrun - Breiðholt',
        'January 22, 2023 20:00:00',
        'January 22, 2023 21:00:00',
        true
       );

INSERT INTO tblEventVinna 
(idtulkur) 
VALUES ('1');

INSERT INTO tblEventVinna 
(idtulkur) 
VALUES ('2');

INSERT INTO tblEventVinna 
(idtulkur) 
VALUES ('3');

INSERT INTO tblEventVinna 
(idtulkur) 
VALUES ('3');