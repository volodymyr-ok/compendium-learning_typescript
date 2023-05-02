interface IHouse {
  // door: 'opened' | 'closed'; -> приватні та захищені властивості вказати не можливо
  // tenants: IPerson[]; -> приватні та захищені властивості вказати не можливо
  // key: IKey; -> приватні та захищені властивості вказати не можливо
  comeIn(person: Person): void;
  openDoor(key: Key): string;
}
interface IHome {
  openDoor(key: Key): string;
}
interface IKey {
  // signature: -> number; приватні та захищені властивості вказати не можливо
  getSignature(): number;
}
interface IPerson {
  getKey(): Key;
}

abstract class House implements IHouse {
  protected door: 'opened' | 'closed' = 'closed';
  private tenants: Person[] = [];
  constructor(protected key: Key) {}
  public comeIn(person: Person): void {
    if (this.door === 'closed') throw new Error('The door is closed');
    this.tenants.push(person);
    console.log('Someone entered the house');
  }
  public abstract openDoor(key: Key): string;
}

class Home extends House implements IHome {
  openDoor(key: Key) {
    // if (this.key !== key) {
    // throw new Error('Using wrong key while opening the door!');
    // }; чомусь логіка відпрацьовує вірно... 0_о
    console.log('Entering the key...');
    if (key.getSignature() !== this.key.getSignature()) {
      console.log('Using the wrong key while opening the door!');
      return this.door;
    }
    return (this.door = 'opened');
  }
}

class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.floor(Math.random() * 500);
  }
  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}

const key = new Key();
const anotherKey = new Key();
const person = new Person(key);
const myHome = new Home(key);
const anotherHouse = new Home(anotherKey);
// --------------------------------
console.log('The door is ' + anotherHouse.openDoor(person.getKey()));
console.log('--------------------------------');
console.log('The door is ' + myHome.openDoor(person.getKey()));
myHome.comeIn(person);
