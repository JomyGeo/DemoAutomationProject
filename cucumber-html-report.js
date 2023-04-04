const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const {execSync} = require('child_process')

 

execSync("ndjson-to-json cucumber-messages.ndjson -o cypress/.run/output.json")

fs.readFile('cypress/.run/output.json', function read(err, testExecutionData) {

    var executionDuration = JSON.parse(testExecutionData);
    var lengthofarray = Object.keys(JSON.parse(testExecutionData)).length
    var executionStartTime = executionDuration[0].testRunStarted.timestamp.seconds
    var executionEndTime = executionDuration[lengthofarray-1].testRunFinished.timestamp.seconds


fs.readFile('cypress/.run/cypressTestConfig.json', function read(err, data) {

    
    if (err) {
        throw err;
    }
    var runInfos = JSON.parse(data);



   fs.readFile('formatted-json/cucumber-report.json', function read(err, data) {
    
    if (err) {
        throw err;
    }
    var cucumberReport = JSON.parse(data);


    function convert_Seconds_TO_Date_epochTime(seconds){

        var myDate = new Date( seconds *1000);
        return myDate.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
       
    }

    function getStartTime(){
        var start = convert_Seconds_TO_Date_epochTime(executionStartTime).toLocaleString()
        const startTime = start.toString().replace(",","").replaceAll(" ","_").replaceAll(":","-").replaceAll("/","-")
        return startTime
      }  

function getModuleName(spec){

    const SpecPattern =  spec
    const myArray = JSON.stringify(SpecPattern).split("e2e\\");
     const splitFeature = myArray[1].substring(13);
     const SplitSlash = splitFeature.split("_FeatureFiles\\");
    const final = SplitSlash[0].slice(2)
    const ModuleName  = final + " Module" 
    return ModuleName
}



function timeStamp() {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1)+ '-' + today.getFullYear()
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    let dateTime = date + '_' + time;
    return dateTime;
  }

function testDuration( executionStartTime , endStartTime ){

    var startTime = new Date( executionStartTime *1000);
  //  var endTime = new Date( seconds *1000);
    let start = startTime.toString().split('GMT')
    let StartTimeTrim = start[0].substring(3)

    var endTime = new Date( endStartTime *1000);
      let end = endTime.toString().split('GMT')
      let endimeTrim = end[0].substring(3)
    
    const date1 = new Date(endimeTrim);
    const date2 = new Date(StartTimeTrim);
    const diff = date1.getTime() - date2.getTime();
    let msec = diff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return hh + " Hour(s) " + mm + " Min " +ss+ " Sec"; 
    
}
  

function Execution_Mode(){

    let mode;
    if(runInfos.browser.isHeadless === true){
        mode = 'Headless ( ' +runInfos.browser.displayName+' browser )'
     }
    else if(runInfos.browser.isHeaded === true){
        mode = 'Headed ( ' +runInfos.browser.displayName+' browser )' 
    }
    else{
        mode = 'No matching'
    } 
    return mode
}  

const mapOs = (os) => {
    if(os.startsWith('win')) {
        return 'windows';     
    } else if (os.startsWith('osx')) {
        return 'osx';
    } else if (os.startsWith('linux')) {
        return 'linux';
    } else if (os.startsWith('ubuntu')) {
        return 'ubuntu';
    } else if (os.startsWith('android')) {
        return 'android';
    } else if (os.startsWith('ios')) {
        return 'ios';
    }
};

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
    }


    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + " hour(s) " + minutes + " Min " + seconds +" Sec ";
      }

        

      

report.generate({
	jsonDir: 'formatted-json',
	reportPath: './Reports/'+getModuleName(cucumberReport[0].uri)+'_Consolidated_Report_'+ getStartTime(),
    openReportInBrowser:true,
    displayDuration:true,
    durationInMS: true,
    hideMetadata:true,
    displayReportTime:false,
    saveCollectedJSON:true,
    showPending:true,
    showSkipped:true,
    reportName: "<b>"+getModuleName(cucumberReport[0].uri) +"</b> - Cypress Automation Report",
    pageTitle:"Multiple Cucumber HTML Reporter",
    pageFooter: "<div><p><b><center>Cypress Version "+runInfos.cypressVersion+"</center></b></p></div>" ,
  
    metadata:{
        browser: {
            name: runInfos.browser.displayName,
            version: runInfos.browser.version
        },
        device: 'Local machine',
        platform: {
            name: mapOs(runInfos.platform)
        }
    },
    
      customData: {
        title: 'Run info',
        data: [
            {label: 'Tenant URL ', value: "<b>"+ getTenantURLName(runInfos.tenantURL)},
            {label: 'Execution Mode ', value: Execution_Mode()},
            {label: 'Execution Start Time ', value:  convert_Seconds_TO_Date_epochTime(executionStartTime)},//IST_Timeformat(runInfos.Execution_Start_Time)},
            {label: 'Execution End Time ', value: convert_Seconds_TO_Date_epochTime(executionEndTime)},//IST_Timeformat(runInfos.Execution_End_Time)},
            {label: 'Total Duration ', value: testDuration(executionStartTime,executionEndTime)}//testDuration(runInfos.Execution_End_Time,runInfos.Execution_Start_Time)}
        ]
    }  

});

});

   })

})
