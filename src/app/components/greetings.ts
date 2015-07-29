export var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
export var greetings = (person) => {
    return "hallo " + person.name;
};
