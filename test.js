var express = require("express");
var app = express();

var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/yel_camp');    
var post = process.env.PORT || 300;
var body_parser = require("body-parser");
var request = require("request");
app.use(express.static("public"));
 var friend=["usl","pol","newyar","opla"];
app.use(body_parser.urlencoded({extended:true}) );
app.set("view engine","ejs");



var Comment = new mongoose.Schema({ 
  name: String,
    image:String,
    discription:String
});

var Campground=mongoose.model("Campground",Comment);
   
//Campground.create({
//    name:"sunil",
//    image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
//    discription:" This is image about you that is made your day and you can do what ever you want to do "
//    
//},function(err,Campground){
//    
//    if(err){
//        console.log("error in databas");
//        
//    }
//    else
//        {
//            console.log(Campground);
//            console.log("Campground is created");
//        }
//})
//
//    var campground=[
//        
//        {name:"yasha",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg" },
//        {name:"open",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg" },
//        {name:"shiva",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"}
//        ];
//    
function ulla( p){
    
var url="http://api.openweathermap.org/data/2.5/weather?q="+p+",In&APPID=dd48363139cc93db7637ab1e392460c9&units=metric"    
request({url:url},function(err,response,body)
{
   var body=JSON.parse(body) ;
    console.log(body)
    app.get("/friend",function(req,res){
  
        var lon=body.coord.lon;
        console.log(lon);
        
    var y =p;
    
console.log(y);
    res.render("friend",{friends:friend,y:y,lon:body.coord.lon,lat:body.coord.lat});
    
    
})
 
    
}


)}
request("http://api.ipstack.com/check?access_key=b1001e5192139fe6917cd5630b23f403&format=1",function (err, response ,body){
    var bodyx =[];
    
    
   bodyx= JSON.parse(body);
    console.log(bodyx);
    ulla(bodyx.city)
    
    
   
})  


//app.get("/friend",function(req,res){
//  
//    
//
//    res.render("friend",{bodyx:bodyx.ip});
//    
//    
//})

app.get("/",function(req,res){
    
    res.render("home");
    
});

app.get("/campground", function(req,res){
    
 Campground.find({},function(err,camp){
     
     if(err){
         console.log("error");
     }
     else{
         
       res.render("index",{camp:camp});  
     }
     
 })
       
                  
                    
        
    
})
app.post("/campground", function(req,res){
   var name= req.body.name;
    var image=req.body.image;
    var camps={name: name,image:image};
//  campground.push(camps);
    
    Campground.create(camps,function(err,newleycreated){
        if(err)
{
    
    console.log("error in new ");
}
        else {
            console.log("new campgrond added");
             res.redirect("campground");
            
        }
        
    })
    
   
});

app.get("/campground/new",function(req,res){
    
    
    res.render("newr");
    
})

app.get("/campground/:id",function(req,res){
    var id = req.params.id;
    console.log(id);
    
    Campground.findById(id,function(err,camp){
     
     if(err){
         console.log("error");
     }
     else{
         
         
      res.render("show",{camp:camp});  
     }
     
 })
    
   
    
})

app.post("/pol",function(req,res){
  friend.push(req.body.yashas);

    res.redirect("friend");
})

app.listen(post,function(req,res){
    
    console.log("server started"+ post);
    
})
console.log(__dirname);



