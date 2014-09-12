var express= require('express'),
    app = express(),
    mysql =require('mysql'),
    connectionpool=mysql.createPool({
    	host:'localhost',
        user: 'root',
        password :'123456',
        database:'db_shopping'
});

/*
    
    * purpose : used to register user 
    * Call:POST
    * input parameters : {firstname : "user",user="abc",pass="abc",address="4/A5,shamshank society",phno="7878787878",email="user@user.com"}
    * output :
      > success:
        {IsSuccess:true,data:[],msg:""}
      > Error :
        {IsSuccess:false,msg:"",desc:""}
*/  
app.post('/v0/user',function(req,res){
console.log("hi");
console.log(req.body);
console.log(req.query); 

var objuser = req.query; 
  
console.log(objuser.firstname);
connectionpool.getConnection(function(err,connection){
   if(err){
     console.log('Connection error:',err);
     res.statusCode=503;
     res.send({
     'IsSuccess' : false, 'msg': 'Error in Data Connection'
     });
   }
   else
   {
      connection.query('INSERT INTO user (firstname,user,pass,address,phno,email) values (?,?,?,?,?,?)',[objuser.firstname,objuser.user,objuser.pass,objuser.address,objuser.phno,objuser.email],function(err,result){
      if(err)
      {
        console.log('Connection error :',err);
        res.statusCode=500;
        res.send({
         'IsSuccess' : false, 'msg': 'Sql Syntax Error'
        });
      }
      else
      {
         console.log('Sucesssfull Inserted');
         res.send({
            'IsSuccess' : true, 'data': [] ,'msg':'Inserted successfully'
         });
      }
       connection.release();

      });
   }
  });
});

/*
    
    * purpose : used to register admin 
    * Call:POST
    * input parameters : {firstname : "admin",user="admin",pass="admin",email="admin@admin.com"}
    * output :
      > success:
        {IsSuccess:true,data:[],msg:""}
      > Error :
        {IsSuccess:false,msg:"",desc:""}
*/  
app.post('/v0/admin',function(req,res){
console.log("hi");
console.log(req.body);
console.log(req.query); 

var objuser = req.query; 
  
console.log(objuser.firstname);
connectionpool.getConnection(function(err,connection){
   if(err){
     console.log('Connection error:',err);
     res.statusCode=503;
     res.send({
     'IsSuccess' : false, 'msg': 'Error in Data Connection'
     });
   }
   else
   {
      connection.query('INSERT INTO admin (firstname,user,pass,email) values (?,?,?,?)',[objuser.firstname,objuser.user,objuser.pass,objuser.email],function(err,result){
      if(err)
      {
        console.log('Connection error :',err);
        res.statusCode=500;
        res.send({
         'IsSuccess' : false, 'msg': 'Sql Syntax Error'
        });
      }
      else
      {
         console.log('Sucesssfull Inserted');
         res.send({
            'IsSuccess' : true, 'data': [] ,'msg':'Inserted successfully'
         });
      }
       connection.release();

      });
   }
  });
});




app.listen(3000);
console.log('Insert date through Rest call on port 3000');


