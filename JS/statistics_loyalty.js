var statistics = {

    "NumberOfDemocrates": 0,
    "NumberOfRepublicans": 0,
    "NumberOfIndependents": 0,
    "democratVotes": 0,
    "republicanVotes": 0,
    "independentVotes": 0,
    "totalVotes_avg": 0,
    "numMissedVotes": 0,

};

//          JSON
/*----------------------------*/


var data;
var member;

if (document.title == "Senate Loyalty") {

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
        tableLeast_Loyal("least_loyal", least_V_Party(), "ASC");
        tableLeast_Loyal("most_loyal", least_V_Party(), "DSC");



    }).catch(function (error) {
        console.log("Requestes failed: " + error.message);
    });

}


if (document.title == "House Loyalty") {

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
        tableLeast_Loyal("least_loyal", least_V_Party(), "ASC");
        tableLeast_Loyal("most_loyal", least_V_Party(), "DSC");



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


/*---FUNCTIONS--LOYALTY--------*/

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

    /*----average----*/

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
    statistics.independentVotes = (votesInd / ind.length) || 0;


    statistics.totalVotes_avg = votesTotal / member.length;
}




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



function least_V_Party() {

    var newMember = Array.from(member);

    newMember.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    return newMember;

}


function tableLeast_Loyal(id, orderedArray, order) {

    var tableLeastSenateAtt = document.getElementById(id);
    tableLeastSenateAtt.innerHTML = "";
    var lowPct = []
    if (order != "ASC") {
        orderedArray.reverse();
    }

    var pct = orderedArray.length * 0.1;
    var pctRound = Math.round(pct);

    for (var i = 0; i < orderedArray.length; i++) {
        if (i < pctRound) {
            lowPct.push(orderedArray[i]);
        } else if (orderedArray[i].votes_with_party_pct == orderedArray[i - 1].votes_with_party_pct) {
            lowPct.push(orderedArray[i]);
        } else {
            break;
        }
    }


    for (var i = 0; i < lowPct.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = lowPct[i].first_name;
        row.insertCell().innerHTML = lowPct[i].total_votes;
        row.insertCell().innerHTML = lowPct[i].votes_with_party_pct;
        tableLeastSenateAtt.append(row);
    }
}
