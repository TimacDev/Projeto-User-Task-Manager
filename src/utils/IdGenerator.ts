export class IdGenerator {
  private static counter: number = 0;

  private constructor() {} // prevents new instances

  static generate(): number {
    IdGenerator.counter++;
    return IdGenerator.counter;
  }
}
