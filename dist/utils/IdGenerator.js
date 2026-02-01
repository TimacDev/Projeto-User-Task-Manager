export class IdGenerator {
    constructor() { } // prevents new instances
    static generate() {
        IdGenerator.counter++;
        return IdGenerator.counter;
    }
}
IdGenerator.counter = 0;
