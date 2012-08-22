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
    
    data.hasImage = data.image;
    data.noImage = !data.hasImage;
    
    data.raw = item;
    
    console.log(data.user.name, data.raw.object.objectType, data);
      
    return data;
  };
  
  DataNormailzer.processNote = function(item) {
    
    var data = { };
    
    _.each(item.object.attachments, function(atch) {
      
      if(atch.objectType === 'photo') {
        
        data.image = { };
        
        if(atch.fullImage.width && atch.fullImage.height){
          data.image.url = atch.fullImage.url;
        } else {
          data.image.url = atch.image.url;
        }
      }
      
      else if(atch.objectType === 'video') {
        //item.imageUrl = atch.fullImage.url;
      }
      
      else if(atch.objectType === 'article') {
        data.linkUrl = atch.url;
        
        if(item.title === '') {
          data.mainText = atch.displayName;
        }
      }
    });
    
    return data;
  };

  DataNormailzer.processActivity = function(item) {
    
    var data = { };
    
    return data;
  };
  
})();
