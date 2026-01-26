export class UserClass {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
    activate() {
        this.active = true;
    }
}
