// Renvoi a Number if the field value is a number otherwise return NaN
filterInt = function(value) {
	if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
		return Number(value);
	} else {
		return NaN;
	}
};

isValidUrl = function(url) {
	var urlregex = new RegExp('^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$');
	if (urlregex.test(url)) {
		return url;
	} else {
		return null;
	}
};

getFullName = function(obj) {
	var fullName = '';
	if (obj.firstName === undefined && obj.lastName === undefined) {
		return fullName;
	} else if (obj.lastName === undefined) {
		fullName = obj.firstName;
		return fullName;
	} else if (obj.firstName === undefined) {
		fullName = obj.lastName;
		return fullName;
	} else {
		fullName = obj.firstName + ' ' + obj.lastName;
		return fullName;
	}
};

getAuthors = function(list) {
	var author = '';
	if (list.length === 0) {
		return author;
	} else if (list.length === 1) {
		author = getFullName(list[0]);
		return author;
	} else {
		for (var i = 0; i < list.length; i++) {
			if (i === 0) {
				author = author.concat(getFullName(list[i]));
			} else {
				author = author.concat(' & ', getFullName(list[i]));
			}
		}
		return author;
	}
};
