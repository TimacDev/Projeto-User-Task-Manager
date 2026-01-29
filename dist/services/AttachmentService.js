"use strict";
// Attachment class with type annotations
class Attachment {
    constructor(id, taskId, filename, size, url) {
        this.id = id;
        this.taskId = taskId;
        this.filename = filename;
        this.size = size;
        this.url = url;
        this.uploadedAt = new Date();
    }
}
// AttachmentService class
class AttachmentService {
    constructor() {
        this.attachments = [];
        this.nextId = 1;
    }
    addAttachment(taskId, attachment) {
        const newAttachment = new Attachment(this.nextId++, taskId, attachment.filename, attachment.size, attachment.url);
        this.attachments.push(newAttachment);
        return newAttachment;
    }
    getAttachments(taskId) {
        return this.attachments.filter((attachment) => attachment.taskId === taskId);
    }
    removeAttachment(attachmentId) {
        this.attachments = this.attachments.filter((attachment) => attachment.id !== attachmentId);
    }
}
