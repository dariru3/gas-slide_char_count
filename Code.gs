function countCharacters() {
  // Access the active presentation and its slides
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  
  // Initialize a variable to store the total character count
  var totalSlideCharacters = 0;
  var totalNoteCharacters = 0;
  
  // Loop through all slides in the presentation
  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    
    // Count characters in slide text elements, including text boxes
    var textElements = slide.getPageElements().filter(function(element) {
      return element.getPageElementType() === SlidesApp.PageElementType.SHAPE;
    });
    
    for (var j = 0; j < textElements.length; j++) {
      var shape = textElements[j].asShape();
      var textRange = shape.getText();
      var content = textRange.asRenderedString();
      totalSlideCharacters += content.length;
    }
    
    // Count characters in notes
    var notesPage = slide.getNotesPage();
    var notesShape = notesPage.getPlaceholder(SlidesApp.PlaceholderType.BODY);
    if (notesShape) {
      var notesText = notesShape.asShape().getText().asString();
      totalNoteCharacters += notesText.length;
    }
  }
  
  // Log the total character count
  Logger.log("Total characters in the slides: " + totalSlideCharacters);
  Logger.log("Total characters in the notes: " + totalNoteCharacters);
}
