var xhr = new XMLHttpRequest();

function uploadFile(fileList, formData) {
	var fd = new FormData();
	for (var jsonKey in formData) {
		fd.append(jsonKey, formData[jsonKey]);
	}
	fd.append("fileName", document.getElementById('fileName').files[0]);

	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);

	xhr.open("POST", "/user/uploadifyTest_doUpload");
	xhr.send(fd);
}

function cancleUploadFile() {
	xhr.abort();
}
function uploadProgress(evt) {
	if (evt.lengthComputable) {
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
	} else {
		document.getElementById('progressNumber').innerHTML = 'unable to compute';
	}
}
//上传成功响应
function uploadComplete(evt) {
	//服务断接收完文件返回的结果
	alert(evt.target.responseText);
}
//上传失败
function uploadFailed(evt) {
	alert("上传失败");
}
//取消上传
function uploadCanceled(evt) {
	alert("您取消了本次上传.");
}