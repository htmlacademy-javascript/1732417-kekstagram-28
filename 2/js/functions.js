//Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом
function checkIsPalindrome(string) {
  const joinString = string.replace(/\P{L}/gu, '').toLowerCase(); //Удаляем пробелы, цифры и символы в строке с помощью регулярного выражения и приводим в нижний регистр
  const length = joinString.length;
  for (let i = 0; i < length / 2; i++) {
    if (joinString[i] !== joinString[length - i - 1]) {
      return false;
    }
  }
  return true;
}
checkIsPalindrome('Лёша на полке клопа нашёл ');

//Функция, которая принимает аргумент и извлекает содержащиеся в нём цифры
function extractNumber(string) {
  if (typeof string === 'number') { //Делаем проверку на тип аргумента
    return Math.abs(string); //Возвращаем абсолютное число без "-"
  }
  const foundNumbers = string.match(/\d/g); //Ищем цифры и записываем в массив
  return foundNumbers ? parseInt(foundNumbers.join(''), 10) : NaN; //Делаем проверку. Выводим из массива и преобразуем в цифры
}
extractNumber(223);

/* Функция, которая принимает три параметра: исходную строку,
 минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
 Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
 Если «добивка» слишком длинная, она обрезается с конца. */
function padString (string, minLength, symbols) {
  const different = minLength - string.length;
  if (different <= 0) {
    return string;
  }
  const fragment = symbols.slice(0, different);
  const numberOfUses = Math.floor(different / symbols.length);
  const leftoverSymbols = symbols.slice(0, different % symbols.length);
  let stringOfCharacters = '';
  for (let i = 0; i < numberOfUses; i++) {
    stringOfCharacters += fragment;
  }
  return leftoverSymbols + stringOfCharacters + string;
}
padString('q', 4, 'we');
