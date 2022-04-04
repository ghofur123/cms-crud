function sadLoadDataAll() {
	let sadDataResult = '';
	$.ajax({
		type: 'POST',
		url: '',
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		dataType: 'json',
		data: '',
		beforeSend: function() {},
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				sadDataResult += data[i]['asd'];
				sadDataResult += data[i]['asd'];
				sadDataResult += "<button type='button' data='" + data[i]['uniq_sad'] + " class='btn-sad-form-edit'>Edit</button>"
				sadDataResult += "<button type='button' data='" + data[i]['uniq_sad'] + " class='btn-sad-form-delete'>Delete</button> <br />"
			}
			$('.class-sad-view-data').html(sadDataResult);
		}
	}).done(function() {});
}
$(document).on('click', '.btn-sad-form-edit', function() {
	let dataId = $(this).attr('data');
	console.log(dataId);
	let usersDataResult = '';
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/cobaframework/users_api/load?act=load&where_parameter=1&uniq_users=' + dataId,
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		dataType: 'json',
		data: '',
		beforeSend: function() {},
		success: function(data) {
			usersDataResult += "<form action='#' class='form-edit-sad-1648559304402' >" + "<input type='text' name='uniq_sad' class='uniq_sad' value='" + data[0]['uniq_sad'] + "' />" + "<input type='text' name='asd' class='asd' placeholder='asd' value='" + data[0]['asd'] + "'/>" + "<input type='text' name='asd' class='asd' placeholder='asd' value='" + data[0]['asd'] + "'/>" + "<button type='submit' class='btn-sad-edit-class'>Simpan</button>" + "</form>";
			$('.class-sad-view-edit-data').html(usersDataResult);
		}
	}).done(function() {});
});
$('.form-sad-1648559304402').submit(function() {
	$.ajax({
		type: 'POST',
		url: 'linkkkkkknya?act=insert',
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		dataType: 'json',
		data: $(this).serialize(),
		beforeSend: function() {},
		success: function(data) {
			if (data[0]['status'] == 1) {
				console.log(data[0]['message']);
			} else if (data[0]['status'] == 2) {
				console.log(data[0]['message']);
			}
		}
	}).done(function() {});
	return false;
});