$(document).ready(function(){


//Declaring the game function
function pokemonGame() {

    //Setting up the variables we will be using in the game

    var characterHP = 0;
    var characterBaseAP = 0;
    var characterCurrentAP = 0;
    var opponentHP = 0;
    var opponentCAP = 0;
    var opponentName = "";
    var opponentsDefeated = 0;

    //These are all checks we will use later to determine if we can continue or if an action is allowed
    var characterPicked = false;
    var opponentPicked = false;
    var canStillFight = true;

    //These are the stats for each of the pokemon. HP is hit points, AP is attack power, CAP is counter-attack power

    var bulbasaurHP = 120;   
    var bulbasaurAP = 8;
    var bulbasaurCAP = 8;

    var charmanderHP = 100;  
    var charmanderAP = 10;
    var charmanderCAP = 5;

    var squirtleHP = 150; 
    var squirtleAP = 6;
    var squirtleCAP = 20;

    var pikachuHP = 180;    
    var pikachuAP = 5;
    var pikachuCAP = 25;

    //Audio for the game on a loop. It's the Pokemon Theme Song
    var themeAudio = new Audio("assets/sounds/theme-song.mp3");
    themeAudio.loop = true;
    themeAudio.play();

    //Adding the on click functions for the Play/Pause/Restart button
    $(".musicPlayButton").on("click", function(){
        themeAudio.play();
    });

    $(".musicPauseButton").on("click", function(){
        themeAudio.pause();
    });

    $(".musicRestartButton").on("click", function(){
        themeAudio.currentTime = 0;
        themeAudio.play();
    });

    //Generate the images in the correct div as well as displaying their HP

    $(".bulbasaurDiv").html("<div id='bulbasaurMoveDiv'><img class='pokemonPic' id='bulbasaurPic' src='assets/images/bulbasaur.png'><p class='HPtext' id='bulbasaurCurrentHP'></p></div>");

    $("#bulbasaurCurrentHP").text(bulbasaurHP);

    $(".charmanderDiv").html("<div id='charmanderMoveDiv'><img class='pokemonPic' id='charmanderPic' src='assets/images/charmander.png'><p class='HPtext' id='charmanderCurrentHP'></p></div>");

    $("#charmanderCurrentHP").text(charmanderHP);

    $(".squirtleDiv").html("<div id='squirtleMoveDiv'><img class='pokemonPic' id='squirtlePic' src='assets/images/squirtle.png'><p class='HPtext' id='squirtleCurrentHP'></p></div>");

    $("#squirtleCurrentHP").text(squirtleHP);

    $(".pikachuDiv").html("<div id='pikachuMoveDiv'><img class='pokemonPic' id='pikachuPic' src='assets/images/pikachu.png'><p class='HPtext' id='pikachuCurrentHP'></p></div>");

    $("#pikachuCurrentHP").text(pikachuHP);

    //Creating on click functions for selecting each pokemon. These areas are pretty much the same, except they're slightly changed for each of the different pokemon to choose from. I only commented the first one as the others are identical except changing names

    $(".bulbasaurDiv").on("click", function(){

        //Move selected pokemon to yourCharacterDiv and change the check for characterPicked to true. Border is now green
        $("#bulbasaurMoveDiv").detach().prependTo("#yourCharacter").css("border", "5px solid green");
        characterPicked = true;

        //We will use the variables characterHP and characterBaseAP for all possible pokemon picked, so just setting them equal to bulbasaur's stats

        characterHP = bulbasaurHP;
        characterBaseAP = bulbasaurAP;

        //Need to remove the div for bulbasaurCurrentHP and use the generic characterHPtext which will be updating as you fight

        $("#bulbasaurCurrentHP").remove();
        $(".characterHPtext").detach().appendTo("#bulbasaurMoveDiv");
        $(".characterHPtext").text(characterHP);

        //Move other pokemon to pokemon available to battle area. Change their backgrounds to red and font color to white

        $("#charmanderMoveDiv").detach().appendTo(".opponentCharmanderDiv").css({"background-color":"red","color":"white"});
        $("#squirtleMoveDiv").detach().appendTo(".opponentSquirtleDiv").css({"background-color":"red","color":"white"});
        $("#pikachuMoveDiv").detach().appendTo(".opponentPikachuDiv").css({"background-color":"red","color":"white"});
    });

    $(".charmanderDiv").on("click", function(){
        $("#charmanderMoveDiv").detach().appendTo("#yourCharacter").css("border", "5px solid green");
        characterPicked = true;
        characterHP = charmanderHP;
        characterBaseAP = charmanderAP;
        $("#charmanderCurrentHP").remove();
        $(".characterHPtext").detach().appendTo("#charmanderMoveDiv");
        $(".characterHPtext").text(characterHP);
        $("#bulbasaurMoveDiv").detach().appendTo(".opponentBulbasaurDiv").css({"background-color":"red","color":"white"});
        $("#squirtleMoveDiv").detach().appendTo(".opponentSquirtleDiv").css({"background-color":"red","color":"white"});
        $("#pikachuMoveDiv").detach().appendTo(".opponentPikachuDiv").css({"background-color":"red","color":"white"});
    });

    $(".squirtleDiv").on("click", function(){
        $("#squirtleMoveDiv").detach().appendTo("#yourCharacter").css("border", "5px solid green");
        characterPicked = true;
        characterHP = squirtleHP;
        characterBaseAP = squirtleAP;
        $("#squirtleCurrentHP").remove();
        $(".characterHPtext").detach().appendTo("#squirtleMoveDiv");
        $(".characterHPtext").text(characterHP);
        $("#bulbasaurMoveDiv").detach().appendTo(".opponentBulbasaurDiv").css({"background-color":"red","color":"white"});
        $("#charmanderMoveDiv").detach().appendTo(".opponentCharmanderDiv").css({"background-color":"red","color":"white"});
        $("#pikachuMoveDiv").detach().appendTo(".opponentPikachuDiv").css({"background-color":"red","color":"white"});
    });

    $(".pikachuDiv").on("click", function(){
        $("#pikachuMoveDiv").detach().appendTo("#yourCharacter").css("border", "5px solid green");
        characterPicked = true;
        characterHP = pikachuHP;
        characterBaseAP = pikachuAP;
        $("#pikachuCurrentHP").remove();
        $(".characterHPtext").detach().appendTo("#pikachuMoveDiv");
        $(".characterHPtext").text(characterHP);
        $("#bulbasaurMoveDiv").detach().appendTo(".opponentBulbasaurDiv").css({"background-color":"red","color":"white"});
        $("#charmanderMoveDiv").detach().appendTo(".opponentCharmanderDiv").css({"background-color":"red","color":"white"});
        $("#squirtleMoveDiv").detach().appendTo(".opponentSquirtleDiv").css({"background-color":"red","color":"white"});
    });

    //Creating on click function for picking pokemon to battle. These areas are pretty much the same, except they're slightly changed for each of the different pokemon to choose from. I only commented the first one as the others are identical except changing names

    $(".opponentBulbasaurDiv").on("click", function(){

        //checking to make sure you aren't already battling a pokemon

        if (opponentPicked) {
            alert("You can only fight one opponent at a time!");
        }

        else {

            //clearing any previous results text and moving the selected pokemon opponent to defenderDiv. Changing check to see if an opponent has been selected. Also changes the CSS background

            $("#resultsText").empty();
            $("#bulbasaurMoveDiv").detach().appendTo("#defenderDiv").css({"background-color":"grey","color":"white","border":"5px solid green"});
            opponentPicked = true;

            //We will use the variables opponentHP and opponentCAP for all possible pokemon opponents, so just setting them equal to bulbasaur's stats
            
            opponentHP = bulbasaurHP;
            opponentCAP = bulbasaurCAP;

            //Need to remove the div for bulbasaurCurrentHP and use the generic opponentHPtext which will be updating as you fight. Also setting up the opponentName variable

            $("#bulbasaurCurrentHP").remove();
            $(".opponentHPtext").detach().appendTo("#bulbasaurMoveDiv");
            $(".opponentHPtext").text(opponentHP);
            opponentName ="Bulbasaur";
        }
    });

    $(".opponentCharmanderDiv").on("click", function(){
        if (opponentPicked) {
            alert("You can only fight one opponent at a time!");
        }

        else {
            $("#resultsText").empty();
            $("#charmanderMoveDiv").detach().appendTo("#defenderDiv").css({"background-color":"grey","color":"white","border":"5px solid green"});
            opponentPicked = true;
            opponentHP = charmanderHP;
            opponentCAP = charmanderCAP;
            $("#charmanderCurrentHP").remove();
            $(".opponentHPtext").detach().appendTo("#charmanderMoveDiv");
            $(".opponentHPtext").text(opponentHP);
            opponentName ="Charmander";
        }
    });

    $(".opponentSquirtleDiv").on("click", function(){
        if (opponentPicked) {
            alert("You can only fight one opponent at a time!");
        }

        else {
            $("#resultsText").empty();
            $("#squirtleMoveDiv").detach().appendTo("#defenderDiv").css({"background-color":"grey","color":"white","border":"5px solid green"});
            opponentPicked = true;
            opponentHP = squirtleHP;
            opponentCAP = squirtleCAP;
            $("#squirtleCurrentHP").remove();
            $(".opponentHPtext").detach().appendTo("#squirtleMoveDiv");
            $(".opponentHPtext").text(opponentHP);
            opponentName ="Squirtle";
        }
    });

    $(".opponentPikachuDiv").on("click", function(){
        if (opponentPicked) {
            alert("You can only fight one opponent at a time!");
        }

        else {
            $("#resultsText").empty();
            $("#pikachuMoveDiv").detach().appendTo("#defenderDiv").css({"background-color":"grey","color":"white","border":"5px solid green"});
            opponentPicked = true;
            opponentHP = pikachuHP;
            opponentCAP = pikachuCAP;
            $("#pikachuCurrentHP").remove();
            $(".opponentHPtext").detach().appendTo("#pikachuMoveDiv");
            $(".opponentHPtext").text(opponentHP);
            opponentName ="Pikachu";
        }
    });

    //Creating on click functions for the attack button
    
    $(".attackButton").on("click", function(){
    
        //First check to see if an opponent has been selected

        if (opponentPicked) {

            //Then check to see if their pokemon still has HP to fight

            if (canStillFight) {

                //set up the variable for the character's current attack power and keep adding the character's base AP. Based off demo, your character attacks first, so decrease opponent HP by your current attack power

                characterCurrentAP = characterCurrentAP + characterBaseAP;
                opponentHP = opponentHP - characterCurrentAP;
                
                //Check to see if opponent is still alive. If not alive, write text that you defeated the opponent and to clear the defenderDiv area

                if (opponentHP <= 0) {
                    $("#defenderDiv").empty().append("<p class='opponentHPtext'></p>");

                    $(".opponentHPtext").empty();
                    $("#yourDamageText").empty();
                    $("#opponentDamageText").empty();
                    $("#resultsText").text("You have defeated " + opponentName + ", you can choose to fight another pokemon.")

                    //Change check so you can pick another opponent to fight, also increase opponents defeated counter

                    opponentPicked = false;
                    opponentsDefeated++;

                    //if the opponentsDefeated counter reaches 3, then you win the game since all other pokemon were defeated. Let the user know they won and create the restart button

                    if (opponentsDefeated == 3) {
                        $("#resultsText").text("You defeated Trainer Blue. You are the very best!");
                        $("#restartButtonDiv").append("<button id='restartButton'>Restart</button>");
                        $("#restartButton").on("click", function(){
                            location.reload();
                        });
                    }
                }

                //This else statement runs if the opponent still has HP

                else {

                    //Decrease your HP by opponent's counter-attack power

                    characterHP = characterHP - opponentCAP;

                    //Check to see if your pokemon still has HP. If hes, then display the damage you did and the damage they did in the appropriate text area

                    if (characterHP > 0) {
                        $(".characterHPtext").text(characterHP);
                        $(".opponentHPtext").text(opponentHP);
                        $("#yourDamageText").text("you attacked " + opponentName + " for " + characterCurrentAP + " damage.");
                        $("#opponentDamageText").text(opponentName + " attacked you back for " + opponentCAP + " damage.");
                    }

                    //Else statement that runs when your pokemon's HP is done. Change the check canStillFight to false so you can't attack anymore. Let the user know they lost and add in the restart button

                    else {
                        $(".characterHPtext").text(characterHP);
                        $(".opponentHPtext").text(opponentHP);
                        $("#yourDamageText").empty();
                        $("#opponentDamageText").empty();
                        canStillFight = false;
                        $("#resultsText").text("All your pokemon have fainted. You are no longer the best.");
                        $("#restartButtonDiv").append("<button id='restartButton'>Restart</button>");
                        $("#restartButton").on("click", function(){
                            location.reload();
                        });
                    }
                }
            }

            //Alert user if their pokemon has already fainted and to hit restart to play again

            else {
                alert("Your pokemon has already fainted. Please hit the Restart button to play again");
            }


        }

        //Alert user if no opponent is selected

        else {
            alert("Please choose an opponent before trying to attack!");
        }
    });
}

//RUN THE GAME!
pokemonGame();

})