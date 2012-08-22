(function(){
  
  var root = this;
  
  var Streamer = root.Streamer = { };
  
  Streamer.init = function() {
    
    Plus.init({
      clientId: '966100401272-jj83p83m37vfcj6r548p9od90gg1ecq4.apps.googleusercontent.com',
      apiKey: 'AIzaSyDfc8bj4Iy5ViT6dsrZj0TacE4yQZ4OvXc',
      scopes: 'https://www.googleapis.com/auth/plus.me'
    }, Streamer.plusInitComplete);

  }
  
  Streamer.plusInitComplete = function() {
    Streamer.setupEventHandlers();
  }
  
  Streamer.setupEventHandlers = function() {
    
    $('#login-btn').click(Streamer.loginClick);
    $('#search-btn').click(Streamer.searchClick);

  };
  
  Streamer.loginClick = function() {
    $('#login-btn').remove();
    Plus.authorize(Streamer.authComplete);
  };
  
  Streamer.searchClick = function() {
    var options = {
      query:'photography',
      maxResults: 20
    };
    
    if(Streamer.pageToken) {
      options.pageToken = Streamer.pageToken;
    }
    
    Plus.search(options, Streamer.searchComplete);
  };
  
  Streamer.searchComplete = function(result) {
    Streamer.pageToken = result.nextPageToken;
    
    var r = 0;
    _.each(result.items, function(item){
      r = r + 1;
      var data = DataNormailzer.process(item);
      $('#col'+( r % 3 + 1 )).append(ich.plusItemTmp(data));
    });
    
  };

  Streamer.authComplete = function(authed) {
    
    if(authed){
      Plus.getMe(Streamer.profileRetreived);
      Plus.getActivities(Streamer.activitiesRetreived);
    }else{
      // handle auth fail
    }
  };

  Streamer.profileRetreived = function(result) {
    console.log('Profile', result);
  };

  Streamer.activitiesRetreived = function(result) {
    console.log('Activities', result);
  };
  
})();