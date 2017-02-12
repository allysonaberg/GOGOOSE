//creating the basic stuff 
/********************************************************/
var deck = ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2",
    "sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2", "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da", "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"];

var hand = [];
var cpu = [];

var turn = 0;

var myGroups = [];
var cpuGroups = [];
var score = 0;

/********************************************************/

//shuffle the cards
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

shuffle(deck);

function drawCard (deck, y) {
    if (deck.length != 0){
        y.unshift(deck[0]);
        deck.shift();
        checkArray(y);
    }
    else {
        console.log('cannot draw card, array is empty');
    }
}
//draw the cards for each person
for(var i =0; i <5; i++) {
    drawCard(deck, hand);
}

for(var i =0; i <5; i ++) {
    drawCard(deck,cpu);
}

function setup(hand, cpu) {
    //computer deck
    var html1 = '';
    for (var i = 0; i < cpu.length; i++) {
        html1 += '<div class = "card"></div>';
    }
    //html1 += '</div>';
    console.log("your deck: " + hand);
    document.getElementById('opponent').innerHTML = html1;

    //player deck
    var html2 = '';
    for (var j = 0; j < hand.length; j++) {
        html2 += '<div class = "card" id ="'+ hand[j]+'"></div>';
    }
    //html2 += '</div>';
    console.log("their deck: " + cpu);
    document.getElementById('player').innerHTML = html2;

    var html3 = score;
    document.getElementById('score').innerHTML = html3;
}
setup(hand, cpu);
//choose who's turn it is
function game(turn) {
        if (turn %2 === 0) {
            console.log('my turn');
            myTurn();
            turn++;
     
        }
        else {
            console.log('computers turn');
            myTurn();
            turn++;
        }
}

game();

//that person does their turn:
function myTurn() {
    console.log("my turn");
    //document.getElementById('request').disabled = false;
    $(document).ready(function() {
     $('#submit').click(function() {
        myTurnClick();
     });    
 });

}

function myTurnClick() {
        //do {
            var request = document.getElementById("request").value;
            var checkRequest = check(hand, request);

            if (checkRequest == true) {
                var checkOpponent = check(cpu, request);
                if (checkOpponent == true) {
                	//CHECK
                    var a = cpu.indexOf("c" + request);
                    var b = cpu.indexOf("s" + request);
                    var c = cpu.indexOf("h" + request);
                    var d = cpu.indexOf("d" + request);

                    //could be a problem of the index changing
                    if (a != -1) hand.unshift(cpu[a]);
                    if (b != -1) hand.unshift(cpu[b]);
                    if (c != -1) hand.unshift(cpu[c]);
                    if (d != -1) hand.unshift(cpu[d]);

                    if (a != -1) cpu.splice(a, 1);
                    if (b != -1) cpu.splice(b, 1);
                    if (c != -1) cpu.splice(c, 1);
                    if (d != -1) cpu.splice(d, 1);

                    console.log(hand);
                    console.log(cpu);
                    checkArray(hand);

                    if (cpu.length == 0) {
                        drawCard(deck,cpu); //this is in case that i take the computer's last card but there are still cards in the deck. the cpu has to draw
                    }

                    //$('#request').val(''); //clear the input field

                    //check if input field is cleared:
                    //console.log(request);
                    //endOfTurn = true
                    setup(hand,cpu);
                }
                else {
                    console.log("Go fish!"); //you have to take a card from the deck
                    console.log("increasing deck");
                    drawCard(deck, hand);
                    setup(hand, cpu);
                    if (hand[0] === ("c" + request) || hand[0] === ("d" + request) || hand [0] === ("h" + request) || hand[0] === ("s" + request)) {
                        turn++; //basically sets turn back to an even value which means player will go again
                    }
                    //game();
                }
                
            }
            else {
                console.log("Invalid request, try again")

                //$('#request').val(''); //clear the input field
                //check if input field is cleared:
                console.log(request);
            }
          //}  while (!endOfTurn);
}

function check(x, request) {
        if (x.includes("c" + request) || x.includes("s" + request) || x.includes("h" + request) || x.includes("d" + request)) {
            console.log("returning true");
            return true;
        }

}

function checkArray(array) {
    for (var i = 2; i <= 10; i++) {

        if (countInArray(array, i) >= 4) {
            moveToFront(array.indexOf("c" +i), array);
            moveToFront(array.indexOf("s" +i), array);
            moveToFront(array.indexOf("d" +i), array);
            moveToFront(array.indexOf("h" +i), array);

            console.log("deleting: " + i + "it has a count of : " + countInArray.count);
            array.splice(0,4);
            score++;

        }
    }

    if (countInArray(array, "j") >= 4) {

        moveToFront(array.indexOf("cj"), array);
        moveToFront(array.indexOf("sj"), array);
        moveToFront(array.indexOf("dj"), array);
        moveToFront(array.indexOf("hj"), array);
            console.log("deleting: " + i + "it has a count of : " + countInArray.count);

        array.splice(0,4);
        score++;
    }

    if (countInArray(array, "q") >= 4) {

        moveToFront(array.indexOf("cq"), array);
        moveToFront(array.indexOf("sq"), array);
        moveToFront(array.indexOf("dq"), array);
        moveToFront(array.indexOf("hq"), array);
            console.log("deleting: " + i + "it has a count of : " + countInArray.count);

        array.splice(0,4);
        score++;
    }

    if (countInArray(hand, "k") >= 4 ) {

        moveToFront(array.indexOf("ck"), array);
        moveToFront(array.indexOf("sk"), array);
        moveToFront(array.indexOf("dk"), array);
        moveToFront(array.indexOf("hk"), array);
            console.log("deleting: " + i + "it has a count of : " + countInArray.count);

        array.splice(0,4);
        score++;
    }

    if (countInArray(hand, "a") >= 4) {

        moveToFront(array.indexOf("ca"), array);
        moveToFront(array.indexOf("sa"), array);
        moveToFront(array.indexOf("da"), array);
        moveToFront(array.indexOf("ha"), array);
            console.log("deleting: " + i + "it has a count of : " + countInArray.count);

        array.splice(0,4);
        score++;      
    }
}

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].includes(what)) {
            count++;
        }
    }
    return count;
}


function moveToFront(old_index, array) {
    if (0 >= array.length) {
        var r = 0 - array.length;
        while ((r--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(0, 0, array.splice(old_index, 1)[0]);
    return array; // for testing purposes
}
	//1. picks a card
	//2. check to see if that is a valid card for themselves
	//3. check to see if it is a valid card for the user
	//4. either take card from cpu or go fish
	//5. increment turn


