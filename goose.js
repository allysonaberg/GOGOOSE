var deck = ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2",
    "sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2", "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da", "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"];

var hand = [];
var cpu = [];

var turn = 0;
var endOfTurn = false;

var myGroups = [];
var cpuGroups = [];

shuffle (deck);

//Drawing the initial cards
for(var i =0; i <5; i++) {
    drawCard(deck, hand);
}

for(var i =0; i <5; i ++) {
    drawCard(deck,cpu);
}

setup(hand, cpu);
console.log(hand);
console.log(cpu);
game(turn);


/*********** FUNCIONS ******************/

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}


function setup(hand, cpu) {
    //computer deck
    var html1 = '';
    for (var i = 0; i < cpu.length; i++) {
        html1 += '<div class = "card"></div>';
    }
    //html1 += '</div>';
    document.getElementById('opponent').innerHTML = html1;

    //player deck
    var html2 = '';
    for (var j = 0; j < hand.length; j++) {
        html2 += '<div class = "card" id ="'+ hand[j]+'"></div>';
    }
    //html2 += '</div>';
    document.getElementById('player').innerHTML = html2;
}

function drawCard (deck, y) {
    if (deck.length != 0){
        y.unshift(deck[0]);
        deck.shift();
        //checkArray(y);
    }
    else {
        console.log('cannot draw card, array is empty');
    }
}

function game(turn) {
        if (turn %2 == 0) {
            console.log('my turn');
            myTurn();
            turn++;
     
        }
        else {
            console.log('again my turn');
            myTurn();
            turn++;
        }
}

function myTurnClick() {
        //do {
            var request = document.getElementById("request").value;
            var checkRequest = check(hand, request);

            if (checkRequest == true) {
                console.log("running checkrequest");
                var checkOpponent = check(cpu, request);
                if (checkOpponent == true) {
                    var a = cpu.indexOf("c" + request);
                    var b = cpu.indexOf("s" + request);
                    var c = cpu.indexOf("h" + request);
                    var d = cpu.indexOf("d" + request);

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
                    //checkArray(hand);

                    if (cpu.length === 0) {
                        drawCard(deck,cpu); //this is in case that i take the computer's last card but there are still cards in the deck. the cpu has to draw
                    }

                    $('#request').val(''); //clear the input field

                    //check if input field is cleared:
                    console.log(request);
                    endOfTurn = true
                    setup(hand,cpu)
                }
                else {
                    console.log("Go fish!"); //you have to take a card from the deck
                    drawCard(deck, hand);
                    turn++;
                    setup(hand, cpu);
                    if (hand[0] === ("c" + request) || hand[0] === ("d" + request) || hand [0] === ("h" + request) || hand[0] === ("s" + request)) {
                        turn++; //basically sets turn back to an even value which means player will go again
                    }
                    game();
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

function myTurn() {
    console.log("running myturn");
    document.getElementById('request').disabled = false;
    $(document).ready(function() {
     $('#submit').click(function() {
        myTurnClick();
     });    
     console.log("turn is" + turn);
 });

}

function cpuTurn () {
    endOfTurn = false;
    console.log("running cpu turn");
    document.getElementById('request').disabled = true;
    document.getElementById('gofish').visible = true;

    do {
        var compRequest = chooseAskingCard(cpu);
        computerRequest(); //consoles out the request
        checkRequest = check(hand, compRequest); //checks your hand so don't even try to cheat!!!

        if (checkRequest) {
            console.log("Click on all the cards that match the request")
            var a = hand.indexOf("c" + request);
            var b = hand.indexOf("s" + request);
            var c = hand.indexOf("h" + request);
            var d = hand.indexOf("d" + request);

            do {
                $(document).ready(function () {
                    $('button').click(function () {
                        if ($(this).is("." + request)) {
                            $(this).fadeOut(1000);
                            if ($(this).is("#" + ("c" + request))) {
                                cpu.unshift(hand[a]);
                                hand.splice(a, 1);
                            }
                            else if ($(this).is("#" + ("s" + request))) {
                                cpu.unshift(hand[b]);
                                hand.splice(b, 1);
                            }
                            else if ($(this).is("#" + ("h" + request))) {
                                cpu.unshift(hand[c]);
                                hand.splice(c, 1);
                            }
                            else if ($(this).is("#" + ("d" + request))) {
                                cpu.unshift(hand[d]);
                                hand.splice(d, 1);
                            }
                        }
                    });
                });
                if (hand.length === 0) {
                    drawCard(hand, cpu); //in the case that the cpu takes my last card before the deck ends
                }
            } while (check(hand, compRequest));

        }
        else {
            $(document).ready(function () {
                $("#fish").click(function () { //this means when the button with id "fish" is pressed, then ...
                    $("#goFish").fadeIn("2000", function () {
                        $(this).delay(1000).fadeOut("slow");
                    });//makes the <h2> element fade in so that it says "go fish" on the screen
                    drawCard(deck, cpu);
                });
            });
            turn++;
            endOfTurn = true;
            if (cpu[0] === ("c" + request) || cpu[0] === ("d" + request) || cpu [0] === ("h" + request) || cpu[0] === ("s" + request)) {
                turn++; //sets turn back to an odd value so cpu will go again
            }
        }
    } while (!endOfTurn);
}


function computerRequest() {
    if (chooseAskingCard(cpu)==='c2' || chooseAskingCard(cpu) === 'd2' || chooseAskingCard(cpu)==='s2' || chooseAskingCard(cpu) === 'h2')
    {
        console.log("Do you have a 2?");
    }
    else if (chooseAskingCard(cpu)==='c3' || chooseAskingCard(cpu) === 'd3' || chooseAskingCard(cpu)=== 's3' || chooseAskingCard(cpu) === 'h3')
    {
        console.log("Do you have a 3?");
    }
    else if (chooseAskingCard(cpu)=== 'c4' || chooseAskingCard(cpu) === 'd4' || chooseAskingCard(cpu)=== 's4' || chooseAskingCard(cpu) === 'h4')
    {
        console.log("Do you have a 4?");
    }
    else if (chooseAskingCard(cpu)=== 'c5' || chooseAskingCard(cpu) === 'd5' || chooseAskingCard(cpu)=== 's5' || chooseAskingCard(cpu) === 'h5')
    {
        console.log("Do you have a 5?");
    }
    else if (chooseAskingCard(cpu)=== 'c6' || chooseAskingCard(cpu) === 'd6' || chooseAskingCard(cpu)=== 's6' || chooseAskingCard(cpu) === 'h6')
    {
        console.log("Do you have a 6?");
    }
    else if (chooseAskingCard(cpu)=== 'c7' || chooseAskingCard(cpu) === 'd7' || chooseAskingCard(cpu)=== 's7' || chooseAskingCard(cpu) === 'h7')
    {
        console.log("Do you have a 7?");
    }
    else if (chooseAskingCard(cpu)=== 'c8' || chooseAskingCard(cpu) === 'd8' || chooseAskingCard(cpu)=== 's8' || chooseAskingCard(cpu) === 'h8')
    {
        console.log("Do you have an 8?");
    }
    else if (chooseAskingCard(cpu)=== 'c9' || chooseAskingCard(cpu) === 'd9' || chooseAskingCard(cpu)=== 's9' || chooseAskingCard(cpu) === 'h9')
    {
        console.log("Do you have a 9?");
    }
    else if (chooseAskingCard(cpu)=== 'c10' || chooseAskingCard(cpu) === 'd10' || chooseAskingCard(cpu)=== 's10' || chooseAskingCard(cpu) === 'h10')
    {
        console.log("Do you have a 10?");
    }
    else if (chooseAskingCard(cpu)==='cj' || chooseAskingCard(cpu) === 'dj' || chooseAskingCard(cpu)=== 'sj' || chooseAskingCard(cpu) === 'hj')
    {
        console.log("Do you have a Jack?");
    }
    else if (chooseAskingCard(cpu)=== 'cq'|| chooseAskingCard(cpu) === 'dq' || chooseAskingCard(cpu)=== 'sq' || chooseAskingCard(cpu) === 'hq')
    {
        console.log("Do you have a Queen?");
    }
    else if (chooseAskingCard(cpu)=== 'ck' || chooseAskingCard(cpu) === 'dk' || chooseAskingCard(cpu)=== 'sk' || chooseAskingCard(cpu) === 'hk')
    {
        console.log("Do you have a King?");
    }
    else {
        console.log("Do you have an Ace?");
    }
}

function chooseAskingCard(cpu) {
    var value = Math.floor(Math.random() * cpu.length);
    return cpu[value[0]];
}

function check(x, request) {
        if (x.includes("c" + request) || x.includes("s" + request) || x.includes("h" + request) || x.includes("d" + request)) {
            console.log("returning true");
            return true;
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

function checkArray(array) {
    for (var i = 2; i < 11; i++) {

        if (countInArray(array, i) >= 4) {
            moveToFront(array.indexOf("c" +i), array);
            moveToFront(array.indexOf("s" +i), array);
            moveToFront(array.indexOf("d" +i), array);
            moveToFront(array.indexOf("h" +i), array);

            array.splice(0,4);

        }
    }

    if (countInArray(array, "j") >= 4) {

        moveToFront(array.indexOf("cj"), array);
        moveToFront(array.indexOf("sj"), array);
        moveToFront(array.indexOf("dj"), array);
        moveToFront(array.indexOf("hj"), array);

        array.splice(0,4);
    }

    if (countInArray(array, "q") >= 4) {

        moveToFront(array.indexOf("cq"), array);
        moveToFront(array.indexOf("sq"), array);
        moveToFront(array.indexOf("dq"), array);
        moveToFront(array.indexOf("hq"), array);

        array.splice(0,4);
    }

    if (countInArray(hand, "k") >= 4 ) {

        moveToFront(array.indexOf("ck"), array);
        moveToFront(array.indexOf("sk"), array);
        moveToFront(array.indexOf("dk"), array);
        moveToFront(array.indexOf("hk"), array);

        array.splice(0,4);
    }

    if (countInArray(hand, "a") >= 4) {

        moveToFront(array.indexOf("ca"), array);
        moveToFront(array.indexOf("sa"), array);
        moveToFront(array.indexOf("da"), array);
        moveToFront(array.indexOf("ha"), array);

        array.splice(0,4);        
    }
}

