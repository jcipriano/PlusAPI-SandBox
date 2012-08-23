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
    
    data.id = item.id;
    data.isPhoto = data.type === 'photo';
    data.isArticle = data.type === 'article';
    data.isActivity = data.type === 'activity';
    data.isVideo = data.type === 'video';
    data.source = item.provider.title;
    data.url = item.url;
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
          data.image.url = atch.fullImage.url.replace('resize_h=100', 'resize_w=315');
        } else {
          data.image.url = atch.image.url.replace('resize_h=100', 'resize_w=315');
        }
      }
      
      else if(atch.objectType === 'article') {
        
        data.type = 'article';
        data.linkUrl = atch.url;
        data.mainText = atch.displayName;
        data.subText = atch.content;
      }
      
      else if(atch.objectType === 'video') {
        
        data.image = { };
        data.video = { };
        
        if(!data.type) {
          data.type = 'video';
        }
        
        data.image.url = atch.image.url.replace('resize_h=100', 'resize_w=315');
        data.video.isFlash = atch.embed.type == 'application/x-shockwave-flash';
        data.video.embed = atch.embed.url;
        data.linkUrl = atch.url;
        //https://www.youtube.com/embed/BXYOIfDFkrM?autoplay=1&autohide=1&border=0&wmode=opaque&hl=en-US&cc_lang_pref=en-US
        //http://www.youtube.com/v/87F2oJamoKc?version=3&autohide=1
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
