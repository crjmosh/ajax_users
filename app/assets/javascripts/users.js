$(document).ready(function() {
	var $getUsers = $('#get-users');
	var $userForm = $('#add-user-form');
	var $userFirstName = $('#user-first-name');
	var $userLastName = $('#user-last-name');
	var $userPhoneNumber = $('#user-phone-number');
	var $firstNameShow = $('#first-name-show');
	var $lastNameShow = $('#last-name-show');
	var $phoneNumberShow = $('#phone-number-show');
	var $showBox = $('#show-box');
	var $closeShowButton = $('#close-show-button');
	var $showBoxCancel = $('#show-box-cancel');
	var BASEURL = "http://devpoint-ajax-example-server.herokuapp.com/api/v1";

	$('.flash').hide().delay(800).fadeIn(800).delay(4000).fadeOut(800)

	function loadUsers() {
		var $users = $('#users');
		$users.empty();
		$.ajax({
			type: 'GET',
			url: BASEURL + "/users",
			dataType: 'JSON'
		}).success(function(data) {
			for(var i=0; i < data.length; i++) {
				var user = data[i];
				$users.append("<div id=" + user.id + ">" + user.first_name + " " + user.last_name + " - <button class='blue btn show-user'><i class='material-icons'>visibility</i></button> <button class='orange btn edit-user'><i class='material-icons'>edit</i></button> <button class='red btn delete-user'><i class='material-icons'>delete</i></button><br /><br /></div>");
			}
		}).fail(function(data) {
			console.log(data);
		});
	};

	$getUsers.click(function() {
		loadUsers();
	})

	$userForm.submit(function(e) {
		e.preventDefault();
		var requestType, requestUrl;

		if($(this).data('user-id')) {
			requestType = 'PUT';
			requestUrl = BASEURL + '/users/' + $(this).data('user-id');
		} else {
			requestType = 'POST';
			requestUrl = BASEURL + '/users';
		};

		$.ajax({
			type: requestType,
			url: requestUrl,
			dataType: 'JSON',
			data: { user: {first_name: $userFirstName.val(),
										 last_name: $userLastName.val(),
										 phone_number: $userPhoneNumber.val()
										}}
		}).success(function(data){
			$userForm[0].reset();
			$userFirstName.focus();
			loadUsers();
		}).fail(function(data) {
			console.log(data);
		});
	});

	$(document).on('click', '.edit-user', function() {
		var userId = $(this).parent().attr('id');
		$.ajax({
			type: 'GET',
			url: BASEURL + '/users/' + userId,
			dataType: 'JSON'
		}).success(function(data) {
			$userFirstName.val(data.first_name).focus();
			$userLastName.val(data.last_name);
			$userPhoneNumber.val(data.phone_number);
			$userForm.attr('data-user-id', userId);
		}).fail(function(data) {
			console.log(data);
		});
	});

	$(document).on('click', '.delete-user', function() {
		var userId = $(this).parent().attr('id');
		$.ajax({
			type: 'DELETE',
			url: BASEURL + '/users/' + userId,
			dataType: 'JSON'
		}).success(function(data) {
			$('#' + userId).remove();
		}).fail(function(data) {
			console.log(data);
		});
	});

	$(document).on('click', '.show-user', function() {
		var userId = $(this).parent().attr('id');
		$.ajax({
			type: 'GET',
			url: BASEURL + '/users/' + userId,
			dataType: 'JSON'
		}).success(function(data){
			$firstNameShow.text(data.first_name);
			$lastNameShow.text(data.last_name);
			$phoneNumberShow.text(data.phone_number);
			$showBox.css("display", "block");
			$showBoxCancel.css("display", "block");
		}).fail(function(data) {
			console.log(data);
		})
	});

	$closeShowButton.click(function() {
		$showBox.css("display", "none");
		$showBoxCancel.css("display", "none");
	});

	$showBoxCancel.click(function() {
		$showBox.css("display", "none");
		$showBoxCancel.css("display", "none");
	});

});