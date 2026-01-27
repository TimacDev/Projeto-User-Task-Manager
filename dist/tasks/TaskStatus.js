export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["CREATED"] = 0] = "CREATED";
    TaskStatus[TaskStatus["ASSIGNED"] = 1] = "ASSIGNED";
    TaskStatus[TaskStatus["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    TaskStatus[TaskStatus["BLOCKED"] = 3] = "BLOCKED";
    TaskStatus[TaskStatus["COMPLETED"] = 4] = "COMPLETED";
    TaskStatus[TaskStatus["ARCHIVED"] = 5] = "ARCHIVED";
})(TaskStatus || (TaskStatus = {}));
