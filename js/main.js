var last_number = 0;
var last_operator = 0;
var display_string = "0";
var operator_break = false;
var dot_used = false;

$(document).ready( function(){
	$('#display').val( display_string);
	$(".btn").click( function( e){
		var c = $(this).text();
		console.log( c);
		if( c.match( /[0-9]/)){
			if( display_string === "0" || operator_break){
				display_string = "";
			}
			display_string += c;
			operator_break = false;
		} else {
			switch( c){
				case 'CE':
					display_string = "0";
					dot_used = false;
					break;
				case '.':
					if( !dot_used){
						if( operator_break || display_string.length === 0){
							display_string = "0";
						}
						display_string += c;
					}
					dot_used = true;
					// in case '.' is pressed first
					operator_break = false;
					break;
				case '=':
					operator_break = true;
					if( last_operator){
						calc();
						last_number = 0;
						last_operator = 0;
					}
					dot_used = false;
					break;
				case '+':
				case '-':
				case '*':
				case '/':
					operator_break = true;
					if( last_operator && last_number){
						calc();
					}
					last_number = display_string;
					last_operator = c;
					dot_used = false;
					break;
			}
		}
		$('#display').val( display_string);
	});
	function calc(){
		var str = last_number+last_operator+display_string;
		ans = eval( str);
		display_string = ans;
		console.log( "str[%s] ans[%d]", str, ans);
	}
});