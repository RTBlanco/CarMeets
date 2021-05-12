class Meet {
  constructor(id, location, title, image, owner, secretCode, dateTime, comments){
    this.id = id;
    this.location = location;
    this.title = title;
    this.image = image;
    this.owner = owner;
    this.secretCode = secretCode; 
    this.dateTime = dateTime;
    this.comments = comments;
  }

  // instance method 
  static render(){
    // render the meet instance on the page 
  }

  get date(){
    // split the dateTime
  }

  get time(){
    // split the dateTime
  }
}