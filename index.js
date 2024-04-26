const path = require('path');
var express=require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


const { spawn } = require('child_process');
//const childPython = spawn('python', ['r1.py']);


const app =express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb2',{
    //useNewUrlParser: true,
    //useUnifiedTopology: true

});
var db = mongoose.connection;


db.on("error",()=> console.log("error in connecting to the databse"));
db.once("open", ()=>console.log("connected to the database"));
app.post("/sign_up",(req,res)=>{
    var baselineValue=req.body.baselineValue;
    var accelerations=req.body.accelerations;
    var fetalMovement= req.body.fetalMovement;
    var uterineContractions= req.body.uterineContractions;
    var lightDecelerations= req.body.lightDecelerations;
    var severeDecelerations= req.body.severeDecelerations;
    var prolonguedDecelerations= req.body.prolonguedDecelerations;
    var abnormalShortTermVariability= req.body.abnormalShortTermVariability;
    var meanValueOfShortTermVariability= req.body.meanValueOfShortTermVariability;
    var percentageOfTimeWithAbnormalLongTermVariability=req.body.percentageOfTimeWithAbnormalLongTermVariability;
    var meanValueOfLongTermVariability=req.body.meanValueOfLongTermVariability;
    var histogramWidth= req.body.histogramWidth;
    var histogramMin= req.body.histogramMin;
    var histogramMax= req.body.histogramMax;
    var histogramNumberOfPeaks= req.body.histogramNumberOfPeaks;
    var histogramNumberOfZeroes= req.body.histogramNumberOfZeroes;
    var histogramMode= req.body.histogramMode;
    var histogramMean= req.body.histogramMean;
    var histogramMedian= req.body.histogramMedian;
    var histogramVariance= req.body.histogramVariance;
    var histogramTendency= req.body.histogramTendency;

    

    var data ={
        "baselinevalue": baselineValue,
        "accelerations": accelerations,
        "fetal_movement": fetalMovement,
        "uterine_contractions":uterineContractions,
        "light_decelerations": lightDecelerations,
        "severe_decelerations":severeDecelerations,
        "prolongued_decelerations":prolonguedDecelerations,
        "abnormal_short_term_variability":abnormalShortTermVariability,
        "mean_value_of_short_term_variability":meanValueOfShortTermVariability,
        "percentage_of_time_with_abnormal_long_term_variability":percentageOfTimeWithAbnormalLongTermVariability,
        "mean_value_of_long_term_variability": meanValueOfLongTermVariability,
        "histogram_width":histogramWidth,
        "histogram_min": histogramMin,
        "histogram_max":histogramMax,
        "histogram_number_of_peaks": histogramNumberOfPeaks,
        "histogram_number_of_zeroes":histogramNumberOfZeroes,
        "histogram_mode":histogramMode,
        "histogram_mean":histogramMean,
        "histogram_median":histogramMedian,
        "histogram_variance":histogramVariance,
        "histogram_tendency":histogramTendency,
        

    }
   
   

    db.collection('users').insertOne(data,(err,collection) =>{
        if(err){
            throw err;
        }
        console.log("record inserted succesfully");
        
    });
    
    const childPython1 = spawn('python', ['r1.py', JSON.stringify(data)]);
    childPython1.stdout.on('data',(data) =>{
        console.log(`stdout: ${data}`);

        storedData = `${data}`;
        console.log(typeof storedData);
        numb1=parseInt(storedData);


       
        if (numb1===1){
            return res.redirect("signup_success.html")
        }
        else if (numb1===2){
            return res.redirect("sign2.html")
        }
        else if (numb1==3){
            return res.redirect("class3.html")
           
        }
       
      /* else if (storedData=='2'){
           return res.redirect("sign2.html")
       }
       else if (storedData=='3'){
        return res.redirect("signup_success.html")
       }*/
        
    });
    
   
})

app.get("/",(req,res) =>{
    res.set({
            "Allow-access-Allow-Origin ":'*'
        })

      

        return res.redirect('index.html');
   

},

app.get('/signup_success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup_success.html'));
}),

app.get('/sign2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign2.html'));
}),
app.get('/class3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'class3.html'));
}),

app.get('/python-output', (req, res) => {
    const pythonProcess = spawn('python', ['r1.py']);
    pythonProcess.stdout.on('data', (data) => {
        res.send(data.toString());
    });
}),

).listen(3000);




console.log("listening on port 3000");