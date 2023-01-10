INSERT INTO tblTulkur 
(nafn, simi, netfang, stada) 
VALUES ('Eyrún Helga', 
        '9871234', 
        'eh@mavar.is',
        'Hættur'
      );

INSERT INTO tblTulkur 
(nafn, simi, netfang, stada) 
VALUES ('Anna Dagmar', 
        '9877777', 
        'ad@mavar.is',
        'Virkur'
      );

INSERT INTO tblTulkur 
(nafn, simi, netfang, stada) 
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
(nameuser, email, username, password, admin) 
VALUES ('Fanney',
        'admin@shh.is',
        'admin', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        true
      );

INSERT INTO tblUsers 
(nameuser, email, username, password, admin) 
VALUES ('John', 
        'anna@simnet.is',
        'anna', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblBeidni
(lysing, stadur, dagur, byrja_timi, endir_timi, nameuser, off)
VALUES ('Námskeið í Reykjavíkarskóli um ljós og hljóð',
        'Reykjavík',
        '18.11.2022',
        '18:00',
        '18:30',
        'Þórhallur Ingasson',
        1
       );

INSERT INTO tblBeidni
(lysing, stadur, dagur, byrja_timi, endir_timi, nameuser, off)
VALUES ('Námskeið í vinnuskólann',
        'Reykjavík',
        '11.12.2022',
        '11:00',
        '00:00',
        'Sæþór Jónsson',
        1
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
(title, start_event, end_event)
VALUES ('Bauhaus - stöðufundur',
        'January 2, 2023 10:00:00',
        'January 2, 2023 12:00:00'
       );

INSERT INTO tblEventTable
(title, start_event, end_event)
VALUES ('Byko - stöðufundur',
        'January 12, 2023 10:00:00',
        'January 12, 2023 12:00:00'
       );

INSERT INTO tblEventTable
(title, start_event, end_event)
VALUES ('Húsafundur - Breiðholt',
        'January 22, 2023 20:00:00',
        'January 22, 2023 21:00:00'
       );

