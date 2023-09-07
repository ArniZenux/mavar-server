 INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Eyja Helga Jónsdóttir', 
        '9871234', 
        'ehj@mavar.is',
        'Hættur'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Anna Dögg Eíriksdóttir', 
        '9877777', 
        'ade@mavar.is',
        'Virkur'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Sigrún Erna Þorsteinsdóttir', 
        '4448785', 
        'seth@mavar.is',
        'í leyfi'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Sirrý Arna Þórsdóttir', 
        '4447775', 
        'sath@mavar.is',
        'Virkur'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Erna Kristinsdóttir', 
        '34548785', 
        'ek@mavar.is',
        'í leyfi'
      );

INSERT INTO tblInterpreter 
(zname, phonenr, email, zstatus) 
VALUES ('Jón Hilmarsson', 
        '8751125', 
        'jh@mavar.is',
        'Virkur'
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Marel í viðtal', 
        'Garðabæ', 
        '02/09/2023',
        '10:00',
        '12:00',
        'Atvinnumál',
        'September 2, 2023 10:00:00',
        'September 2, 2023 12:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Brúðkaup þeirra Katheine og John Romer', 
        'Viðey', 
        '10/09/2023',
        '12:00',
        '18:00',
        'Almennt',
        'September 10, 2023 12:00:00',
        'September 10, 2023 18:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið að hjóla', 
        'Reykholt', 
        '11/09/2023',
        '10:00',
        '12:00',
        'Skólamál',
        'September 11, 2023 10:00:00',
        'September 11, 2023 12:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '17/09/2023',
        '09:00',
        '10:00',
        'Skólamál',
        'September 17, 2023 19:00:00',
        'September 17, 2023 20:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '17/09/2023',
        '12:00',
        '15:00',
        'Skólamál',
        'September 17, 2023 19:00:00',
        'September 17, 2023 20:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '20/09/2023',
        '19:00',
        '20:00',
        'Skólamál',
        'September 20, 2023 19:00:00',
        'September 20, 2023 20:00:00',
        true
      );

INSERT INTO tblProject 
(title, place, zday, start_time, last_time, scene, start_event, last_event, allDay) 
VALUES ('Námskeið í fjallkofinn', 
        'Reykholt', 
        '20/09/2023',
        '12:00',
        '14:00',
        'Skólamál',
        'September 20, 2023 12:00:00',
        'September 20, 2023 14:00:00',
        true
      );


INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Administration',
        'admin@mavar.is',
        '555-5555'
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Anna Ösp Karlsdóttir',
        'anna@mavar.is',
        '854-5874'
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Katrín Anna Sigmundsdóttir',
        'katrin@mavar.is',
        '555-5534'
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Bergþór Össur Hilmarsson',
        'bergthori@mavar.is',
        '555-3333'
      );

INSERT INTO tblCustom 
(znamec, email, phonenr) 
VALUES ('Össur Skarphéðinsson',
        'ossur@mavar.is',
        '455-5677'
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
VALUES ('3' 
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('4' 
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('5' 
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('6' 
      );

INSERT INTO tblWorks 
(idinterpreter) 
VALUES ('4' 
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
VALUES ('3' 
        );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('4' 
        );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('4' 
        );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('5' 
        );

INSERT INTO tblOrder 
(idcustom) 
VALUES ('2' 
        );

INSERT INTO tblBeidni
(zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Námskeið í Reykjavíkarskóli um ljós og hljóð',
        'Reykjavík',
        '18/11/2022',
        '18:00',
        '18:30',
        1,
        1,
        'Túlkur kemur',
        'Árný Rósa'
       );

INSERT INTO tblBeidni
(zdesc, place, zday, start_time, last_time, zstatus, zchecked, explanation, interpreter)
VALUES ('Námskeið í fjallaskíða',
        'Bláfjöll',
        '18/02/2023',
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
(username, email, password, admin) 
VALUES ('Administration',
        'admin@mavar.is',
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        true
      );

INSERT INTO tblUsers 
(username, email, password, admin) 
VALUES ('Anna Ösp Karlsdóttir', 
        'anna@mavar.is',
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblUsers 
(username, email, password, admin) 
VALUES ('Katrín Anna Sigmundsdóttir', 
        'katrin@mavar.is',
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblUsers 
(username, email, password, admin) 
VALUES ('Bergþór Össur Hilmarsson', 
        'bergthor@mavar.is',
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblUsers 
(username, email, password, admin) 
VALUES ('Össur Skarphéðinsson', 
        'ossur@mavar.is',
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblAsk 
(idcustom) 
VALUES ('2' 
        );

INSERT INTO tblAsk 
(idcustom) 
VALUES ('2' 
        );