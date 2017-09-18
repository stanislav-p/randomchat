;(function() {
	'use strict';

	let users = [];

	//Generate random user from 'randomuser.me'
	function generateUser() {
		let url = 'https://randomuser.me/api';

		fetch(url)
			.then( response => response.json() )
			.then( data => addUser( data.results[0] ) )
			.catch( err => console.log(err) );
	}

	//Generate random message from 'randomtext.me'
	function generateMessage() {
		let url = 'https://www.randomtext.me/api/gibberish/p-1/3-50';

        fetch(url)
			.then( response => response.json() )
			.then( data => addMessage( randomUser(), data.text_out ) )
			.catch( err => console.log(err) );
	}


	//Adding our new users to DOM
	function addUser(user) {
		users.push(user);

		let user_list = document.getElementById('users');

		let newUser = document.createElement('div');
			newUser.className = 'user';

		let div_img = newUser.appendChild( document.createElement('div') );
			div_img.className = 'user_img';

		let img = div_img.appendChild( document.createElement('img') );
			img.setAttribute('src', user.picture.thumbnail);

		let div_info = newUser.appendChild( document.createElement('div') );
			div_info.className = 'user_info';

		let name = div_info.appendChild( document.createElement('p') );
			name.className = 'user_name';
			name.innerHTML = user.name.first + ' ' + user.name.last;

		let location = div_info.appendChild( document.createElement('p') );
			location.className = 'user_location';
			location.innerHTML = user.location.state + ', ' + user.location.city;

		user_list.appendChild(newUser);
	}

	//Adding our new message to DOM
	function addMessage(user, message) {
		let now = new Date();
		let hours = round( now.getHours() );
		let minutes = round( now.getMinutes() );

		let chat = document.getElementById('chat');

		let newMessage = document.createElement('div');
			newMessage.className = 'message';

		let chat_info = newMessage.appendChild( document.createElement('div') );
			chat_info.className = 'user_chat';

		let div_img = chat_info.appendChild( document.createElement('div') );
			div_img.className = 'user_img';

		let img = div_img.appendChild( document.createElement('img') );
			img.setAttribute('src', user.picture.thumbnail);

		let div_info = chat_info.appendChild( document.createElement('div') );
			div_info.className = 'user_info';

        let time = chat_info.appendChild( document.createElement('p') );
			time.className = 'message_time';
			time.innerHTML = hours + ':' + minutes;

		let name = div_info.appendChild( document.createElement('p') );
			name.className = 'user_name';
			name.innerHTML = user.name.first + ' ' + user.name.last;

		let text = newMessage.appendChild( document.createElement('div') );
			text.className = 'user_text';
			text.innerHTML = message;

		chat.appendChild(newMessage);
		chat.scrollTop = chat.scrollHeight; //Scrolling to the bottom
		play(); //Playing the sound
	}

	// ADDITIONAL FUNCTIONS

	//Function for generate message from random user
	function randomUser() {
		return users[ Math.floor( Math.random() * users.length ) ];
	}

	function randomText(min, max) {
		return Math.floor( min + Math.random() * (max + 1 - min) );
	}

	//Function for rounding our time to normal view
	function round(value) {
		return value < 10 ? '0' + value : value;
	}

	//Function for playing a sound when new message is shown
	function play() {
		var audio = new Audio('assets/sound/notification.mp3');
		audio.play();
	}

	//Function for clearing a chat
	function clearChat() {
		let chat = document.getElementById('chat');
		chat.innerHTML = '';
	}

	//Events

	setInterval(generateMessage, randomText(5000, 10000));

	//Adding new user when we click on the button
	let add_new_user = document.getElementById('add_btn');
	add_new_user.addEventListener('click', generateUser);

	//Clearing the chat when we click on the button
	let clear_chat = document.getElementById('clear_chat_btn');
	clear_chat.onclick = function() {
		let answer = confirm('Do you want to clear chat?');

		if (answer == true) {
			clearChat();
		}
	}

    generateUser();
    generateUser();

} ());