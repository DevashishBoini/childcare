const pool = require('./database.js')
const express = require('express')
const cors = require('cors')

const app=express()
app.use(express.json())
app.use(cors())
const port=8080

app.get('/sysId/:sysId/facilityList', async (req, res) => {
  
  const sysId=req.params.sysId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select facility.license_no as license_no, facility.name as name, facility_admin.name as admin_name, facility_admin.id as id from facility join facility_admin on facility.license_no = facility_admin.license_no ; ")
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/sysId/:sysId/addFacility', async (req, res) => {
  
  const sysId=req.params.sysId

  const {name,address,contact,licenseNo}=req.body

  console.log(name)

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("select * from add_facility($1,$2,$3,$4)",[name,address,contact,licenseNo])
      console.log(name)
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/updateDate', async (req, res) => {
  
  const {day,week,year}=req.body

  console.log(day)

  await pool.connect().then(async (client) => {
    try {
      const result=await client
      .query("select * from add_today($1,$2,$3)",[day,year,week])
      console.log(result.rows[0])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })  
    
});

app.get('/login/:role/:id', async (req, res) => {
  
  const role=req.params.role
  const id=req.params.id

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT get_password($1,$2)",[id,role])
      client.release()
      console.log(result.rows[0].get_password)
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});


app.get('/facId/:facId', async (req, res) => {
  
  const facId=req.params.facId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT facility.name as name,facility.license_no as license_no FROM facility WHERE facility.license_no=(SELECT facility_admin.license_no FROM facility_admin WHERE facility_admin.id=($1))",[facId])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});


app.get('/facId/:facId/:licNo/dailyAttendance/:day/:week/:year/:classtype', async (req, res) => {
  
  const licNo=req.params.licNo
  const day=req.params.day
  const week=req.params.week
  const year=req.params.year
  const classtype=req.params.classtype

  console.log("day")

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from attendance_perclassroom($1,$2,$3,$4,$5) ;",[year,week,day,licNo,classtype])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/facId/:facId/:licNo/dailyAbsence/:day/:week/:year/:classtype', async (req, res) => {
  
  const licNo=req.params.licNo
  const day=req.params.day
  const week=req.params.week
  const year=req.params.year
  const classtype=req.params.classtype

  console.log(day)

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from attendance_absense_perclassroom($1,$2,$3,$4,$5) ;",[year,week,day,licNo,classtype])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/facId/:facId/:licNo/moneyEarned/:week/:year', async (req, res) => {
  
  const licNo=req.params.licNo
  const week=req.params.week
  const year=req.params.year

  console.log(week)

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from money_earned($1,$2,$3) ;",[year,week,licNo])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/facId/:facId/:licNo/moneyBilled/:week/:year', async (req, res) => {
  
  const licNo=req.params.licNo
  const week=req.params.week
  const year=req.params.year

  console.log(week)

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from money_billed($1,$2,$3) ;",[year,week,licNo])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

// app.post('/facId/:facId/:teacherId/assignClass', async (req, res) => {
  
//   const {teacherId,classtype,licNo}=req.body

//   await pool.connect().then(async (client) => {
//     try {
//       const result = await client
//         .query("select assign_teacher($1,$2,$3) ;",[teacherId,classtype,licNo])
//       client.release()
//       console.log(result.rows)
//       res.json(result.rows)
//     } catch (err_1) {
//       client.release()
//       console.log(err_1.stack)
//     }
//   })
// });




// app.get('/facId/:facId/:licNo/:classtype/checkAvail', async (req, res) => {
  
//   const facId=req.params.facId
//   const licNo=req.params.licNo
//   const classtype=req.params.classtype

//   await pool.connect().then(async (client) => {
//     try {
//       const result = await client
//         .query("select count(*) as count from student where student.license_no=($1) and student.classtype=($2);",[licNo,classtype])
//       client.release()
      
//       let count=result.rows[0].count

//       const k = await client
//         .query("select count(*) as count from student where student.license_no=($1) and student.classtype=($2);",[licNo,classtype])
//       client.release()

      
      
//       console.log(result.rows[0].count)
//       res.json(result.rows)
//     } catch (err_1) {
//       client.release()
//       console.log(err_1.stack)
//     }
//   })
// });

// app.get('/facId/:facId/:licNo/:classtype/checkCap', async (req, res) => {
  
//   const facId=req.params.facId
//   const licNo=req.params.licNo
//   const classtype=req.params.classtype

//   await pool.connect().then(async (client) => {
//     try {
//       const result = await client
//         .query("select count(*) as count from student where student.license_no=($1) and student.classtype=($2);",[licNo,classtype])
//       client.release()
      
//       let count=result.rows[0].count

//       const k = await client
//         .query("select classroom_type.max_students as max from classrooom_type where classrooom_type.id=($1) ;",[classtype])
//       client.release()

//       let bool=false;

//       console.log(k.rows)
      
//       console.log(result.rows[0].count)
//       res.json(result.rows)
//     } catch (err_1) {
//       client.release()
//       console.log(err_1.stack)
//     }
//   })
// });

app.get('/facId/:facId/studentId/:studId', async (req, res) => {
  
  const facId=req.params.facId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT get_student($1,$2)",[facId,studId])
      client.release()
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});


app.get('/facId/:facId/:licNo/pendingPayments/:week/:year', async (req, res) => {
  
  const facId=req.params.facId
  const licNo=req.params.licNo
  const week=req.params.week
  const year=req.params.year

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT * FROM fee_unpaid($1,$2,$3) as A",[licNo,week,year])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/:licNo/pendingPayments/:week/:year/makePayment', async (req, res) => {
  
  const {studId}=req.body

  const facId=req.params.week
  const week=req.params.week
  const year=req.params.year

  console.log(week)

  await pool.connect().then(async (client) => {
    try {
      const result=await client
      .query("select * from change_payment_status($1,$2,$3)",[studId,week,year])
      console.log(result.rows[0])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
      console.log("dsf")
    }
  })  
    
});

app.post('/facId/:facId/:licNo/updateLedger', async (req, res) => {
  
  const {week,year}=req.body
  const licNo=req.params.licNo 

  console.log(week)

  await pool.connect().then(async (client) => {
    try {
      const result=await client
      .query("select * from generate_ledger($1,$2,$3)",[year,week,licNo])
      console.log(result.rows[0])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
      console.log("fajsdk")
    }
  })  
    
});

app.get('/facId/:facId/:licNo/studentList', async (req, res) => {
  
  const licNo=req.params.licNo

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from find_student($1) ;",[licNo])
      client.release()
      console.log(result.rows[0].first_name)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/:licNo/:classtype/addChild', async (req, res) => {
  
  
  
  const licNo=req.params.licNo

  const {firstName,lastName,dob,allergies,classtype,parentId,consent,week}=req.body


  let consent_form=0;
  
  if(consent===true) consent_form=1;

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("select * from add_student($1,$2,$3,$4,$5,$6,$7,$8,$9)",[firstName,lastName,dob,allergies,licNo,classtype,parentId,consent_form,week])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.delete('/facId/:facId/studentList/delete/:id', async (req, res) => {

  const facId=req.params.facId
  const id=req.params.id

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("DELETE FROM student WHERE student.license_no=($1) and student.id=($2)",[facId,id])
      res.status(204).send("deleted");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })


});

app.get('/facId/:facId/:licNo/staffList', async (req, res) => {
  
  const licNo=req.params.licNo

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select teacher.first_name,teacher.last_name,teacher.id  from teacher where teacher.license_no = ($1) ;",[licNo])
      client.release()
      console.log(result.rows[0].first_name)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/:licNo/addStaff', async (req, res) => {
  
  const licNo=req.params.licNo

  const {firstName,lastName,dob,address,phone,hourly_salary,mail,password}=req.body

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("INSERT INTO teacher(first_name,last_name,dob,address,phone,mail,hourly_salary,license_no,availability,password) VALUES(($1),($2),($3),($4),($5),($6),($7),($8),1,($9));",[firstName,lastName,dob,address,phone,mail,hourly_salary,licNo,password])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/addParent', async (req, res) => {
  
  const licNo=req.params.licNo

  const {name,contact,address,mail,password}=req.body

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("select * from add_parent($1,$2,$3,$4,$5);",[name,contact,address,mail,password])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/facId/:facId/:teacherId/assignClass', async (req, res) => {
  

  const {teacherId,classtype,licNo}=req.body


  await pool.connect().then(async (client) => {
    try {
      const result=await client
      .query("select * from assign_teacher($1,$2,$3)",[teacherId,classtype,licNo])
      console.log(result.rows[0].assign_teacher)
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.delete('/facId/:facId/StaffList/delete/:id', async (req, res) => {

  const facId=req.params.facId
  const id=req.params.id

  await pool.connect().then(async (client) => {
    try {
      await client
      .query("DELETE FROM teacher WHERE teacher.license_no=($1) and teacher.id=($2)",[facId,id])
      res.status(204).send("deleted");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })


});

// app.post('/facId/:facId/:licNo/teacherAttendance', async (req, res) => {
  
//   try{
  
//   const licNo=req.params.licNo

//   const {teacherId,time,week,day}=req.body

//   let query = "SELECT NOW() as time;"
//   const [val] = await pool.promise().query(query);
//   const curr_time=val[0].time
//   const present=1
//   const type="teacher"

//   if(time===1)
//   {

//     await pool.connect().then(async (client) => {
    
//     await client.query("insert into attendance(day,week,in_time,present,user_type,id) values(($1),($2),($3),($4),($5),($6))",[day,week,curr_time,present,type,teacherId])
//     res.status(201).json("done");
//   } 
//    )}

//    else{
//     await pool.connect().then(async (client) => {
      
//       await client.query("SELECT update_outtime(($1),($2),($3))",[curr_time,type,teacherId])
//       res.status(201).json("done");
    
//      }) 
//    }

//   }catch (err_1) {
//     client.release()
//     console.log(err_1.stack)
//   }
// });

app.post('/facId/:facId/:licNo/teacherAttendance', async (req, res) => {
  
  const {teacherId,time,week,day,year}=req.body


  const type="teacher"

  console.log(type)
  
  await pool.connect().then(async (client) => {
    try {
      const result=await client
      .query("select * from mark_attendance($1,$2,$3,$4,$5,$6)",[teacherId,type,year,week,day,time])
      console.log(result.rows[0])
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })  
    
});

app.get('/teacherId/:teacherId', async (req, res) => {
  
  const teacherId=req.params.teacherId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT teacher.first_name as firstname,teacher.last_name as lastname,teacher.license_no as licenseno FROM teacher WHERE teacher.id=($1)",[teacherId])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/teacherId/:teacherId', async (req, res) => {
  
  const teacherId=req.params.teacherId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("SELECT teacher.first_name as firstname,teacher.last_name as lastname,teacher.license_no as licenseno FROM teacher WHERE teacher.id=($1)",[teacherId])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows[0])
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/teacherId/:teacherId/teacherAttendance/:weekNo/:yearNo', async (req, res) => {
  
  const teacherId=req.params.teacherId
  const weekNo=req.params.weekNo
  const yearNo=req.params.yearNo

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from teacher_info_for_a_week($1,$2,$3) as A;",[teacherId,weekNo,yearNo])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/teacherId/:teacherId/teacherAttendance/:weekNo/:yearNo/totalSalary', async (req, res) => {
  
  const teacherId=req.params.teacherId
  const weekNo=req.params.weekNo
  const yearNo=req.params.yearNo

  console.log("sfd")

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from cal_money_per_week($1,$2,$3) as A;",[teacherId,weekNo,yearNo])
      client.release()
      console.log(result.rows[0].a)
      res.json(result.rows[0].a)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/teacherId/:teacherId/markChildrenAttendance/:day/:week/:year', async (req, res) => {
  
  const teacherId=req.params.teacherId
  const week=req.params.week
  const day=req.params.day
  const year=req.params.year

  

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from unmarked_students($1,$2,$3,$4) as A;",[teacherId,day,week,year])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.get('/parentId/:parentId/childrenList', async (req, res) => {
  
  const parentId=req.params.parentId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from get_children($1)",[parentId])
      client.release()
      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});


app.put('/parentId/:parentId/childId/:childId/updateAllergy', async (req, res) => {
  
  const {allergies,childId}=req.body


  await pool.connect().then(async (client) => {
    try {
      await client
      .query("update student set allergies =($1) where id = ($2)",[allergies,childId])
      console.log(allergies)
      res.status(201).send("done");
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })  
    
});

app.get('/parentId/:parentId/childId/:childId/weekAttendance/:weekNo/:yearNo', async (req, res) => {
  
  const studentId=req.params.childId
  const weekNo=req.params.weekNo
  const yearNo=req.params.yearNo

  console.log(studentId)
  console.log(weekNo)
  console.log(yearNo)

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from student_info_for_a_week($1,$2,$3) as A;",[studentId,weekNo,yearNo])
      client.release()

      console.log(result.rows)
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});

app.post('/parentId/:parentId/childId/:childId/dropChild', async (req, res) => {
  
  const {parentId,childId}=req.body


  const type="teacher"

  console.log(type)
  
  await pool.connect().then(async (client) => {
    try {
      await client
      .query("select * from delete_student($1)",[childId])
      res.status(201).send("done");
      console.log("fdassdf")
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
      console.log("fdassdf")
    }
  })  
    
});

app.get('/parentId/:parentId/childId/:childId/pendingPayments', async (req, res) => {
  
  const childId=req.params.childId

  await pool.connect().then(async (client) => {
    try {
      const result = await client
        .query("select * from pending_payments($1) as A;",[childId])
      client.release()
      console.log(result.rows[0])
      res.json(result.rows)
    } catch (err_1) {
      client.release()
      console.log(err_1.stack)
    }
  })
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })