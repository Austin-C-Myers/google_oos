var token;
var api_token;

if (window.location.hash) {
	token = processTokenCallback();
}

if (token) {
	document.querySelector("body").className = "token";
}

document.querySelector(".get").addEventListener("click", getCode, false);
document.querySelector(".use").addEventListener("click", useCode, false);
document.querySelector(".callApi").addEventListener("click", callApi, false);


function show(data) {
	document.querySelector(".results").textContent += JSON.stringify(data, null, 2);
	document.querySelector(".results").textContent += '\r\n';
}
function clear() {
	document.querySelector(".results").textContent = "";
}

function getCode() {
	/* Google api call
	var authorizationUrl = 'https://accounts.google.com/o/oauth2/auth';
	var client_id = '466715129981-c1va3i0evhfcfa2tjrq1qsquflhqg9hr.apps.googleusercontent.com';
	var redirect_uri = 'urn:ietf:wg:oauth:2.0:oob';
	var response_type = 'code';
	var scope = 'profile';

	var url =
		authorizationUrl + "?" +
		"client_id=" + encodeURI(client_id) + "&" +
		"redirect_uri=" + encodeURI(redirect_uri) + "&" +
		"response_type=" + encodeURI(response_type) + "&" +
		"scope=" + encodeURI(scope);// + "&" +
		//"state=" + encodeURI(state);
	window.open(url);
	*/
	
	//var authUrl = "https://sts.childrensmiraclenetworkhospitals.org/core";
	
	//window.open("https://sts.childrensmiraclenetworkhospitals.org/core/connect/authorize?client_id=1772011F-B2BD-49BD-8902-9864F24B8AFE&redirect_uri=urn%3acmnh%3amb%3aoauth%3a2.0%3aoob&response_mode=form_post&response_type=id_token&scope=openid+inflight&state=OpenIdConnect.AuthenticationProperties%3dTpFkTRU78UCmThtxinPgpEm1ROjXYYa9seG-89pYA3cqgcoXMtc21RWbB4aT2gANTQ_apHqdR-dYu2ZRHfBPo-04-vwDhdp3Uc1uoOQ5QBjAFuY_Ej_j1lJbz2WyIoHP1G4KJGpy1hU3nemflPMX1akt6b3AdZcgboLtluOKTQ5QTKwXiTOyhbeOWyCk_xNGlHSVK9fY3mWC3GSuMteE5g&nonce=635804661859099649.MjJiYjVmYmQtMDM5Ny00ZDg5LTk4NTItNjRhOThmN2Q3ZmJmODg2MTRjN2UtNGQyNy00ZTVkLWJhYjctYzBhYzBhOGE0OGZm");
	var authUrl = "https://sts.childrensmiraclenetworkhospitals.org/core/connect/authorize";
	var client_id = "1772011F-B2BD-49BD-8902-9864F24B8AFE";
	var redirect_uri = "urn:ietf:wg:oauth:2.0:oob";
	var response_type = "id_token";
	var scope = "openid inflight";
	var response_mode = "form_post";
	var SignInAsAuthenticationType = "Cookies";
	
	var url =
		authUrl + "?" +
		"client_id=" + (client_id) + "&" +
		"redirect_uri=" + (redirect_uri) + "&" +
		"response_mode=" + (response_mode) + "&" + 
		"response_type=" + (response_type) + "&" +
		"scope=" + (scope)
/*
		+ "&" +
		"state=" 
		+ "OpenIdConnect.AuthenticationProperties=TpFkTRU78UCmThtxinPgpEm1ROjXYYa9seG-89pYA3cqgcoXMtc21RWbB4aT2gANTQ_apHqdR-dYu2ZRHfBPo-04-vwDhdp3Uc1uoOQ5QBjAFuY_Ej_j1lJbz2WyIoHP1G4KJGpy1hU3nemflPMX1akt6b3AdZcgboLtluOKTQ5QTKwXiTOyhbeOWyCk_xNGlHSVK9fY3mWC3GSuMteE5g"
		+ "&" + 
		"nonce=" 
		+ "635804661859099649.MjJiYjVmYmQtMDM5Ny00ZDg5LTk4NTItNjRhOThmN2Q3ZmJmODg2MTRjN2UtNGQyNy00ZTVkLWJhYjctYzBhYzBhOGE0OGZm";
		*/
		//"SignInAsAuthenticationType=" + encodeURI(SignInAsAuthenticationType);
		
	var myData =  {
		'client_id': client_id,
		'redirect_uri': redirect_uri,
		'response_type': response_type,
		'response_mode': 'form_post',
		'scope': scope,
		//'SignInAsAuthenticationType': SignInAsAuthenticationType
	}
		
	$.support.cors = true;
		
	$.ajax({
      type: "GET",
	  contentType: "application/x-www-form-urlencoded",
      url: authUrl,
      data: myData,
      success:function(data, status, request){
		  //alert(data);
		  alert(request.getResponseHeader('Location'));
			//api_token = data["access_token"];
			//var tokenView = document.getElementById('apiToken');
			//tokenView.value = data["access_token"];
        },
		error:function (xhr, ajaxOptions, thrownError){
			//var data = xhr.responseJSON;
            //alert(data['error_description']); //throw any errors
			//alert(data);
        }
    });
	//window.open(url);
}

function useCode() {
	var authorizationUrl = 'https://www.googleapis.com/oauth2/v3/token';
	var code = document.getElementById('access_code').value;
	var client_id = '466715129981-c1va3i0evhfcfa2tjrq1qsquflhqg9hr.apps.googleusercontent.com';
	var client_secret = 'uvWvyUre4B_kAU3XB_YNRG60';
	var redirect_uri = 'urn:ietf:wg:oauth:2.0:oob';
	var grant_type='authorization_code';
	//code';
	var myData =  {
		'code': code,
		'client_id': client_id,
		'client_secret': client_secret,
		'redirect_uri': redirect_uri,
		'grant_type': grant_type
	}
	$.support.cors = true;
	//$.mobile.allowCrossDomainPages = true;
	$.ajax({
      type: "POST",
	  contentType: "application/x-www-form-urlencoded",
      url: authorizationUrl,
      data: myData,
      success:function(data){
			api_token = data["access_token"];
			var tokenView = document.getElementById('apiToken');
			tokenView.value = data["access_token"];
        },
		error:function (xhr, ajaxOptions, thrownError){
			var data = xhr.responseJSON;
            alert(data['error_description']); //throw any errors
        }
    });
}

function callApi() {
	var token_type = "Bearer ";
	var token = token_type + api_token;
	var authorizationUrl = "https://www.googleapis.com/plus/v1/people/me";
	
	
	$.ajax({
      type: "GET",
      url: authorizationUrl,
	  headers: { 'Authorization': token },
      success:function(data){
		  var displayName = document.getElementById('displayName');
		  displayName.value = data['displayName'];
        },
		error:function (xhr, ajaxOptions, thrownError){
			var data = xhr.responseJSON;
            alert(data); //throw any errors
        }
    });
	
	}

function processTokenCallback() {
	var hash = window.location.hash.substr(1);
	var result = hash.split('&').reduce(function (result, item) {
		var parts = item.split('=');
		result[parts[0]] = parts[1];
		return result;
	}, {});

	show(result);

	if (!result.error) {
		if (result.state !== localStorage["state"]) {
			show("invalid state");
		}
		else {
			localStorage.removeItem("state");
			return result.access_token;
		}
	}
}
/*
function useToken() {
	clear();

	var xhr = new XMLHttpRequest();
	xhr.onload = function (e) {
		if (xhr.status >= 400) {
			show({
				status: xhr.status,
				statusText: xhr.statusText,
				wwwAuthenticate: xhr.getResponseHeader("WWW-Authenticate")
			});
		}
		else {
			show(JSON.parse(xhr.response));
		}
	};
	xhr.onerror = function (e) {
		console.log(e, xhr);
		show({ error: "unknown http error" });
	};
	xhr.open("GET", "http://localhost:2727/identity", true);
	xhr.setRequestHeader("Authorization", "Bearer " + token);
	xhr.send();
}
*/
document.addEventListener('DOMContentReady', function () {
	document.getElementById('getToken').addEventListener('click', getToken);
	document,getElementById('useToken').addEventListener('click', useToken);
})