import { TaskClass } from "../models/task.js";
export class FeatureTask extends TaskClass {
    constructor(id, title, category, status) {
        super(id, title, category, status);
        this.priority = "Medium";
    }
    getType() {
        return "Feature";
    }
}
