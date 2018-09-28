const greetingRegExp = RegExp('hei|hallo|hello|hi', "i");

function ParseInquire(inquire) {
    let profile = {};
    let greeting = greetingRegExp.exec(inquire);
    if (greeting) {
        profile.greeting = true;
    }
    return profile;
}

module.exports.ParseInquire = ParseInquire;
