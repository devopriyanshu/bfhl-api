class DataProcessingService {
  static processArray(inputArray) {
    const result = {
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
    };

    let numericSum = 0;
    const alphabeticChars = [];

    for (const item of inputArray) {
      const stringItem = String(item);

      // Check if it's a number
      if (this.isNumeric(stringItem)) {
        const num = parseInt(stringItem);
        numericSum += num;

        if (num % 2 === 0) {
          result.even_numbers.push(stringItem);
        } else {
          result.odd_numbers.push(stringItem);
        }
      }
      // Check if it's alphabetic
      else if (this.isAlphabetic(stringItem)) {
        result.alphabets.push(stringItem.toUpperCase());

        // Collect individual characters for concatenation
        for (const char of stringItem) {
          if (this.isAlphabetic(char)) {
            alphabeticChars.push(char.toLowerCase());
          }
        }
      }
      // Special characters
      else {
        result.special_characters.push(stringItem);
      }
    }

    result.sum = numericSum.toString();
    result.concat_string = this.generateConcatString(alphabeticChars);

    return result;
  }

  static isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
  }

  static isAlphabetic(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  static generateConcatString(alphabeticChars) {
    if (alphabeticChars.length === 0) return "";

    // Reverse the array
    const reversedChars = alphabeticChars.reverse();

    // Apply alternating caps
    return reversedChars
      .map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }
}

export default DataProcessingService;
