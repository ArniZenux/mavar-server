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
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur) 
VALUES ('Marel í viðtal', 
        'Garðabæ', 
        '16 júni',
        '9:00',
        '10:00',
        'Atvinnumál'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur) 
VALUES ('Brúðkaup þeirra Katheine og John Romer', 
        'Viðey', 
        '15 júli',
        '12:00',
        '18:00',
        'Almennt'
      );

INSERT INTO tblVerkefni 
(heiti, stadur, dagur, byrja_timi, endir_timi, vettvangur) 
VALUES ('Námskeið fyrir viðgerð á hjól', 
        'Reykholt', 
        '5 september',
        '19:00',
        '20:00',
        'Skólamál'
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
(nameuser, username, password, admin) 
VALUES ('Fanney', 
        'admin', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        true
      );

INSERT INTO tblUsers 
(nameuser, username, password, admin) 
VALUES ('John', 
        'anna', 
        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
        false
      );

INSERT INTO tblBeidni
(lysing, stadur, dagur, byrja_timi, nameuser)
VALUES ('Námskeið í Reykjavíkarskóli um ljós og hljóð',
        'Reykjavík',
        '18 nóvember',
        '18:00',
        'Rúnar Karlsson'
       );