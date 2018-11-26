/*
with this command we can chec that the info from the JSON works on the page
*/

/*
document.getElementById("data-house").innerHTML = JSON.stringify(data_house,null,2);
*/


//with the following function we achieve that the info run trough itself and this will let us target specific information from the JSON file. 

function tableCongress() {

    var tbody = document.getElementById("tbody_house");
    tbody.innerHTML = "";

    for (var i = 0; i < data.results[0].members.length; i++) {

        // time to declare variables.

        // the following variables are gonna create the structure of the table. (create html tags)

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");

        // the next lines will declare the variables that we will use to fill the table.

        var fName = data.results[0].members[i].first_name;
        var mName = data.results[0].members[i].middle_name;
        var lName = data.results[0].members[i].last_name;
        var party = data.results[0].members[i].party;
        var state = data.results[0].members[i].state;
        var yOffice = data.results[0].members[i].seniority;
        var votes = data.results[0].members[i].votes_with_party_pct;
        var url = data.results[0].members[i].url;
        var member = data.results[0].members[i];

        //will place the info were it will find the same id on the html.        


        // with the conditional "if" we can target the middle name to avoid the "null".    
        if (mName == null) {
            a.append(lName + " " + fName);
        } else {
            a.append(lName + " " + fName + " " + mName);
        }

        // with the append property, we push the targeted data to the specific place we want it on the table.

        // 1st column.
        td1.append(a);
        tr.append(td1);
        // 2n column.
        td2.append(party);
        tr.append(td2);
        // 3rd column.
        td3.append(state);
        tr.append(td3);
        // 4th column.
        td4.append(yOffice);
        tr.append(td4);
        // 5th column.        
        td5.append(votes + "%");
        tr.append(td5);
        // all the cells to the row
        if (filterHouse(member)) {
            tbody_house.append(tr);
        }
    }
}

tableCongress();


function filterHouse(member) {

    var check_D = document.getElementById("check_D");
    var check_R = document.getElementById("check_R");
    var check_I = document.getElementById("check_I");
    var arrayHouse = [];

    var select = document.getElementById("selectHouse");
    
    
    var finalCheckHouse = false;
    var finalDropHouse = false;


    if (check_D.checked) {
        arrayHouse.push("D");
    }

    if (check_R.checked) {
        arrayHouse.push("R");
    }

    if (check_I.checked) {
        arrayHouse.push("i");
    }

    if (arrayHouse.includes(member.party) || arrayHouse.length == 0) {
        finalCheckHouse = true;
    }
    
    if (select.value == "all_states"){
        finalDropHouse = true;
    }
    
    if (select.value == member.state){
        finalDropHouse = true;
    }
    
    if (finalCheckHouse && finalDropHouse == true){
        return true;
    }
}


document.getElementById("selectHouse").addEventListener("change",tableCongress);


function filterStateHouse(array) {

    var finalStatesHouse = [];

    for (i = 0; i < array.length; i++) {
        for (j = i + 1; j < array.length; j++) {
            if (array[i].state == array[j].state) {
                if (!finalStatesHouse.includes(array[i].state)) {
                    finalStatesHouse.push(array[i].state);
                }
            }
        }
    }

    finalStatesHouse.sort();
    console.log();
    
    for (k=0; k < finalStatesHouse.length; k++){
        
        var optionMenuHouse = document.createElement("option");
        optionMenuHouse.setAttribute("value", finalStatesHouse[k]);
        var selectStateHouse = document.getElementById("selectHouse");
        
        optionMenuHouse.append(finalStatesHouse[k]);
        selectStateHouse.append(optionMenuHouse);
    }
}

filterStateHouse(data.results[0].members);
