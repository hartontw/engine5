
//////////
// Math //
//////////
Math.roundTo = function(value, precision) {
	precision = Math.pow(10, precision);
	return Math.round(value*precision) / precision;
};

