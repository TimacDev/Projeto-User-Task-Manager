export // Comment class with type annotations
 class Comment {
    constructor(id, taskId, userId, message) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.message = message;
        this.createdAt = new Date();
    }
}
// CommentService class
class CommentService {
    constructor() {
        this.comments = [];
        this.nextId = 1;
    }
    addComment(taskId, userId, message) {
        const comment = new Comment(this.nextId++, taskId, userId, message);
        this.comments.push(comment);
        return comment;
    }
    getComments(taskId) {
        return this.comments.filter((comment) => comment.taskId === taskId);
    }
    deleteComment(commentId) {
        this.comments = this.comments.filter((comment) => comment.id !== commentId);
    }
}
