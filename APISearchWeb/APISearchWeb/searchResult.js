/**
 * Created by mypc on 2/6/2017.
 */
var idGen = 0;
// Twilio Credentials
var accountSid = 'AC8fad4a891110cfc1d348c2c1d7a25b5e';
var authToken = 'e9eb0648fa7855e652b5806d6bb6c787';
var twilio = require("path/to/twilio-node/lib");
//require the Twilio module and create a REST client
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

function searchTweets(keyword){
    console.log(keyword);
    $.getJSON("http://thunderx.cise.ufl.edu:8080/api/s/".concat(keyword) , showResults);
}

function sendMsg() {
    client.messages.create({
        to: "+14846496586",
        from: "+15017250604",
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    }, function (err, message) {
        console.log(message.sid);
    });
}

function showResults(response){
    var results = response.results;
    /*var keyword = document.getElementById("keywordTextbox").value;
     results = results.filter(function (item) {
     return (item.title).indexOf(keyword) >= 0 | (item.text).indexOf(keyword) >= 0 |
     (item.date).indexOf(keyword) >= 0;
     });*/
    var rows = results.map(function(item){
        return createRow(item.title, item.image, item.date);
    });
    document.getElementById("apiList").innerHTML = "<input type='submit' value='Back' onclick='showSearchForm();' /><br /><table id='resultsTable'></table>";
    rows.forEach(function(row){
        document.getElementById("resultsTable").appendChild(row);
    });
    //document.getElementById("searchForm").style.display = "none";
    document.getElementById("apiList").style.display = "block";
}

function retainData(current, id) {
    localStorage.setItem(id,current);
}

function showSearchForm() {
    location.href = "index.html";//new code
}

function createRow(user, iconUrl, tweet){
    var tweetRow = document.createElement("tr");
    var iconCell = document.createElement("td");
    iconCell.setAttribute("class", "icon");
    var icon = document.createElement("img");
    icon.src = iconUrl;
    icon.setAttribute("alt", user);
    icon.setAttribute("height", 48);
    icon.setAttribute("width", 48);
    iconCell.appendChild(icon);
    tweetRow.appendChild(iconCell);
    var tweetCell = document.createElement("td");
    tweetCell.setAttribute("class", "tweet");
    tweetCell.appendChild(document.createTextNode(user + ": " + tweet));
    tweetRow.appendChild(tweetCell);

    var options = document.createElement("td");
    var radioItem1 = document.createElement("input");
    var labelradioItem1 = document.createElement("Label");
    //labelradioItem1.setAttribute("for",radioItem1);
    labelradioItem1.innerHTML = "   Read";
    options.appendChild(labelradioItem1);

    radioItem1.type = "radio";
    radioItem1.name = "radioGrp"+idGen;
    radioItem1.setAttribute("onClick", "retainData('Read', this.parentNode.previousSibling.innerHTML);");
    options.appendChild(radioItem1);

    var radioItem2 = document.createElement("input");
    var labelradioItem2 = document.createElement("Label");
    //labelradioItem2.setAttribute("for",radioItem1);
    labelradioItem2.innerHTML = "Unread  ";

    options.appendChild(labelradioItem2);
    radioItem2.type = "radio";
    radioItem2.name = "radioGrp"+idGen;
    radioItem2.setAttribute("onClick", "retainData('Unread', this.parentNode.previousSibling.innerHTML);");
    options.appendChild(radioItem2);

    var radioItem3 = document.createElement("input");
    var labelradioItem3 = document.createElement("Label");
    //labelradioItem3.setAttribute("for",radioItem3);
    labelradioItem3.innerHTML = "Wishlist";

    options.appendChild(labelradioItem3);
    radioItem3.type = "radio";
    radioItem3.name = "radioGrp"+idGen;
    radioItem3.setAttribute("onClick", "retainData('WishList', this.parentNode.previousSibling.innerHTML);");
    options.appendChild(radioItem3);


    tweetRow.appendChild(options);


    var val = localStorage.getItem(user+": "+tweet);

    if(val != null){
        if(val == "Read") radioItem1.checked = true;
            else if(val == "Unread") radioItem2.checked = true;
                else if(val == "WishList") radioItem3.checked = true;
    }

    idGen++;
    return tweetRow;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}