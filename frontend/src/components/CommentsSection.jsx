import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import useCreateComment from "../hooks/useCreateComment";
import useDeleteComment from "../hooks/useDeleteComment";
import {
    LogInIcon,
    MessageSquareIcon,
    SendIcon,
    Trash2Icon,
} from "lucide-react";
import formatCommentTime from "../lib/date";

const CommentsSection = ({ productId, comments = [], currentUserId }) => {
    const { isSignedIn } = useAuth();
    const [content, setContent] = useState("");
    const createComment = useCreateComment();
    const deleteComment = useDeleteComment(productId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        createComment.mutate(
            { productId, content },
            { onSuccess: () => setContent("") }
        );
    };

    const handleDelete = (id) => {
        confirm("Are you sure you want to delete this comment?") &&
            deleteComment.mutate({
                commentId: id,
            });
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
                <MessageSquareIcon className="size-5 text-primary" />
                <h3 className="font-bold">Comments</h3>
                <span className="badge badge-neutral badge-sm">
                    {comments.length}
                </span>
            </div>

            {/* Adding Comment */}
            {isSignedIn ? (
                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="input input-bordered input-md flex-1 bg-base-200"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={createComment.isPending}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-md btn-square"
                        disabled={createComment.isPending || !content.trim()}
                    >
                        {createComment.isPending ? (
                            <span className="loading loading-spinner loading-xs" />
                        ) : (
                            <SendIcon className="size-4" />
                        )}
                    </button>
                </form>
            ) : (
                <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
                    <span className="text-sm text-base-content/60">
                        Sign in to join the conversation
                    </span>
                    <SignInButton mode="modal">
                        <button className="btn btn-primary btn-sm gap-1">
                            <LogInIcon className="size-4" />
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            )}

            {/* Comments */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-base-content/50">
                        <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Be the first to comment!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="chat chat-start">
                            {/* User Avatar */}
                            <div className="chat-image avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src={comment.user?.imageUrl}
                                        alt={comment.user?.name}
                                    />
                                </div>
                            </div>

                            {/* User name + Comment Creation */}
                            <div className="chat-header flex items-center text-sm opacity-70 mb-1">
                                <span className="font-bold">
                                    {comment.user?.name}
                                </span>
                                <time className="ml-1 text-xs opacity-50">
                                    {formatCommentTime(comment.createdAt)}
                                </time>
                            </div>

                            {/* Comment Content  + Delete Comment */}
                            <div className="flex items-center justify-left">
                                <div className="chat-bubble chat-bubble-primary text-sm">
                                    {comment.content}
                                </div>
                                {currentUserId === comment.userId && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="btn btn-ghost btn-xs text-error"
                                        disabled={deleteComment.isPending}
                                    >
                                        {deleteComment.isPending ? (
                                            <span className="loading loading-spinner loading-xs" />
                                        ) : (
                                            <Trash2Icon className="size-3" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
