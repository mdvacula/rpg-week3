$(document).ready(function(){
	var player;									//variable for player character
	var enemy;									//variable fo enemy character
	var wins = 0;								//win counter
	var pSelected = false;						//Boolean = has user selected a player
	var eSelected = false;						//Boolean = has user selected an enemy
	var $status = $("#gameStatus");				//Select the div to update the game status

	//Array of character objects
	var characters = [
	{
		name: "Luke Skywalker",						//Character name
		pic: "assets/images/luke.jpeg",				//Character image
		health: 100,											//character health
		AP:15 ,													//character attack points
		CAP: 25												//character counter attack points

	},
	{
		name: "Darth Vader",
		pic: "assets/images/vader.jpeg",
		health: 120,
		AP: 20,
		CAP: 30 
	},
	{
		name: "Jar Jar Binks",
		pic: "assets/images/jarjar.jpeg",
		health: 150,
		AP: 8 ,
		CAP: 40
	},
	{
		name: "Darth Sideous",
		pic: "assets/images/sidious.jpeg",
		health: 180,
		AP:25 ,
		CAP:35 
	}

	];

	//Function to process in game activity

	var calcDamage = function(){
		player.health = player.health - enemy.CAP;			//sets player health after decrementing by enemy counter attack
		enemy.health = enemy.health - player.AP;			//sets enemy health after decrementing by player attack power
		player.AP = player.AP + player.baseAP;				//increases player attack power based on base attack power
		// console.log(player.AP);			//logged new attack power for testing					
	};

	//Function to check game status
	var gameCheck = function(){						
		if(player.health <= 0){								//checks if player has health remaining
			$status.append("GAME OVER <br/>");				//if not alerts game is over
			$("#attack").attr("disabled", true);			//select the attack button and disable it if game is over
		}
		
		else if(enemy.health <= 0){							//checks for enemy health
			$("#enemy").empty();							//removes enemy from enemy div
			eSelected = false;
			$("#attack").attr("disabled",true);				//disables the attack button
			wins++																		//increments wins
			if(wins == (characters.length - 1)){								//checks if there are enemys remaining
				$status.append("YOU WIN ALL ENEMIES WERE VANQUISHED");		//displays winning message
			}
			else{																	//if there are enemys remaining
			$status.append("Enemy Defeated. Select Your Next Opponent <br/>");		//prompts user to select a new enemy	
			}
		}
		else{
			//do nothing
		}
	};
	//--------------------On page load-------------------//
	
	//loops through array and creates new div filled with character details for each character
	for(var x=0;x< characters.length; x++){
		var $newdiv = $("<div class='col-md-3 char'><h4 class='text-center'>"+ characters[x].name 
			+ "</h4><img class='img-responsive' src='"+ characters[x].pic 
			+"'alt='"+characters[x].name+"'><p class='text-center' id='health'>" 
			+ characters[x].health + "</p></div>");
		
		$newdiv.attr("charIndex", x);				//sets an attribute called charIndex to save characters index in array
		$("#characters").append($newdiv);			//appends the new div to the section is an id of characters
	}


	$("#attack").attr("disabled", true);			//sets the attack button to disabled


	//function when character is clicked
	$(".char").on("click", function(){
		$input = $(this);											//sets variable equal to character that was clicked
		
		//if player was not selected
		if(pSelected == false){
			player = characters[$input.attr("charIndex")];										//sets the users player equal to the object with the correlating index in the characters array
			player.baseAP = player.AP;																				//creates a property to store the players base attack power
			$("#player").replaceWith($input.clone().attr("id", "player"));		//replaces blank player div with the character info
			$input.remove();																									//removes character from character section
			pSelected = true;																									//sets player selected boolean to true
		}

		else if(eSelected == false){																				//checks if enemy was selected
			enemy = characters[$input.attr("charIndex")];											//sets enemy equal to the object in the correlating index of character array
			$("#enemy").replaceWith($input.clone().attr("id","enemy"));				//clones and replaces the enemy div with the character	
			$input.remove();																									//removes the character from the characters section
			eSelected = true;																									//sets enemy selected boolean to true
			$("#attack").attr("disabled", false);															//allows attack button to be pressed
		}

		else{
			//do nothing
		}

		// console.log(player);		//log players for testing
		// console.log(enemy);
	});

	//function for attack click 
	$("#attack").on("click", function(){
		if(pSelected == true && eSelected == true){					//makes sure player and enemy are selected
			$status.append(player.name + " Attacked " + enemy.name + " for " + player.AP + " damage. <br/>");						//displays names of characters and damage from player
			$status.append(enemy.name + " Counter Attacked " + player.name +  " for " + enemy.CAP + " damage. <br/>");	//displays counter attack info
			calcDamage();																																							//calculates damage dealt
			$("#player").children("#health").html(player.health);																			//updates player health by selecting child of div with matching id 
			$("#enemy").children("#health").html(enemy.health);																				//updates enemy health by selecting child of div with matching id
			gameCheck();																																							//checks status of game
		}
	});

});