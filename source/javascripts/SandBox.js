(function(){
  
  var root = this;
  
  var SandBox = root.SandBox = { };
  
  SandBox.init = function() {
    
    Plus.init({
      clientId: '966100401272-jj83p83m37vfcj6r548p9od90gg1ecq4.apps.googleusercontent.com',
      apiKey: 'AIzaSyDfc8bj4Iy5ViT6dsrZj0TacE4yQZ4OvXc',
      scopes: 'https://www.googleapis.com/auth/plus.me'
    }, SandBox.plusInitComplete);

  }
  
  SandBox.plusInitComplete = function() {
    SandBox.setupEventHandlers();
  }
  
  SandBox.setupEventHandlers = function() {
    
    $('#login-btn').click(SandBox.loginClick);
    $('#search-btn').click(SandBox.searchClick);

  };
  
  SandBox.loginClick = function() {
    $('#login-btn').remove();
    Plus.authorize(SandBox.authComplete);
  };
  
  SandBox.searchClick = function() {
    var options = {
      query:'soccer',
      maxResults: 20
    };
    
    if(SandBox.pageToken) {
      options.pageToken = SandBox.pageToken;
    }
    
    Plus.search(options, SandBox.searchComplete);
  };
  
  SandBox.searchComplete = function(result) {
    SandBox.pageToken = result.nextPageToken;
    
    var r = 0;
    _.each(result.items, function(i){
      r = r + 1;
      console.log(i);
      $('#col'+( r % 4 + 1 )).append(ich.plusItemTmp(i));
    });
    
  };

  SandBox.authComplete = function(authed) {
    
    if(authed){
      Plus.getMe(SandBox.profileRetreived);
      Plus.getActivities(SandBox.activitiesRetreived);
    }else{
      // handle auth fail
    }
  };

  SandBox.profileRetreived = function(result) {
    console.log('Profile', result);
  };

  SandBox.activitiesRetreived = function(result) {
    console.log('Activities', result);
  };
  
})(this);