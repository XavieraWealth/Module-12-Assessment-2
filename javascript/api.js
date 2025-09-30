/*
 * Jigsaw Puzzle Game - JavaScript File
 * Module 4 Assessment 2
 * Handles drag and drop functionality and game logic
 */

$(document).ready(function() {
    init();
});

/**
 * Initializes the puzzle game
 * Sets up draggable pieces and droppable grid cells
 */
function init() {
    // Make all puzzle pieces draggable
    $(".puzzle-piece").draggable({
        revert: "invalid",
        containment: "body",
        cursor: "move",
        zIndex: 100,
        start: function(event, ui) {
            $(this).css("z-index", 1000);
        }
    });

    // Make grid cells droppable
    $(".puzzle-grid-drop").droppable({
        accept: ".puzzle-piece",
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
            var draggable = ui.draggable;
            var droppable = $(this);
            
            // Check if this is the correct position
            var pieceId = draggable.attr("id");
            var gridId = droppable.attr("id");
            
            // Simple matching logic - matches piece IDs to grid IDs
            if (pieceId.replace("img", "").replace("-draggable", "") === gridId.replace("grid", "")) {
                // Correct placement
                draggable.draggable("disable");
                draggable.css({
                    position: "relative",
                    top: "0",
                    left: "0"
                });
                draggable.appendTo(droppable);
                
                // Add success styling
                droppable.addClass("ui-state-highlight");
                
                // Check if puzzle is complete
                checkPuzzleComplete();
            } else {
                // Incorrect placement - revert to original position
                draggable.animate({
                    top: 0,
                    left: 0
                }, 250);
            }
        }
    });

    // Reset button functionality
    $("#reset-puzzle").click(resetPuzzle);
}

/**
 * Checks if all puzzle pieces have been correctly placed
 * Shows congratulations message when puzzle is complete
 */
function checkPuzzleComplete() {
    var placedPieces = $(".puzzle-grid-drop .puzzle-piece").length;
    var totalPieces = $(".puzzle-piece").length;
    
    if (placedPieces === totalPieces) {
        setTimeout(function() {
            alert("🎉 Congratulations! You've completed the puzzle! 🎉");
        }, 500);
    }
}

/**
 * Resets the puzzle to its initial state
 * Re-enables all pieces and moves them back to pieces area
 */
function resetPuzzle() {
    $(".puzzle-piece").each(function() {
        var piece = $(this);
        piece.draggable("enable");
        piece.css({
            position: "relative",
            top: "0",
            left: "0"
        });
        piece.appendTo(".puzzle-pieces");
    });
    
    $(".puzzle-grid-drop").removeClass("ui-state-highlight");
}
