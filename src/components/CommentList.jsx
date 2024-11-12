import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa"; // 플러스 아이콘 추가
import Comment from "./Comment";

// 초기 댓글 데이터
const initialComments = [];

// Styled-components 정의
const Container = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
`;

const FormContainer = styled.div`
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  outline: none;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px; // 버튼 사이 간격
`;

const Button = styled.button`
  padding: 8px 12px;
  font-family: NanumGothic;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || "#59ABE6"};
  color: ${(props) => (props.textColor ? props.textColor : "#FFFFFF")};
`;

const CommentContent = styled.div`
  flex: 1;
`;

const ReplyForm = styled.div`
  margin-left: 40px;
  margin-top: 8px;
`;

const ReplyButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px; // 텍스트와 아이콘 사이 간격
`;

function CommentList() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  // 새로운 댓글 등록
  const addComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: Date.now(),
        name: "익명", // 사용자가 입력할 경우 이름을 받도록 수정 가능
        comment: newComment,
        date: new Date().toISOString().slice(0, 10), // 현재 날짜
        replies: [], // 답글 리스트 초기화
      };
      setComments([...comments, newCommentObj]);
      setNewComment(""); // 입력 필드 초기화
    }
  };

  // 답글 추가
  const addReply = (id) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const newReply = {
          id: Date.now(),
          name: "익명", // 답글 작성자 이름
          comment: replyText,
          date: new Date().toISOString().slice(0, 10),
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setComments(updatedComments);
    setReplyText("");
    setReplyingTo(null); // 답글 입력 폼 닫기
  };

  // 댓글 삭제
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // 댓글 수정 시작
  const startEditing = (id, text) => {
    setEditingCommentId(id);
    setEditText(text);
  };

  // 댓글 수정 저장
  const saveEdit = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, comment: editText } : comment
      )
    );
    setEditingCommentId(null);
    setEditText("");
  };

  return (
    <Container>
      {/* 새로운 댓글 작성 */}
      <FormContainer>
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요..."
        />
        <ButtonContainer>
          <Button bgColor="#59ABE6" textColor="#FFFFFF" onClick={addComment}>
            등록
          </Button>
          <Button bgColor="#FFFFFF" textColor="#59ABE6" onClick={() => setNewComment("")}>
            취소
          </Button>
        </ButtonContainer>
      </FormContainer>

      {/* 댓글 리스트 표시 */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentContent>
              <Comment
                name={comment.name}
                comment={comment.comment}
                date={comment.date}
                onEdit={() => startEditing(comment.id, comment.comment)}
                onDelete={() => deleteComment(comment.id)}
              />
            </CommentContent>

            {/* 답글 리스트 표시 */}
            {comment.replies.map((reply) => (
              <CommentContent key={reply.id}>
                <Comment
                  name={reply.name}
                  comment={reply.comment}
                  date={reply.date}
                />
              </CommentContent>
            ))}

            {/* 답글 입력 폼 */}
            {replyingTo === comment.id ? (
              <ReplyForm>
                <TextArea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답글을 작성하세요..."
                />
                <ButtonContainer>
                  <Button bgColor="#59ABE6" textColor="#FFFFFF" onClick={() => addReply(comment.id)}>
                    답글 등록
                  </Button>
                  <Button bgColor="#FFFFFF" textColor="#59ABE6" onClick={() => setReplyingTo(null)}>
                    취소
                  </Button>
                </ButtonContainer>
              </ReplyForm>
            ) : (
              <ReplyButton bgColor="#FFFFFF" textColor="#59ABE6" onClick={() => setReplyingTo(comment.id)}>
                <FaPlus /> 답글 달기
              </ReplyButton>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default CommentList;
