export // Comment class with type annotations
class Comment {
  id: number;
  taskId: number;
  userId: number;
  message: string;
  createdAt: Date;

  constructor(id: number, taskId: number, userId: number, message: string) {
    this.id = id;
    this.taskId = taskId;
    this.userId = userId;
    this.message = message;
    this.createdAt = new Date();
  }
}

// CommentService class
class CommentService {
  private comments: Comment[] = [];
  private nextId: number = 1;

  addComment(taskId: number, userId: number, message: string): Comment {
    const comment = new Comment(this.nextId++, taskId, userId, message);
    this.comments.push(comment);
    return comment;
  }

  getComments(taskId: number): Comment[] {
    return this.comments.filter((comment) => comment.taskId === taskId);
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  }
}
