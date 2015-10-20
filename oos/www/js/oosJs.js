
document.querySelector(".redirect").addEventListener("click", redirect, false);

function redirect() {
	var authUrl = "https://sts.childrensmiraclenetworkhospitals.org/core/connect/authorize";
	var client_id = "1772011F-B2BD-49BD-8902-9864F24B8AFE";
	var redirect_uri = "urn:ietf:wg:oauth:2.0:oob";
	var httpRedirectUri = "urn%3acmnh%3amb%3aoauth%3a2.0%3aoob";
	var response_type = "id_token";
	var scope = "openid inflight";
	var httpScope = "openid+inflight";
	var response_mode = "form_post";
	var randState = "OpenIdConnect.AuthenticationProperties%3" + randomString("dzASaOVWGJoNmvETksMXG6gGMgQXItkPd3FQZ_2rWgpSRlbJqtLlKHY7Z7lBRsuAkc0Thubylc1gWDA_i2UsSa5fd3OiXfiyIhPYODJboySyHknoOTmVM_-sK3voVYbXBb8AtFWfuef_Uw6f8k7SxnDqIfjMbCWdBYHCi8_dtZln-MYXKduJ0xsigpsf45p0gGKKTULPM-5GReKNgEKlSFg".length, "multiple");
	var randNonce = randomString(18, "numbers") + "." + randomString("MGM1Y2NzQtYjkyYi00YjQ0LWI5555tMmYyMmIyDNhNGFmYTFiOWQ1ZGMtZTRiNi00ZWViLThhMDQtNDljNmRlODc5ZjA2".length, "multiple");
	
	window.open(
			authUrl
		 + "?client_id=" + client_id
		 + "&redirect_uri=" + httpRedirectUri
		 + "&response_mode=" + response_mode
		 + "&response_type=" + response_type
		 + "&scope=" + httpScope
		 + "&state=" + randState
		 + "&nonce=" + randNonce
	 );
}

function randomString(length, type) {
    var text = "";
	var error = {
		'error': type + " not valid option"
	};
    var possible;
	if (type == "numbers")
		possible = "0123456789";
	else if (type == "multiple")
		possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	else
		return error;
	
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}