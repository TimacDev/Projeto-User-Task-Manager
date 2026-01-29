export class Attachment {
  id: number;
  taskId: number;
  filename: string;
  size: number;
  url: string;
  uploadedAt: Date;

  constructor(
    id: number,
    taskId: number,
    filename: string,
    size: number,
    url: string
  ) {
    this.id = id;
    this.taskId = taskId;
    this.filename = filename;
    this.size = size;
    this.url = url;
    this.uploadedAt = new Date();
  }
}

// Input type for adding attachments
export interface AttachmentInput {
  filename: string;
  size: number;
  url: string;
}

export class AttachmentService {
  private attachments: Attachment[] = [];
  private nextId: number = 1;

  addAttachment(taskId: number, attachment: AttachmentInput): Attachment {
    const newAttachment = new Attachment(
      this.nextId++,
      taskId,
      attachment.filename,
      attachment.size,
      attachment.url
    );
    this.attachments.push(newAttachment);
    return newAttachment;
  }

  getAttachments(taskId: number): Attachment[] {
    return this.attachments.filter((attachment) => attachment.taskId === taskId);
  }

  removeAttachment(attachmentId: number): void {
    this.attachments = this.attachments.filter(
      (attachment) => attachment.id !== attachmentId
    );
  }
}