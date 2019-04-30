$("#sign button").on("click", function(e) {
    e.preventDefault();

    window.location.replace("survey.html");
});

$("#rightbtn #next").on("click", function(e) {
    e.preventDefault();

    $("#rightbtn").fadeOut();
    setTimeout(() => {
        $("#right").fadeIn().css("display", "grid");
    }, 500);
});

$("#x").on('click', function(e) {
    $("#result").fadeOut();
    window.location.replace("home.html");
});

$("#subBtn").on("click", function(e) {
    e.preventDefault();

    let newUser = {
        name: $("#nameIn").val().trim(),
        pic: $("#picIn").val().trim(),
        scores: [
            $("input:radio[name = question1]:checked").val(),
            $("input:radio[name = question2]:checked").val(),
            $("input:radio[name = question3]:checked").val(),
            $("input:radio[name = question4]:checked").val(),
            $("input:radio[name = question5]:checked").val(),
            $("input:radio[name = question6]:checked").val(),
            $("input:radio[name = question7]:checked").val(),
            $("input:radio[name = question8]:checked").val(),
            $("input:radio[name = question9]:checked").val(),
            $("input:radio[name = question10]:checked").val()
        ],
    }

    $("#nameIn").val("");
    $("#picIn").val("");
    
    let valid = () => {
        for(let i=0;i<newUser.scores.length;i++){
            if(isNaN(newUser.scores[i])){
                return false;
            }
        }
        if(!newUser.name || !newUser.pic){
            return false;
        }
        return true;
    }
    let getSum = (a) => {
        let sum = 0;
        for(let i=0;i<a.length;i++){
            sum += parseInt(a[i]);
        }
        return sum;
    }
    let findClosest = (current, comp) => {
        let cscore = getSum(current);
        let x = comp[0];
        for(let i=0; i<comp.length;i++){
            if(Math.abs(cscore - comp[i]) < Math.abs(cscore- x)){
                x = comp[i];
            }
        }
        return comp.indexOf(x);
    }
    let ajaxget = (d) => {
        let compArr = [];
        for(let i=0;i<(d.length-1);i++){
            let sum = getSum(d[i].scores);
            compArr.push(sum);
        }
        let index = findClosest(newUser.scores, compArr);
        return index;
    }
    let val = valid();    
    if(val){
        console.log("new user added");
        $.post("/api/friends", newUser, () => {
        });

        $.get("/api/friends", (d) => {
            console.log(d);
            let cindex = ajaxget(d);
            $("#best h2").html(d[cindex].name);
            $("#proimg").attr("src", d[cindex].pic);
        });
        
        $("#result").fadeIn(1000).css("display", "grid");
    }
    else{
        console.log("new user fail");
        $("#subTxt").html("you must fill out all fields");
        setTimeout(() => {
            $("#subTxt").html("");
        }, 1500);
    }



    
});