export {getLines, getText}

function getText(ctx, text, maxWidth)
{
    return {
        description:  getLines(ctx, text.description, maxWidth),
        coding:  text.coding,
        contribution:  getLines(ctx, text.contribution, maxWidth),
        link:  text.link,
        linkTitle: text.linkTitle
    }
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];


    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}