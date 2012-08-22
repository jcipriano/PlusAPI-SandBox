(function() {
  
  var root = this;
  
  var Plus = root.Plus = { };
  
  Plus.authConfig = {
    clientId: '966100401272-jj83p83m37vfcj6r548p9od90gg1ecq4.apps.googleusercontent.com',
    apiKey: 'AIzaSyDfc8bj4Iy5ViT6dsrZj0TacE4yQZ4OvXc',
    scopes: 'https://www.googleapis.com/auth/plus.me'
  };
  
  Plus.init = function(authConfig, callback) {
    
    console.log('Plus.init');
    
    Plus.initComplete = callback;
    
    if(authConfig) {
      Plus.authConfig = authConfig;
    }
    
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', 'https://apis.google.com/js/client.js?onload=googlePlusApiOnLoad');
    document.body.appendChild(scriptTag);
  };
  
  Plus._setApiKey = function() {
    
    console.log('Plus._setApiKey');
    
    gapi.client.setApiKey(Plus.authConfig.clientId);
    
    if(Plus.initComplete) {
      Plus.initComplete();
    }
  };
  
  Plus._onAuthCheckComplete = function(authResult) {
    
    var authed = authResult && !authResult.error;
    
    if (authed) {
      console.log('Plus._onAuthCheckComplete: User is authenticated.', authResult);
    }else{
      console.log('Plus._onAuthCheckComplete: User not authenticated.', authResult);
    }
    
    return authed;
  };
  
  Plus.authorize = function(callback) {
    
    console.log('Plus.authorize');
    
    gapi.auth.authorize({ client_id: Plus.authConfig.clientId, scope: Plus.authConfig.scopes, immediate: false }, function(authResult) {

      callback(Plus._onAuthCheckComplete(authResult));
      
    });
  };
  
  Plus.getMe = function(callback) {
    
    console.log('Plus.getMe');
    
    gapi.client.plus.people.get({
      'query': 'me',
      'orderBy': 'best'
    }).execute(function(response) {
      callback(response);
    });
    
  };
  
  Plus.getActivities = function(callback) {
    
    console.log('Plus.getActivities');
    
    gapi.client.plus.activities.list({
      'userId': 'me',
      'collection': 'public',
      'maxResults': 10
    }).execute(function(response) {
      callback(response);
    });
    
  };
  
  Plus.search = function(options, callback) {
    
    console.log('Plus.search', options);
    
    gapi.client.plus.activities.search(options).execute(function(response) { callback(response); });
  }

}).call(this);

function googlePlusApiOnLoad() {

  console.log('googleApiOnLoad');

  gapi.client.load('plus', 'v1', function() {
    console.log('Plus API loaded.');
    Plus._setApiKey();
  });

}