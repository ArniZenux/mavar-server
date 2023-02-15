/*
  const ress = await listApp(sql_updateWork, [zworks]); 
  const obj2 = JSON.stringify(ress);
  const obj_st = obj2.split(":");
  const id_t = obj_st[1];
  const idt = id_t.slice(0,1);
  
  try{
    success = await updateApp(sql, [idt, idverkefni]);
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }*/