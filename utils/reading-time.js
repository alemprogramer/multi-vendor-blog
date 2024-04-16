module.exports =(text)=> {
    // Average reading speed in words per minute
    const wordsPerMinute = 200;

    // Count the number of words in the text
    const wordCount = text.split(/\s+/).length;

    // Calculate the reading time in minutes
    const minutes = Math.floor(wordCount / wordsPerMinute);

    // Calculate the remaining seconds
    const seconds = Math.round((wordCount / wordsPerMinute - minutes) * 60);

    const time = ` ${minutes} min and ${seconds} sec`
    return time;
}


