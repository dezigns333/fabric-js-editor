/**
 * Define action to draw text
 */
function drawingtext() {
  const textBoxDrawing = function (canvas) {
    let isDrawingText = false,
      textboxRect,
      origX,
      origY,
      pointer;
    canvas.on("mouse:down", (o) => {
      if (!canvas.isDrawingTextMode) return;

      isDrawingText = true;
      pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      textboxRect = new fabric.Rect({
        left: origX,
        top: origY,
        width: pointer.x - origX,
        height: pointer.y - origY,
        strokeWidth: 1,
        stroke: "#C00000",
        fill: "rgba(192, 0, 0, 0.2)",
        transparentCorners: false,
      });
      canvas.add(textboxRect);
    });

    canvas.on("mouse:move", (o) => {
      if (!isDrawingText) return;

      pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        textboxRect.set({
          left: Math.abs(pointer.x),
        });
      }

      if (origY > pointer.y) {
        textboxRect.set({
          top: Math.abs(pointer.y),
        });
      }

      textboxRect.set({
        width: Math.abs(origX - pointer.x),
      });
      textboxRect.set({
        height: Math.abs(origY - pointer.y),
      });

      canvas.renderAll();
    });

    canvas.on("mouse:up", () => {
      if (!isDrawingText) return;

      isDrawingText = false;

      // get final rect coords and replace it with textbox
      let textbox = new fabric.Textbox("Skriv tekst her...", {
        left: textboxRect.left,
        top: textboxRect.top,
        width: textboxRect.width < 80 ? 80 : textboxRect.width,
        fontSize: 18,
        //  fontFamily: "'Open Sans', sans-serif",
        fontFamily: "'Myriad Pro', sans-serif",
        fill: "white",
        backgroundColor: "black",
      });
      canvas.remove(textboxRect);
      canvas.add(textbox).setActiveObject(textbox);
      textbox.setControlsVisibility({
        mb: false,
      });
      canvas.trigger("object:modified");
    });
  };

  window.ImageEditor.prototype.initializeTextBoxDrawing = textBoxDrawing;
}
drawingtext();
