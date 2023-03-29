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
      try {
        var textRange = shape.getText();
        var content = textRange.asRenderedString().replace(/\s+/g, '');
        // console.log(content, content.length)
        totalSlideCharacters += content.length;
      } catch (error) {
        // If the shape does not have a text component, skip it
      }
    }
    
    // Count characters in notes
    var notesPage = slide.getNotesPage();
    var notesShapes = notesPage.getPageElements().filter(function(element) {
      return element.getPageElementType() === SlidesApp.PageElementType.SHAPE;
    });
    
    for (var k = 0; k < notesShapes.length; k++) {
      var notesShape = notesShapes[k].asShape();
      try {
        var notesText = notesShape.getText().asString().replace(/\s+/g, '');
        // console.log(notesText, notesText.length)
        totalNoteCharacters += notesText.length;
      } catch (error) {
        // If the shape does not have a text component, skip it
      }
    }
  }
  
  // Log the total character count
  Logger.log("Total characters in the slides: " + totalSlideCharacters);
  Logger.log("Total characters in the notes: " + totalNoteCharacters);
}
