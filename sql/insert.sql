INSERT INTO tblTulkur 
(nafn, simi, netfang) 
VALUES ('Johnny Deep', 
        '9871234', 
        'jdepp@mavar.is'
      );

INSERT INTO tblTulkur 
(nafn, simi, netfang) 
VALUES ('Brad Bitt', 
        '9877777', 
        'bbitt@mavar.is'
      );

INSERT INTO tblTulkur 
(nafn, simi, netfang) 
VALUES ('Tom Hanks Sören', 
        '4448785', 
        'tomhankssoren@mavar.is'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Marel í viðtal', 
        'Garðabæ', 
        '23.12.2022',
        '9:00',
        '10:00',
        'Atvinnumál',
        'Rúnar Karl'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Brúðkaup þeirra Katheine og John Romer', 
        'Viðey', 
        '1.7.2022',
        '12:00',
        '18:00',
        'Almennt',
        'Ronaldo Hanks'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur, nameuser) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '11.10.2022',
        '19:00',
        '20:00',
        'Skólamál',
        'James Dean'
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
        'Rúnar Karlsson',
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