$(document).ready(function() {
    
    // global variables

    var selectFighterOn = false;
    var selectOpponentOn = false;
    var fightOn = false;
    var fighter = null;
    var opponent = null;
    
    // characters
    
    var rey = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".rey"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
    }

    var snoke = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".snoke"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
    }

    var kylo = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".kylo"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
    }

    var poe = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".poe"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
    }

    // global functions

    function newGame() {
        // put reset functions here

        // let player select fighter

        $(".character").addClass("select-time");
        selectFighterOn = true;
        newRound();
    }

    function newOpponent() {

        // let player select opponent

        $(".character").addClass("select-time");
        selectOpponentOn = true;
    }


    // click listeners

    $(".character").on("click", function() {
        
        if(selectFighterOn == true) {

            // move fighter to position
            $(this).appendTo("#div-fighter");
            $(this).addClass("fighter");
            selectFighterOn = false;
            selectOpponentOn = true;

        } else if(selectOpponentOn == true) {
            $(this).appendTo("#div-opponent");
            selectOpponentOn = false;
            $(".character").removeClass("select-time");
            fightOn = true;
        }
        
    })

    $("#fight-button").on("click", function() {

        if(fightOn == true) {
            $(".fighter").animate({left:"+=30"}, 200).animate({left:"-=40"}, 200).animate({left:"+=10"});
            $("#div-healthBar").animate({width:250}, 2000);
        }
        
    })


    // execute

    newGame();


    //     $(".div-selectionOverlay").addClass("showOverlay");
    //     $(".fade").addClass("fadeMain");
    
    

})

