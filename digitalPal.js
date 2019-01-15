function DigitalPal() {
	this.hungry = false;
	this.sleepy = false;
	this.bored = true;
	this.age = 0;
	this.feed = () => {
		if (this.hungry) {
			console.log("That was yummy!")
			this.hungry = false;
			this.sleepy = true;
		} else {
			console.log("No thanks! I'm full.")
		}
	};
	this.sleep = () => {
		if (this.sleepy) {
			console.log("ZzzzZZZzzz");
			this.sleepy = false;
			this.increaseAge();
		} else {
			console.log("No way! I'm not tired.");
		}
	};
	this.play = () => {
		if (this.bored) {
			console.log("Yay! Let's play!");
			this.bored = false;
			this.hungry = true;
		} else {
			console.log("Not right now. Later?");
		}
	};
	this.increaseAge = () => {
		this.age += 1;
		console.log("Happy Birthday to me! I am " + this.age + " day old!")
	}
};

var dog = new DigitalPal();
dog.outside = false;
dog.bark = () => {
	console.log("Woof! Woof!");
};
dog.goOutside = () => {
	if (!dog.outside) {
		console.log("Yay! I love the outdoors!");
		dog.outside = true;
		dog.bark();
	} else {
		console.log("We're already outside though...");
	}
};
dog.goInside = () => {
	if (dog.outside) {
		console.log("Do we have to? Fine...");
		dog.outside = false;
	} else {
		console.log("I'm already inside...");
	}
};

var cat = new DigitalPal();
cat.houseCondition = 100;
cat.meow = () => {
	console.log("Meow! Meow!");
};
cat.destroyFurniture = () => {
	if (cat.houseCondition > 0) {
		cat.houseCondition -= 50;
		console.log("MUAHAHAHAHAHA! TAKE THAT FURNITURE!");
		cat.bored = false;
		cat.sleepy = true;
	} else {
		console.log("Bummer! There's nothing left to destroy!");
	}
};
cat.buyNewFurniture = () => {
	cat.houseCondition += 50;
	console.log("Maybe you should just get a new cat instead.");
};


var animal = process.argv[2];
var action = process.argv[3];

var inquirer = require("inquirer");

function play() {


	inquirer.prompt([
		{
			type: "list",
			message: "Which DigiPal do you want to play with?",
			choices: ["Dog", "Cat"],
			name: "animal"
		},
	])
		.then(function (animalResponse) {
			if (animalResponse.animal === "Dog") {
				inquirer.prompt([
					{
						type: "list",
						message: "What would you like to do with your dog?",
						choices: ["Bark", "Feed", "Sleep", "Play", "Go Outside", "Go Inside"],
						name: "actions"
					},
				])
					.then(function (actionResponse) {
						switch (actionResponse.actions) {
							case "Bark":
								dog.bark();
								break;
							case "Feed":
								dog.feed();
								break;
							case "Sleep":
								dog.sleep();
								break;
							case "Play":
								dog.play();
								break;
							case "Go Outside":
								dog.goOutside();
								break;
							case "Go Inside":
								dog.goInside();
								break;
						};
						// prompt to start over?
						inquirer.prompt([
							{
								type: "confirm",
								message: "Would you like to do something else?",
								name: "confirm",
								default: true
							},
						])
							.then(function (confirmResponse) {
								if (confirmResponse.confirm) {
									play();
								} else {
									console.log("Come play again!")
								}
							});
					});
			} else {
				// start of if cat.
				inquirer.prompt([
					{
						type: "list",
						message: "What would you like to do with your cat?",
						choices: ["Meow", "Feed", "Sleep", "Play", "Destroy Furniture", "Buy New Furniture"],
						name: "actions"
					},
				])
					// End of if dog.
					.then(function (actionResponse) {
						console.log(actionResponse.actions);
						switch (actionResponse.actions) {
							case "Meow":
								cat.meow();
								break;
							case "Feed":
								cat.feed();
								break;
							case "Sleep":
								cat.sleep();
								break;
							case "Play":
								cat.play();
								break;
							case "Destroy Furniture":
								console.log(cat.houseCondition);
								cat.destroyFurniture();
								break;
							case "Buy New Furniture":
								cat.buyNewFurniture();
								break;
						};
						// prompt to start over?
						inquirer.prompt([
							{
								type: "confirm",
								message: "Would you like to do something else?",
								name: "confirm",
								default: true
							},
						])
							.then(function (confirmResponse) {
								if (confirmResponse.confirm) {
									play();
								} else {
									console.log("Come play again!")
								}
							});
					});
			}
		});
	// end of play function
};

play();