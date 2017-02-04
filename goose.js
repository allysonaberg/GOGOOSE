var deck = ["ac", "kc", "qc", "jc", "10c", "9c", "8c", "7c", "6c", "5c", "4c", "3c", "2c",
    "as", "ks", "qs", "js", "10s", "9s", "8s", "7s", "6s", "5s", "4s", "3s", "2s", "ah", "kh", "qh", "jh", "10h", "9h", "8h", "7h", "6h", "5h", "4h", "3h", "2h", "ad", "kd", "qd", "jd", "10d", "9d", "8d", "7d", "6d", "5d", "4d", "3d", "2d"];

var hand = [];
var cpu = [];

shuffle (deck);

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

//Drawing the initial cards
for(var i =0; i <5; i++) {
    drawCard(deck, hand);
}

for (var i =0; i <5; i ++) {
    drawCard(deck,cpu);
}

function drawCard (x, y) {
    y.push(deck[0]);
    x.shift();
}

console.log(deck);
console.log(hand);
console.log(cpu);

var request = document.getElementById("request").value; //instead of the hardcoded "ac", it will be an input from the user in the form: document.getElementById('request').value;
var checkRequest = check(hand, request);

function check (x, request) {
    for(var i=0; i<x.length; i++) {
        if (x[i] == request+"c" || x[i] == request+"s" || x[i] ==request+"h" || x[i]==request+"d") {
            return true;
        }
    }
}

//console.log(checkRequest);


if(checkRequest === true) {
    var checkOpponent = check(cpu, request);
    if (checkOpponent === true) {
        var a = cpu.indexOf(request+"c");
        var b = cpu.indexOf(request+"s");
        var c = cpu.indexOf(request+"h");
        var d = cpu.indexOf(request+"d");

        //console.log(a);
        //console.log(b);
        //console.log(c);
        //console.log(d);

        if (a!= -1) hand.push(cpu[a]);
        if (b!= -1) hand.push(cpu[b]);
        if (c!= -1) hand.push(cpu[c]);
        if (d!= -1) hand.push(cpu[d]);

        if (a!= -1) cpu.splice(a,1);
        if (b!= -1) cpu.splice(b,1);
        if (c!= -1) cpu.splice(c,1);
        if (d!= -1) cpu.splice(d,1);

        console.log(hand);
        console.log(cpu);
    }
    else {
        console.log("Go fish!");
        drawCard(deck, hand);
    }
}
else {
    console.log("Invalid request, try again")
}
