/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		alert('Received Event: ' + id);
    },
	
	target_url:null,
    target_url_params:{},

    handle_url_params:function() {
        params = app.target_url_params;
        if (params != null) {
            // Got your parameters - now you can do whatever you want :)
			alert("got params");
        }
		else{
			alert("no params");
		}
        // We can now "forget" the target_url
        app.target_url = null;
    },
	
	handle_url:function() {
        var params = {};
        if (app.target_url) {
            // target_url must be of the following format: prefix://something?key1=value1&key2=value2...
            var parts = app.target_url.replace(/^.+:\/\/[^?]*\?(.+)/, '$1').split('&');
            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (nv[0] && nv[1]) {
                    params[nv[0]] = nv[1];
                }
            }
        }
        app.target_url_params = params;
        if (params != null) {
            app.handle_url_params();
        }        
    }
};

app.initialize();

function processToken(url) {
	var hash = url.hash.substr(1);
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