function streamSearch() {
	// Log something on the browser console
	console.log("Searching...");

	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          console.log(xmlhttp.status);
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

    console.log("here at streamName");
    // TODO: I need to get the book name from the form here...
    var streamName = document.getElementById("stream").value;

    xmlhttp.open("GET", "/stream?stream=" + streamName, true);
    xmlhttp.send();	
}

function updatePage(results) {
  console.log("Updating the div with these results: " + results);
  var result = JSON.parse(results);


  console.log(typeof result);

  //var div = getElementById("results");
  //div.innerHTML = result["lists"];

}