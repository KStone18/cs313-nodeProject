function streamSearch() {
	// Log something on the browser console
	console.log("Searching...");

	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          
           if (xmlhttp.status == 200) {
               //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
               //console.log("Back from the server with: " + xmlhttp.responseText);
               updatePage(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    
    // TODO: I need to get the book name from the form here...
    var selectStrm = document.getElementById("selectStream");
    var streamName = selectStrm.options[selectStrm.selectedIndex].text;
    //console.log("here is the stream name: " + streamName);

    xmlhttp.open("GET", "/stream?stream=" + streamName, true);
    xmlhttp.send();	
}

function updatePage(results) {
  console.log("Updating the div with these results: " + results);
  var result = JSON.parse(results);
  var div = document.getElementById("results"); 
  div.innerHTML = result["list"][0]["name"] + "<button type='button' class='details btn btn-primary btn-xs detailsbtn' id='" + result["list"][0]["id"] +  "' data-toggle='modal' data-target='#addModal'>Details</button>" + "<button type='button' class='add  btn btn-info btn-xs detailsbtn'  data-toggle='modal' data-target='#myModal'><span class='glyphicon glyphicon-plus'></span> Plus</button>";  //"<button data-toggle='popover' class='details btn btn-primary btn-xs detailsbtn' id='" + result["list"][0]["id"] + "' onclick()=\"showDetails()\">Details</button>";

  //console.log(result["list"][0]["name"]);

}

$(document).on('click', ".details", function(){
    //alert($(this).attr('id'));
    var selectStrm = document.getElementById("selectStream");
    var streamName = selectStrm.options[selectStrm.selectedIndex].text;
    $.ajax({type: 'GET', 
            url: "/infoOfStream?stream=" + streamName,
            dataType: 'json',
            success: function(result){
              console.log(typeof result);
              var resultStr = "";
              var arrayObj = result["list"];
              for (i in arrayObj){
                console.log(result["list"][i]);
                resultStr += "<p>";
                resultStr += arrayObj[i]["site_name"] + " ";
                resultStr += arrayObj[i]["description"] + " ";
                resultStr += arrayObj[i]["latitude"] + " " 
                resultStr += arrayObj[i]["longitude"] + "<br/>";
                //resultStr += arrayObj[i]["name"] + " ";
                var date = new Date(arrayObj[i]["date"]);
                resultStr += date.toDateString() + " ";
                resultStr += arrayObj[i]["content"] + " ";
                resultStr += "</p>"

              }
              $("#ele").html(resultStr);
      
    }});

    console.log("Finsihed loading modal")
});

function loadData() {
  console.log("Loading...");

  var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
         // console.log(xmlhttp.status);
           if (xmlhttp.status == 200) {
               //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
               //console.log("Back from the server with: " + xmlhttp.responseText);
               updateSelect(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

 
    xmlhttp.open("GET", "/allStreams", true);
    xmlhttp.send(); 
    console.log("Finished Loading");
}

function updateSelect(results) {

   var result = JSON.parse(results);
   //console.log(result);
   var selectStreamTag = document.getElementById('selectStream');
   index = 0;
   for(i in result["list"]){
    var opt = document.createElement("option");
    opt.value= index;
    opt.innerHTML = result["list"][i]["name"];

    // next append to select tag
    selectStreamTag.appendChild(opt);
    index++;
    //console.log(result["list"][i]["name"]);
   }
    //console.log(result["list"][0]["name"]);
}