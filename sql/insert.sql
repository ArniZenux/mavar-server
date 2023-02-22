 INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Eyrún Helga', 
        '9871234', 
        'eh@mavar.is',
        'Hættur'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Anna Dagmar', 
        '9877777', 
        'ad@mavar.is',
        'Virkur'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Sigrún Erna', 
        '4448785', 
        'se@mavar.is',
        'í leyfi'
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Marel í viðtal', 
        'Garðabæ', 
        '2.1.2023',
        '10:00',
        '12:00',
        'Atvinnumál',
        'January 2, 2023 10:00:00',
        'January 2, 2023 12:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Brúðkaup þeirra Katheine og John Romer', 
        'Viðey', 
        '7.1.2023',
        '12:00',
        '18:00',
        'Almennt',
        'January 7, 2023 12:00:00',
        'January 7, 2023 18:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '10.1.2023',
        '19:00',
        '20:00',
        'Skólamál',
        'January 10, 2023 19:00:00',
        'January 10, 2023 20:00:00',
        true
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Þór Ingi Jónsson',
        '5551254',
        'thor@hti.is'
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Hjördis Ösp Karlsdóttir',
        '8548362',
        'hjordis_osp@gmail.com'
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('1' 
        );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('2' 
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('2' 
      );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('1' 
      );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('1' 
      );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('2' 
        );

INSERT INTO tblBeidni
(znamec, zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Sæþór Jónsson',
        'Fundur með ráðherra um túlkamál',
        'Reykjavík',
        '11.04.2023',
        '10:00',
        '12:00',
        3,
        1,
        'Afbókun',
        'Afbókun'
       );

INSERT INTO tblBeidni
(znamec, zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Sæþór Jónsson',
        'Námskeið í FB',
        'Reykjavík',
        '11.03.2023',
        '11:00',
        '00:00',
        0,
        1,
        'Enginn laus',
        'Enginn laus'
       );

INSERT INTO tblBeidni
(znamec, zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Þórhallur Ingasson',
        'Námskeið í Reykjavíkarskóli um ljós og hljóð',
        'Reykjavík',
        '18.11.2022',
        '18:00',
        '18:30',
        1,
        1,
        'Túlkur kemur',
        'Árný Rósa'
       );

INSERT INTO tblBeidni
(znamec, zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Jónas Ingasson',
        'Námskeið í fjallaskíða',
        'Bláfjöll',
        '18.02.2023',
        '18:00',
        '19:30',
        2,
        0,
        'í vinnslu',
        'í vinnslu'
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
(idinterpreter) 
VALUES ('1');

INSERT INTO tblEventVinna 
(idinterpreter) 
VALUES ('2');

INSERT INTO tblEventVinna 
(idinterpreter) 
VALUES ('3');

INSERT INTO tblEventVinna 
(idinterpreter) 
VALUES ('3');

INSERT INTO tblUsers 
(zname, email, phonenr, username, password, admin) 
VALUES ('Admin',
        'admin@shh.is',
        '1234567',
        'admin', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        true
      );

INSERT INTO tblUsers 
(zname, email, phonenr, username, password, admin) 
VALUES ('John', 
        'anna@shh.is',
        '9876543',
        'anna', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

/*
INSERT INTO tblList
(lysing, stadur, dagur, byrja_timi, tulkur)
VALUES ('Námskeið í vinnuskólann',
        'Reykjavík',
        '11.12.2022',
        '11:00',
        'Rósa Björk'
       );
*/