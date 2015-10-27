      var token;
	  var win;
	  
	  function handleOpenURL(url) {
		//alert("received url: " + url);
		processToken(url);
		}

        if (window.location.hash) {
            token = processTokenCallback();
        }

        if (token) {
            document.querySelector("body").className = "token";
        }

        document.querySelector(".get").addEventListener("click", getToken, false);
        document.querySelector(".use").addEventListener("click", useToken, false);

        function show(data) {
            document.querySelector(".results").textContent += JSON.stringify(data, null, 2);
            document.querySelector(".results").textContent += '\r\n';
        }
        function clear() {
            document.querySelector(".results").textContent = "";
        }

        function getToken() {
            var authorizationUrl = 'https://sts.childrensmiraclenetworkhospitals.org/core/connect/authorize';
            var client_id = '1772011F-B2BD-49BD-8902-9864F24B8AFE';
            var redirect_uri = 'urn:cmnh:mb:oauth:2.0:oob';
			//var redirect_uri = "http://localhost:37643/";
            var response_type = "id_token";
            var scope = "openid inflight";
            var state = Date.now() + "" + Math.random();
			var response_mode = "fragment";

            localStorage["state"] = state;

            var url =
                authorizationUrl + "?" +
                "client_id=" + encodeURI(client_id) + "&" +
                "redirect_uri=" + encodeURI(redirect_uri) + "&" +
                "response_type=" + encodeURI(response_type) + "&" +
				"response_mode=" + encodeURI(response_mode) + "&" +
                "scope=" + encodeURI(scope) + "&" +
                "state=" + encodeURI(state) + "&" +
                "nonce=" + encodeURI(state);
            window.location = url;
			//win = window.open(url);
			/*
			win.addEventListener( "loadstop", function() {
				win.executeScript(
					{ code: "document.title" },
					function( values ) {
						token = values[ 0 ];
					}
				);
				*/
        }

        function processTokenCallback() {
            var hash = window.location.hash.substr(1);
            var result = hash.split('&').reduce(function (result, item) {
                var parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
			
			var id_token = result["id_token"];		
			var header = JSON.parse(atob(id_token.split('.')[0]));
            var token = JSON.parse(atob(id_token.split('.')[1]));  


            show(token);

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