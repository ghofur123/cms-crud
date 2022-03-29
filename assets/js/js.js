function sdfsLoadDataAll() {
	let sdfsDataResult = '';
	$.ajax({
		type: 'POST',
		url: '',
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		dataType: 'json',
		data: '',
		beforeSend: function() {},
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				sdfsDataResult += data[i]['sdf'];
				sdfsDataResult += data[i]['sdfd'];
				sdfsDataResult += "<button type='button' data='" + data[i]['uniq_sdfs'] + " class='btn-sdfs-form-edit'>Edit</button>"
				sdfsDataResult += "<button type='button' data='" + data[i]['uniq_sdfs'] + " class='btn-sdfs-form-delete'>Delete</button> <br />"
			}
			$('.class-sdfs-view-data').html(sdfsDataResult);
		}
	}).done(function() {});
}
$(document).on('click', '.btn-sdfs-form-edit', function() {
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
			usersDataResult += "<form action='#' class='form-edit-sdfs-1648559146488' >" + 
                "<input type='text' name='uniq_sdfs' class='uniq_sdfs' value='" + data[0]['uniq_sdfs'] + "' />" + 
                "<input type='text' name='sdf' class='sdf' placeholder='sdf' value='" + data[0]['sdf'] + "'/>" + 
                "<input type='text' name='sdfd' class='sdfd' placeholder='sdfd' value='" + data[0]['sdfd'] + "'/>" + 
                "<button type='submit' class='btn-sdfs-edit-class'>Simpan</button>" + 
            "</form>";
			$('.class-sdfs-view-edit-data').html(usersDataResult);
		}
	}).done(function() {});
});
$('.form-sdfs-1648559146488').submit(function() {
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