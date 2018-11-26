/* 
with this comand, we checked that the JSON file works.

document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
*/

//this function will make the loop to run for the whole data of the JSON file. 

function tableSenate() {
    /*
    first we need to declare a variable for the table and at the same time, it's going to dedide where on the html will appear. To do this first we have to give an id to the table tag of the html. Now with the property "document.getElementById("here we write the id from the html") it will show the element on the html when rendered. 
    In this, the variable will make the table to be "printed" empty for the first moment (we achieve this with the id.innerHTML = "";) and later on it will be filled as needed. With this we will be able to achive the proper behavior of the table when we filter by party.
    */
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";


    /*with the "for" loop we make the table to go trough every single item of the JASON file. But for this to work, we have to create a variable for every single item of the JASON that we want to target.
     */
    for (var i = 0; i < data.results[0].members.length; i++) {

        /*
        this variables will define the structure of the table. 
        And for this to become a part of the html we have to tel with the JS syntax to create the proper "tag" on the html. To do this, we use the "document.createElement("X")" where X have to be the html "tag" 
        */
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var a = document.createElement("a");

        /*
        this variables will go inside the "td". For the loop to be able to put the information we want inside the table, we have to create variables that contains the whole path until the specific value we want. To do this we will create a new variable for each element we want to target on the JASON and then give it the path from the beginning of the JASON. First of all, we have to create a variable that will take the whole JASON and save it on to a JS file in this case I gave "var data = (the whole JASON)" once we have "converted" the JSON into a JS file.
        With this we can say "go to":
        data(first variable we create) .
        results[0](first array of the variable and [0 means first position of the array]) .
        members[i](second array of the variable and inside of this, with the [i] check every single one of the objects) .
        first_name; (this is the last part of the path and it's the one that targets the specific data we want)
        */
        var fName = data.results[0].members[i].first_name;
        var mName = data.results[0].members[i].middle_name;
        var lName = data.results[0].members[i].last_name;
        var party = data.results[0].members[i].party;
        var state = data.results[0].members[i].state;
        var seniority = data.results[0].members[i].seniority;
        var votes = data.results[0].members[i].votes_with_party_pct;
        var url = data.results[0].members[i].url;
        var everyMember = data.results[0].members[i];




        /*
        with the [Element.setAttribute(name, value)] property, we can give properties to an element. In this case we use it to give to a <a> the "href" and the url (who's comming from de "var url = ..." that we create before) to build the links to other web sites. Also, following this first attribute, we use it again to make sure the link is going to open in a new tag of the browser like when we create them in html. 
        ex: <a href="xxxxxxxxx" target="_blank=></a>
        */

        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");

        /*
         On this particular case, we have to put the full name (first, middel, last) in a single cell and to do this, we are going to use the "append" method. 
         The problem in this case is that on the JSON file we have all three elements as individuals. Also, some of the names do not have middle name, instead we find the annoying "null" and we don't want it to show on the table. To be able to hide it, I dedided not to "print" it and to achive this, I have to give a condition to it. 
         The [Element.append(everything we want to put there);] works in a similar way to the property .setAttribute(), but in this case it's not giving the name and value to a tag, now we are createing whats inside the tag. In this case inside of the <a> that we just give the href and the class before having the complete <a> tag with the working link to the website.
         Now with everything, we have an <a> tag with and (href+url) and (class+value) with the name we will see on the website.
         But here is where the conditional take place, and because de middle name is the one ho give a difference, we say, if middle name have "null" just print last & first name, if not (else) print (a.append) last + first + middle name.
         Finally, the append property have the following structure "<tag> that will go".append("elements that will go inside")
        */

        if (mName == null) {
            a.append(lName + " " + fName);
        } else {
            a.append(lName + " " + fName + " " + mName);
        }


        /*
        On the following lines, with the append property is used to place everything on the table creating the tipical html structure of a table step by step. 
        
        <tr>
            <td></td>
            ...
        </tr>    
        
        Here we tell
        <a> go to td1 (1st cell of the row)
        "party" go to td2 (2nd cell of the row)
        "state" go to td3 (3rd cell of the row)
        "seniority" go to (4th cell of the row)
        "votes" go to (5th cell of the row) --- notice that we want the value of the votes to be a percentage and we achive this adding the percentage simbol to the variable votes.
        */

        td1.append(a);
        tr.append(td1);
        /*--------------------------------*/
        td2.append(party);
        tr.append(td2);
        /*--------------------------------*/
        td3.append(state);
        tr.append(td3);
        /*--------------------------------*/
        td4.append(seniority);
        tr.append(td4);
        /*--------------------------------*/
        td5.append(votes + "%");
        tr.append(td5);

        /*
        In this last step we have every single cell of the table printed in a row. The las part have to be to print the row into the table, but because we want to be ables to filter the table depending the party, we will create another funcion outside of te table to do that. Therefor if the new function says: "show me the democrates" it will print only democrates.
        that funcion its going to print every single row of the table.
        */

        if (filterSenate(everyMember)) {
            tbody.append(tr);
        }
    }
}
/*
Finally, we just have to call the funcion that will make the loop go through every single member of the JSON and this will pick all the information that we just place were we want it and print every row of the table.
For all of this, the funcion has to be called from somewhere in the page. That will be the party selector checbox.
*/
tableSenate();



/*
Here we start the new function that will allow us to filter the table depending of the party.
*/

/*
here we have the new function that will create the filter. In this case, we want to filter the party who belongs every member. To do this, we will create a function that will be given the name "filterSenate(myMember) where "myMember" takes the value of the [i] from the variable everyMember from the function above.
*/
function filterSenate(myMember) {


    /*
    first we need to create the new and specific variables for every checbok and another that will contain an empty array. To do this, we will use again the "document.getElementById("the specific id from the html"). This will be used to make the filter work. 
    */

    var checkbox_1 = document.getElementById("myCheck_1");
    var checkbox_2 = document.getElementById("myCheck_2");
    var checkbox_3 = document.getElementById("myCheck_3");
    var arrayFilter = [];
    var selected = document.getElementById("selectState");

    /*
    over here, what's happening is that we make the conditionals that will allow us to filter. In this particular case, ther is one single conditional for every checkbox.
    "if (checkbox_1[this is the variable we just create].checked[adding the ".checked" we make the conditional == true]){
    arrayfilter[this is the empty array that was created before].push("D")[with the ".push("X")" we will "send" only the members that the party == "D, R or I" depending on the checkbox we selected or if there is more than one checkbox active, will show what has to be shown.]
    }
    */

    var finalCheckSenate = false;
    var finalDropSenate = false;

    if (checkbox_1.checked) {
        arrayFilter.push("D");
    }
    if (checkbox_2.checked) {
        arrayFilter.push("R");
    }
    if (checkbox_3.checked) {
        arrayFilter.push("I");
    }

    /*
    Here we will find the icyng on the cake. In this case if we forget this final line our table will be empty because on the first line of the function above, we said: "print the table empty"!!!! 
    Now, we are just saying, print everything on the table, but not through the table, instead, we are going through the empty array (arrayFilter). To do this, we say: 
    if (arrayFilter.includes[the ".includes" property determines if the array contains a specific element](myMember.party)[with the "myMember.party" we target just the target of every single member of the array on the JSON file] || [the 2 vertical bars means OR] arrayFilter.lenght [this is self explanatory] == 0){
    return "true" [declaring true, when the array will be empty, it will send everything to the empty array and it will be printed!!!!] 
    }
    */

    if (arrayFilter.includes(myMember.party) || arrayFilter.length == 0) {
        finalCheckSenate = true;
    }

    if (selected.value == "all") {
        finalDropSenate = true;
    }
    if (selected.value == myMember.state) {
        finalDropSenate = true;
    }

    if (finalCheckSenate && finalDropSenate == true) {
        return true;
    }
}
/* 

*/
document.getElementById("selectState").addEventListener("change", tableSenate);




function filterStateSenate(array) {

    var finalStatesSenate = [];

    for (i = 0; i < array.length; i++) {
        for (j = i + 1; j < array.length; j++) {
            if (array[i].state == array[j].state) {
                if (!finalStatesSenate.includes(array[i].state)) {
                    finalStatesSenate.push(array[i].state);
                }
            }
        }
    }

    finalStatesSenate.sort();
    console.log();

    for (k = 0; k < finalStatesSenate.length; k++) {

        var optionMenu = document.createElement("option");
        optionMenu.setAttribute("value", finalStatesSenate[k]);
        var selectStateSenate = document.getElementById("selectState");

        optionMenu.append(finalStatesSenate[k]);
        selectStateSenate.append(optionMenu);
    }


}
filterStateSenate(data.results[0].members);
