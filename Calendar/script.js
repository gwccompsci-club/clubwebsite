/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function maxDays(mm, yyyy) {
    var mDay;                   //variable to store for the max days
    if ((mm == 3) || (mm == 5) || (mm == 8) || (mm == 10)) {//if the month is April,June, September or November, 
        mDay = 30;// then the month has 30 days
    } else {//else there are more or less
        mDay = 31//default number of days per month
        if (mm == 1) {//in febuary
            if (yyyy / 4 - parseInt(yyyy / 4) !== 0) {// if it is a leap year
                mDay = 28;
            } else {   //else it is regular
                mDay = 29;
            }
        }
    }
    return mDay; // return max days
}//returns max days of the month for each month
function changeBg(id) {
    if (eval(id).style.backgroundColor != "yellow") {
        eval(id).style.backgroundColor = "yellow"
    } else {
        eval(id).style.backgroundColor = "#ffffff";//changes it black
    }
}//takes in a string changes the color of where the string is to whichever
//Change Background
function writeCalendar() {
    var now = new Date
    var dd = now.getDate()
    var mm = now.getMonth()
    var dow = now.getDay()
    var yyyy = now.getFullYear()

    //month array
    var arrM = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
    //year array
    var arrY = new Array()
    var maxYearShow = 10;
    for (ii = 0; ii <= maxYearShow - 1; ii++) {
        arrY[ii] = yyyy - 2 + ii;
    }//this creates the year options to the dropdown

    //day array
    var arrD = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")

    var text = ""
    text = "<form name=calForm>"
    text += "<table border=1>"
    text += "<tr><td>"
    text += "<table width=100%><tr>"
    text += "<td align=left>"
    text += "<select name=selMonth onChange='changeCal()'>"
    for (ii = 0; ii <= 11; ii++) {
        if (ii == mm) {
            text += "<option value= " + ii + " Selected>" + arrM[ii] + "</option>"
        } else {
            text += "<option value= " + ii + ">" + arrM[ii] + "</option>"
        }
    }//keeps track of the month on dropdown menu
    text += "</select>"
    text += "</td>"
    text += "<td align=right>"
    text += "<select name=selYear onChange='changeCal()'>"
    for (ii = 0; ii <= maxYearShow - 1; ii++) {
        if (ii == 2) {
            text += "<option value= " + arrY[ii] + " Selected>" + arrY[ii] + "</option>"
        } else {
            text += "<option value= " + arrY[ii] + ">" + arrY[ii] + "</option>"
        }
    }//keeps track of the year
    text += "</select>"
    text += "</td>"
    text += "</tr></table>"
    text += "</td></tr>"
    text += "<tr><td>"
    text += "<table border=1>"
    text += "<tr>"
    for (ii = 0; ii <= 6; ii++) {
        text += "<td align=center><span class=label>" + arrD[ii] + "</span></td>"
    }//this displays the label on the top=> day names
    text += "</tr>"
    aa = 0
    for (kk = 0; kk <= 5; kk++) {
        text += "<tr>"
        for (ii = 0; ii <= 6; ii++) {
            text += "<td align=center><span id=sp" + aa + " onClick='changeBg(this.id)'>1</span></td>"
            aa += 1
        }
        text += "</tr>"
    }//writes the actual callendar=> when you take this out, the calendar days will not show

    text += "</table>"
    text += "</td></tr>"
    text += "</table>"
    text += "</form>"
    document.write(text);
    //addEvent("First Day of club","https://www.google.com/maps/place/Golden+West+College/");
    changeCal();

}//this writes the whole html document so that it does all this in one go

function changeCal() {

    //THIS IS FOR TODAY!!
    var now = new Date           //Date is an object that javaScript already has => like java.util.Calendar
    var dd = now.getDate()       //Number date of the month
    var mm = now.getMonth()      //month
    var dow = now.getDay()       //actual day. stands for "day of the week"
    var yyyy = now.getFullYear() //full year

    var currM = parseInt(document.calForm.selMonth.value);//keeps track of the current month
    //parsInt() takes in string, outputs int
    //otherwise it will be stuck into one month for the whole year
    var prevM;
    if (currM != 0) {
        prevM = currM - 1;
    } else {
        prevM = 11;
    }//keeps track of the previous month
    var currY = parseInt(document.calForm.selYear.value);//so that the years are corralery with month
    //otherwise the days will be stuck to current year

    //THIS IS FOR THE ACTUAL CALENDAR

    var mmyyyy = new Date();     //another date for the actual calendar
    mmyyyy.setFullYear(currY)    //creates a calendar around the current day
    mmyyyy.setMonth(currM)       //current month is first portrayed
    mmyyyy.setDate(1)            //basis is the first day
    var day1 = mmyyyy.getDay();  //returns the day of the week from 0-6;
    if (day1 == 0) {
        day1 = 7
    }//to make the days 1-7=> user redability

    var elementsDisplayed = 41;

    var arrN = new Array(elementsDisplayed)// 41 element array to store overall slots in the calendar
    //7 day label + 6*7 actual days displayed = 
    var aa;//unassigned variable      

    var meetings = "Meeting Days".link("test.html");

    //RECORDING STUFF!!!=> LOOK HERE!!
    for (ii = 0; ii < day1; ii++) {
        aa = maxDays((prevM), currY) - day1 + ii + 1;
        arrN[ii] = aa + "\n"//+checkForEvent(date, currM);// for the spot in the array, subtract maxDays by what day you
        if (ii % 7 == 3 && (currM >= 1 && currM <= 4)) {
            arrN[ii] = arrN[ii] + meetings;
        }
    }//to record the days before the month
    aa = 1//resets aa
    for (ii = day1; ii <= day1 + maxDays(currM, currY) - 1; ii++) {
        arrN[ii] = aa + "\n"//+checkForEvent(aa, currM);//stores the day in the array
        aa += 1;
        if (ii % 7 == 3 && (currM >= 1 && currM <= 4)) {
            arrN[ii] = arrN[ii] + meetings;
        }
    }//current month's days
    aa = 1//resets aa
    for (ii = day1 + maxDays(currM, currY); ii <= elementsDisplayed; ii++) {
        arrN[ii] = aa + "\n"//+checkForEvent(aa, currM);
        aa += 1
        if (ii % 7 == 3 && (currM >= 1 && currM <= 4)) {
            arrN[ii] = arrN[ii] + meetings;
        }
    }//basically for any month after current month

    var arrE = new Array(elementsDisplayed);//records the events for each month

    for (i = 0; i <= elementsDisplayed; i++) {
        //arrE[i] = checkForEvent(arrN[i],currM);
    }


    //DISPLAYING STUFF!!!
    for (ii = 0; ii <= elementsDisplayed; ii++) {
        eval("sp" + ii).style.backgroundColor = "#FFFFFF"
    }//display current day
    var dCount = 0
    for (ii = 0; ii <= elementsDisplayed; ii++) {

        if (((ii < 7) && (arrN[ii] > 20)) || ((ii > 27) && (arrN[ii] < 20))) {
            eval("sp" + ii).innerHTML = arrN[ii];
            //eval("sp" + ii).innerHTML = arrE[ii];
            eval("sp" + ii).className = "c3"
        }//displays things in the current month 
        else {
            eval("sp" + ii).innerHTML = arrN[ii]//+arrE[ii];
            //eval("sp" + ii).innerHTML = arrE[ii];
            if ((dCount == 0) || (dCount == 6)) {
                eval("sp" + ii).className = "c2"//attribute the style to whatever c2 is
            }//this is the weekends 
            else {
                eval("sp" + ii).className = "c1"
            }
            if ((arrN[ii] == dd) && (mm == currM) && (yyyy == currY)) {
                eval("sp" + ii).style.backgroundColor = "#b3d1ff"
            }//display for all days not in the month
        }
        dCount += 1
        if (dCount > 6) {
            dCount = 0
        }//resetting so it doesn't get to a rediculously big number
    }//display all the current days
}//changes the display of the calendar
function checkForEvent(userDate, userMonth) {//eventName is string to determine event name
    //var totalEvents = new Array();
    //var nextEvent = 0;
    var FirstDay = {
        date: 3,
        month: 3,
        name: "First Day",
        location: "https://www.google.com/maps/place/Golden+West+College/",
        getName: function () {
            return name;
        },
        getPlace: function () {
            return location;
        },
        getDate: function () {
            return date;
        },
        getMonth: function () {
            return month;
        }
    }//adding event

    //totalEvents.push(FirstDay);//adds first element to the array

    var place = "";
    //for (i = 0; i <= totalEvents.length; i++) {
//        if (userDate == 3 && userMonth==1) {
//            place = ;
//        }//if it is the same day,display name on event
    //}//to look if the day has an event

    return place;
}//returns link name with the url
//to connect links in javaScript, use the form string.ling("url")





//INITIALIZING THE MAP


var map;

// Initialize map
function initialize() {
  var myCenter = new google.maps.LatLng(33.736323, -118.000299);
  var mapProp = {
    center: myCenter,
    zoom: 12,
    // mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);

  var geocoder = new google.maps.Geocoder();

  // Address of event
  var address = "15744 Goldenwest St, Huntington Beach";

  // Description of event
  var description = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
          '<div id="bodyContent">'+
          '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the '+
          'Northern Territory, central Australia. It lies 335 km (208 mi) '+
          'south west of the nearest large town, Alice Springs; 450 km '+
          '(280 mi) by road. Kata Tjuta and Uluru are the two major '+
          'features of the Uluru - Kata Tjuta National Park. Uluru is '+
          'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
          'Aboriginal people of the area. It has many springs, waterholes, '+
          'rock caves and ancient paintings. Uluru is listed as a World '+
          'Heritage Site.</p>'+
          '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
          '</div>'+
          '</div>';

  // Using Geocoding
  geocodeAddress(map, geocoder, address, description);
};

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", resizingMap());

$('#myMapModal').on('show.bs.modal', function() {
  //Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)
  resizeMap();
})

function resizeMap() {
  if (typeof map == "undefined") return;
  setTimeout(function() {
    resizingMap();
  }, 400);
}

function resizingMap() {
  if (typeof map == "undefined") return;
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
}

/**
 * Get Google Map of event through the address
 * @param  {map} resultsMap  The result map
 * @param  {GeoCoder} geocoder    The geocoder of Google Map API
 * @param  {string} address     The address of event
 * @param  {string} description The description of event
 * @return {map}             update the map
 */
function geocodeAddress(resultsMap, geocoder, address, description) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var infowindow = new google.maps.InfoWindow({
        content: description
      });
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: resultsMap,
        title: 'Click to show description'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}