var statistics = {

    "NumberOfDemocrates": 0,
    "NumberOfRepublicans": 0,
    "NumberOfIndependents": 0,
    "democratVotes": 0,
    "republicanVotes": 0,
    "independentVotes": 0,
    "totalVotes_avg": 0,
    "numMissedVotes": 0,
    "numMissedVotesTop": 0,
    "numMissedVotesBottom": 0,

};

//         JSON
/*---------------------------*/

var data;
var member;

    if (document.title == "Senate Attendance") {

        fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
            method: "GET",
            headers: {
                'X-API-key': 'mtFCPCBuXqsQITOHHcceCwIuCaoUYN9P0qUXJXVE'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(function (json) {
            var data = json;
            console.log(data);

            member = data.results[0].members;

            allMembers();
            glance();
            least_V_W_Party_Att();
            tableLeast_Att("least-eng-att");
            most_W_Party_Att();
            tableLeast_Att("most-eng-att");


        }).catch(function (error) {
            console.log("Requestes failed: " + error.message);
        });
    }


if (document.title == "House Attendance") {

    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: "GET",
        headers: {
            'X-API-key': 'mtFCPCBuXqsQITOHHcceCwIuCaoUYN9P0qUXJXVE'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(function (json) {
        var data = json;
        console.log(data);

        member = data.results[0].members;

        allMembers();
        glance();
        least_V_W_Party_Att();
        tableLeast_Att("least-eng-att");
        most_W_Party_Att();
        tableLeast_Att("most-eng-att");

    }).catch(function (error) {
        console.log("Requestes failed: " + error.message);
    });

}


/*---GLOBAL VARIABLES---*/


var dem = [];
var rep = [];
var ind = [];
var lowPct = [];
var highPct = [];


/*------------GLANCE---------------*/

function glance() {

    var cell_1 = document.getElementById("rep_guys");
    cell_1.innerHTML = statistics.NumberOfRepublicans;
    var cell_2 = document.getElementById("rep_votes");
    cell_2.innerHTML = statistics.republicanVotes.toFixed(2);
    var cell_3 = document.getElementById("dem_guys");
    cell_3.innerHTML = statistics.NumberOfDemocrates;
    var cell_4 = document.getElementById("dem_votes");
    cell_4.innerHTML = statistics.democratVotes.toFixed(2);
    var cell_5 = document.getElementById("ind_guys");
    cell_5.innerHTML = statistics.NumberOfIndependents;
    var cell_6 = document.getElementById("ind_votes");
    cell_6.innerHTML = statistics.independentVotes.toFixed(2);
    var cell_7 = document.getElementById("total");
    cell_7.innerHTML = member.length;
    var cell_8 = document.getElementById("total_votes");
    cell_8.innerHTML = statistics.totalVotes_avg.toFixed(2);
}

/*--------FUNCTIONS--SENATE--ATTENDANCE--------*/

function allMembers() {
    for (d = 0; d < member.length; d++) {
        if (member[d].party == "D") {
            dem.push(member[d]);
        }
    }

    for (r = 0; r < member.length; r++) {
        if (member[r].party == "R") {
            rep.push(member[r]);
        }
    }

    for (i = 0; i < member.length; i++) {
        if (member[i].party == "I") {
            ind.push(member[i]);
        }
    }

    statistics.NumberOfDemocrates = dem.length;
    statistics.NumberOfRepublicans = rep.length;
    statistics.NumberOfIndependents = ind.length;

    /*-----------------------AVERAGE------------------------*/

    var votesDem = 0;
    var votesRep = 0;
    var votesInd = 0;
    var votesTotal = 0;

    for (d = 0; d < dem.length; d++) {
        votesDem = votesDem + dem[d].votes_with_party_pct;
    }
    statistics.democratVotes = votesDem / dem.length;

    for (r = 0; r < rep.length; r++) {
        votesRep = votesRep + rep[r].votes_with_party_pct;
    }
    statistics.republicanVotes = votesRep / rep.length;

    for (i = 0; i < ind.length; i++) {
        votesInd = votesInd + ind[i].votes_with_party_pct;
    }

    for (i = 0; i < member.length; i++) {
        votesTotal = votesTotal + member[i].votes_with_party_pct;
    }
    statistics.independentVotes = votesInd / ind.length || 0;

    statistics.totalVotes_avg = votesTotal / member.length;
}

/*--------------------------------------*/

function least_V_W_Party_Att() {

    var newMember = Array.from(member);

    newMember.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    var pct = newMember.length * 0.1;
    var pctRound = Math.round(pct);

    for (var i = 0; i < newMember.length; i++) {
        if (i < pctRound) {
            lowPct.push(newMember[i]);
        } else if (newMember[i].missed_votes_pct == newMember[i - 1].missed_votes_pct) {
            lowPct.push(newMember[i]);
        } else {
            break;
        }
    }
    statistics.numMissedVotesBottom = lowPct;
}

/*--------------------------------------*/

function most_W_Party_Att() {

    var newMember = Array.from(member);

    newMember.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });

    var pct = newMember.length * 0.1;
    var pctRound = Math.round(pct);

    for (var i = 0; i < newMember.length; i++) {
        if (i < pctRound) {
            highPct.push(newMember[i]);
        } else if (newMember[i].missed_votes_pct == newMember[i - 1].missed_votes_pct) {
            highPct.push(newMember[i]);
        } else {
            break;
        }
    }
    statistics.numMissedVotesTop = highPct;
}

/*--------------------------------------*/

function tableLeast_Att(id) {

    var tableLeastSenateAtt = document.getElementById(id);
    tableLeastSenateAtt.innerHTML = "";

    
    if(id=="most-eng-att") {
        var everyMember = Array.from(statistics.numMissedVotesTop);
    } else {
        var everyMember = Array.from(statistics.numMissedVotesBottom);
    }

    for (var i = 0; i < everyMember.length; i++) {

        var url = everyMember[i].url;

        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        var fName = everyMember[i].first_name;
        var lName = everyMember[i].last_name;
        var fullName = (fName + " " + lName);
        a.append(fullName);

        var row = document.createElement("tr");
        row.insertCell().append(a); 
        row.insertCell().innerHTML = everyMember[i].missed_votes;
        row.insertCell().innerHTML = everyMember[i].missed_votes_pct;
        tableLeastSenateAtt.append(row);
    }
}
