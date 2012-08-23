(function(){
  
  var colors = ['#0266C8', '#F90101', '#F2B50F', '#00933B'];
  var colorMarker = 0;
  
  DataNormailzer = Streamer.DataNormailzer = { }
  
  DataNormailzer.process = function(item) {
    
    var data = {
      user: {
        name: item.actor.displayName,
        image: item.actor.image.url,
        url: item.actor.url
      },
      mainText: item.title,
      color: colors[Math.floor(Math.random()*4)]
    };
    
    if(item.object.objectType == 'note') {
      data = _.extend(data, this.processNote(item));
    } else {
      data = _.extend(data, this.processActivity(item));
    }
    
    data.isPhoto = data.type === 'photo';
    data.isArticle = data.type === 'article';
    data.isActivity = data.type === 'activity';
    data.raw = item;
    
    console.log(data.user.name, data.raw.object.objectType, data);
      
    return data;
  };
  
  DataNormailzer.processNote = function(item) {
    
    var data = { };
    
    _.each(item.object.attachments, function(atch) {
      
      if(atch.objectType === 'photo') {
        
        data.image = { };
        
        if(!data.type) {
          data.type = 'photo';
        }
        
        if(atch.fullImage.width && atch.fullImage.height){
          data.image.url = atch.fullImage.url;
        } else {
          data.image.url = atch.image.url;
        }
      }
      
      else if(atch.objectType === 'article') {
        
        data.type = 'article';
        data.linkUrl = atch.url;
        
        if(item.title === '') {
          data.mainText = atch.displayName;
        }
      }
      
      else if(atch.objectType === 'video') {
        //item.imageUrl = atch.fullImage.url;
      }
      
    });
    
    return data;
  };

  DataNormailzer.processActivity = function(item) {
    
    var data = { };
    
    data.type = 'activity';
    data.mainText = item.title;
      
    return data;
  };
  
})();
