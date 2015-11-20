//工具
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth()+1));
	str = str.replace(/M/g, this.getMonth());

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}

mui.createUploadMask = function(callback) {
	var element = document.createElement('div');
	element.classList.add('upload-file');
	element.innerHTML = "<meter id='upLoadProgress' style='width:80%;margin:50% 10%;' value='50' max='100'></meter>";
	element.addEventListener('touchmove', mui.preventDefault);
	element.addEventListener('tap', function() {
		mask.close();
	});
	var mask = [element];
	mask._show = false;
	mask.show = function() {
		mask._show = true;
		element.setAttribute('style', 'opacity:1');
		document.body.appendChild(element);
		return mask;
	};
	mask._remove = function() {
		if (mask._show) {
			mask._show = false;
			element.setAttribute('style', 'opacity:0');
			mui.later(function() {
				var body = document.body;
				element.parentNode === body && body.removeChild(element);
			}, 350);
		}
		return mask;
	};
	mask.close = function() {
		if (callback) {
			if (callback() !== false) {
				mask._remove();
			}
		} else {
			mask._remove();
		}
	};
	return mask;
};

mui.createTipDialog = function(info, callBack) {
	var template = "<div style='width:80%;margin:50% 10%;border:1px solid #ddd;background-color: white;border-radius: 5px;'><div style='margin-top:20px;margin-left:20px;'>提示信息</div><hr/><div style='margin-top:20px;margin-left:20px;margin-bottom:20px;margin-right:20px;height:60px;'>{{info}}</div></div>";
	var element = document.createElement('div');
	element.classList.add('dialog');
	element.innerHTML = template.replace('{{info}}', info);
	element.addEventListener('touchmove', mui.preventDefault);
	element.addEventListener('tap', function() {
		mask.close();
	});
	var mask = [element];
	mask._show = false;
	mask.show = function() {
		mask._show = true;
		element.setAttribute('style', 'opacity:1');
		document.body.appendChild(element);
		return mask;
	};
	mask._remove = function() {
		if (mask._show) {
			mask._show = false;
			element.setAttribute('style', 'opacity:0');
			mui.later(function() {
				var body = document.body;
				element.parentNode === body && body.removeChild(element);
			}, 350);
		}
		return mask;
	};
	mask.close = function() {
		if (callBack) {
			callBack();
		}
		mask._remove();
	};
	return mask;
};

mui.createConfirmDialog = function(info, cancelCallBack, acceptCallBack) {
	var template = "<div style='width:80%;margin:50% 10%;border:1px solid #ddd;background-color: white;border-radius: 5px;'><div style='margin-top:20px;margin-left:20px;'>提示信息</div><hr/><div style='margin-top:20px;margin-left:20px;margin-bottom:20px;margin-right:20px;height:60px;'>{{info}}</div><div style='text-align:right;margin-bottom:20px;margin-right:20px;'><a id='createConfirmDialog_cancel' href='javascript:void(0);' style='margin-right:20px;text-decoration:none;'>取消</a><a id='createConfirmDialog_accept' href='javascript:void(0);' style='text-decoration:none;'>确定</a></div></div>";
	var element = document.createElement('div');
	element.classList.add('dialog');
	element.innerHTML = template.replace('{{info}}', info);
	element.addEventListener('touchmove', mui.preventDefault);
	var mask = [element];
	mask._show = false;
	mask.show = function() {
		mask._show = true;
		element.setAttribute('style', 'opacity:1');
		document.body.appendChild(element);
		document.getElementById('createConfirmDialog_cancel').addEventListener('tap', function() {
			if (cancelCallBack) cancelCallBack();
			mask.close();
		});
		document.getElementById('createConfirmDialog_accept').addEventListener('tap', function() {
			if (acceptCallBack) acceptCallBack();
			mask.close();
		});
		return mask;
	};
	mask._remove = function() {
		if (mask._show) {
			mask._show = false;
			element.setAttribute('style', 'opacity:0');
			mui.later(function() {
				var body = document.body;
				element.parentNode === body && body.removeChild(element);
			}, 350);
		}
		return mask;
	};
	mask.close = function() {
		mask._remove();
	};
	return mask;
};

//全局共用
var invoiceTypePicker = new mui.PopPicker();
invoiceTypePicker.setData([{
	value: 'ywj',
	text: '董事长 叶文洁'
}, {
	value: 'aaa',
	text: '总经理 艾AA'
}]);

//初始化mui
mui.init();
var viewApi = mui('#app').view({
	defaultPage: '#mainpage'
});
mui('.mui-scroll-wrapper').scroll();
var view = viewApi.view;
var oldBack = mui.back;
mui.back = function() {
	if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
		viewApi.back();
	} else { //执行webview后退
		oldBack();
	}
};

//首页功能按钮事件处理，主要用于初始化子页面相关数据
document.getElementById('piaojuluru_main_menu').addEventListener('tap', function() {
	mui.initPreviewImage();
	mui.previewImage({
		isUpload: true
	});
})
document.getElementById('fapiaoshenhe_main_menu').addEventListener('tap', function() {
	mui.initPreviewImage();
	mui.previewImage({
		isUpload: false
	});
})
document.getElementById('shenhezhongfapiao_main_menu').addEventListener('tap', function() {
	//alert(333);
})
document.getElementById('yishenhefapiao_main_menu').addEventListener('tap', function() {
	//alert(333);
})
document.getElementById('quanbufapiao_main_menu').addEventListener('tap', function() {
	//alert(333);
})
document.getElementById('fapiaosaixuan_main_menu').addEventListener('tap', function() {
	//alert(333);
})

//发票录入
function getImageDataURL(img) {
	var canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	var context = canvas.getContext('2d');
	context.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL('image/png');
	return dataURL;
}
var imgURL;
document.getElementById('sliderSegmentedControl').style.width = document.body.offsetWidth - 100 + 'px';
document.getElementById("fapiaoluru_addInvoiceImage").onchange = function(event) {
	var imageRootNode = document.getElementById('fapiaoluru_image');
	if (imageRootNode.innerHTML.indexOf('img') == -1) imageRootNode.innerHTML = '';
	var imgEle = document.createElement('img');
	imgEle.style.marginLeft = '5px';
	imgEle.style.borderRadius = '5px';
	imgEle.style.width = '70px';
	imgEle.style.height = '70px';
	imgEle.setAttribute('data-preview-group', '1');
	imgEle.setAttribute('data-preview-src', '');
	imageRootNode.appendChild(imgEle);
	var files = event.target.files,
		file;
	if (files && files.length > 0) {
		file = files[0];
		try {
			var URL = window.URL || window.webkitURL;
			imgURL = URL.createObjectURL(file);
			imgEle.src = imgURL;
			invoiceList[imgURL] = document.getElementById('fapiaoluru_addInvoiceImage').files[0];
			//URL.revokeObjectURL(imgURL);
		} catch (e) {
			try {
				var fileReader = new FileReader();
				fileReader.onload = function(event) {
					imgEle.src = event.target.result;
					invoiceList[imgEle.src] = document.getElementById('fapiaoluru_addInvoiceImage').files[0];
				};
				fileReader.readAsDataURL(file);
			} catch (e) {
				alert("Neither createObjectURL or FileReader are supported");
			}
		}
	}
}
document.getElementById('fapiaoluru_amount_input_sub').onchange = function(event) {
	document.getElementById('fapiaoluru_amount').innerHTML = event.target.value.replace(/\b(0+)/gi,"");
};
var currentDate = new Date();
var currentInvoiceTypeId;
currentDate = currentDate.Format("yyyy-MM-DD");
document.getElementById('fapiaoluru_date').innerText = currentDate;
var options = {
	'type': 'date',
	'value': currentDate
};
var datePicker = new mui.DtPicker(options);
document.getElementById('fapiaoluru_date_li').addEventListener('tap', function() {
	datePicker.show(function(rs) {
		document.getElementById('fapiaoluru_date').innerText = rs.text;
	});
}, false);
document.getElementById('fapiaoluru_type_li').addEventListener('tap', function(event) {
	invoiceTypePicker.show(function(items) {
		document.getElementById('fapiaoluru_type').innerText = items[0].text;
		currentInvoiceTypeId = items[0].value;
	});
}, false);
document.getElementById('fapiaoluru_submit').addEventListener('tap', function(event) {
	var invoiceAmount = document.getElementById('fapiaoluru_amount').innerText;
	var invoiceType = document.getElementById('fapiaoluru_type').innerText;
	var invoiceDate = document.getElementById('fapiaoluru_date').innerText;
	var isEmpty = true;
	for (var jsonKey in invoiceList) {
		isEmpty = false;
		break;
	}
	if (isEmpty) {
		mui.createTipDialog('您还没有添加发票图像!',null).show();
		return;
	}
	if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
		mui.createTipDialog('您还没有输入发票金额!',null).show();
		return;
	}
	if (invoiceType == "选择发票类型") {
		mui.createTipDialog('您还没有选择发票类型!',null).show();
		您还没有输入发票金额
		return;
	}
	var mask = mui.createUploadMask(false);
	mask.show();
	var formData = {};
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	for (var jsonKey in formData) {
		fd.append(jsonKey, formData[jsonKey]);
	}
	var fileIndex = 0;
	for (var jsonKey in invoiceList) {
		fd.append("file" + fileIndex, invoiceList[jsonKey]);
		fileIndex++;
	}
	xhr.upload.addEventListener("progress", function(evt) {
		if (evt.lengthComputable) {
			var percentComplete = Math.round(evt.loaded * 100 / evt.total) * 100;
			document.getElementById('upLoadProgress').value = percentComplete;
		}
	}, false);
	xhr.addEventListener("load", function(evt) {
		var res = evt.target.responseText;
		if (res.error_code == '0') {
			mui.createTipDialog('发票提交成功!',null).show();
			invoiceList = {};
			document.getElementById('fapiaoluru_amount').innerText = '0';
			document.getElementById('fapiaoluru_type').innerText = '选择发票类型';
			document.getElementById('fapiaoluru_date').innerText = currentDate;
			var imgList = document.getElementById('fapiaoluru_image').childNodes;
			for (var i = 0; i < imgList.length; i++) {
				document.getElementById('fapiaoluru_image').removeChild(imgList[i]);
			}
			document.getElementById('fapiaoluru_image').innerHTML = '<p style="margin-top: -5px;margin-left: 10px;">票据图像</p>';
		} else {
			mui.createTipDialog('发票提交失败!，请稍后重试',null).show();
		}
		mask.close();
	}, false);
	xhr.addEventListener("error", function(evt) {
		mui.createTipDialog('发票提交失败!，请稍后重试',null).show();
		mask.close();
	}, false);
	xhr.addEventListener("abort", null, false);
	xhr.open("POST", "http://139.196.23.131:8080/user/uploadifyTest_doUpload");
	xhr.send(fd);
}, false);

//发票审核
var deceleration = mui.os.ios ? 0.003 : 0.0009;
mui('.mui-scroll-wrapper').scroll({
	bounce: false,
	indicators: true, //是否显示滚动条
	deceleration: deceleration
});
mui(mui('#fapiaoshenhe_pullrefresh')[0]).pullToRefresh({
	down: {
		callback: function() {
			var self = this;
			setTimeout(function() {
				self.endPullDownToRefresh();
			}, 2000);
		}
	}
});
mui('#OA_task_2').on('slideleft', '.mui-table-view-cell', function(event) {
	var elem = this;
	var confirmDialog = mui.createConfirmDialog('您确定要删除吗？',
		function() {
			confirmDialog.close();
			setTimeout(function() {
				mui.swipeoutClose(elem);
			}, 0);
		},
		function() {
			confirmDialog.close();
			elem.parentNode.removeChild(elem);
		}
	);
	confirmDialog.show();
});
mui('#OA_task_2').on('slideright', '.mui-table-view-cell', function(event) {
	var elem = this;
	var confirmDialog = mui.createConfirmDialog('您确定要删除吗？',
		function() {
			confirmDialog.close();
			setTimeout(function() {
				mui.swipeoutClose(elem);
			}, 0);
		},
		function() {
			confirmDialog.close();
			elem.parentNode.removeChild(elem);
		}
	);
	confirmDialog.show();
});

//发票筛选
var fapiaoshaixuan_end_date = new Date();
var fapiaoshaixuan_invoice_type_id;
fapiaoshaixuan_end_date = fapiaoshaixuan_end_date.Format("yyyy-MM-DD");
var fapiaoshaixuan_start_date = fapiaoshaixuan_end_date.substr(0, fapiaoshaixuan_end_date.lastIndexOf('-')) + '-01';;
document.getElementById('fapiaosaixuan_start_date').innerText = fapiaoshaixuan_start_date;
document.getElementById('fapiaosaixuan_end_date').innerText = fapiaoshaixuan_end_date;
document.getElementById('fapiaoluru_date').innerText = currentDate;
var fapiaosaixuan_start_options = {
	'type': 'date',
	'value': fapiaoshaixuan_start_date
};
var fapiaosaixuan_end_options = {
	'type': 'date',
	'value': fapiaoshaixuan_end_date
};
var fapiaoshaixuan_start_date_picker = new mui.DtPicker(fapiaosaixuan_start_options);
var fapiaoshaixuan_end_date_picker = new mui.DtPicker(fapiaosaixuan_end_options);
document.getElementById('fapiaosaixuan_start_date_click').addEventListener('tap', function() {
	fapiaoshaixuan_start_date_picker.show(function(rs) {
		document.getElementById('fapiaosaixuan_start_date').innerText = rs.text;
	});
}, false);
document.getElementById('fapiaosaixuan_end_date_click').addEventListener('tap', function() {
	fapiaoshaixuan_end_date_picker.show(function(rs) {
		document.getElementById('fapiaosaixuan_end_date').innerText = rs.text;
	});
}, false);
document.getElementById('fapiaosaixuan_type_click').addEventListener('tap', function(event) {
	invoiceTypePicker.show(function(items) {
		document.getElementById('fapiaosaixuan_type').innerText = items[0].text;
		fapiaoshaixuan_invoice_type_id = items[0].value;
	});
}, false);
document.getElementById('fapiaosaixuan_search_click').addEventListener('tap', function(event) {
	mui.createTipDialog('未完成!',null).show();
}, false);