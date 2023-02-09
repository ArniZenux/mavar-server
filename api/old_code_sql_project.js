/* const sql_lastverkefni = `
    SELECT 
      id, heiti
    FROM
      tblVerkefni
    ORDER BY
      id
    DESC LIMIT 1
  `;
  
  const sql_oneTulkur = `
    SELECT 
      id
    FROM
      tblTulkur
    WHERE
      tblTulkur.nafn = $1;
  `;
  
  const sql_tulkurvinna = `
    INSERT INTO 
      tblVinna(idtulkur, idverkefni)
    VALUES(
      $1, 
      $2);
  `;*/
  

   //let counts = CountEvents(id);
  //let counter = await listApp(tblEventsCounter, [id] );

  //console.log(events); 
  /* let nr = 0; 
  counter.map(data => {
    nr = data.count; 
  });
  */
  //console.log(nr); 
  /*let obj = JSON.stringify(counter); 
  const obj_st = obj.split(":");
  console.log(obj_st);
  const id_t = obj_st[1];
  console.log(id_t);
  const idt = id_t.slice(0,1);
  console.log(idt);
  */
  //console.log(events);
  //group.push(counter)
  //group.push(events);
  //console.log(group); 
  //console.log( group.length ); 


     /*const last = await listApp(sql_lastverkefni); 
      const obj = JSON.stringify(last);
      const obj_s = obj.split(":");
      const id_v = obj_s[1];
      const idv = id_v.slice(0,1);

      const res = await listApp(sql_oneTulkur, [nafn_tulkur]); 
      const obj2 = JSON.stringify(res);
      const obj_st = obj2.split(":");
      const id_t = obj_st[1];
      const idt = id_t.slice(0,1);

      success1 = await insertApp(sql_tulkurvinna,[idt, idv]);*/