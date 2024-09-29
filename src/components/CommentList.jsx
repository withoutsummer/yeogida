import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "김미진",
        comment: "안녕하세요, 미진입니다.",
        date: "2024-09-25", 
    },
    {
        name: "채서린",
        comment: "안녕하세요, 서린입니다.",
        date: "2024-09-24", 
    },
    {
        name: "고시은",
        comment: "안녕하세요, 시은입니다.",
        date: "2024-09-23", 
    },
    {
        name: "백서영",
        comment: "안녕하세요, 서영입니다.",
        date: "2024-09-23", 
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment, index) => {
                return (
                    <Comment
                        key={index} // key 추가
                        name={comment.name}
                        comment={comment.comment}
                        date={comment.date} // date 전달
                    />
                );
            })}
        </div>
    );
}

export default CommentList;