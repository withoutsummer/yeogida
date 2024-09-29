import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
        alignItems: "flex-start", // 아이템 정렬
    },
    imageContainer: {
        marginRight: 8, // 이미지와 텍스트 사이 간격
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: "50%", // 원형 이미지
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column", // 수직 나열
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    dateText: {
        color: "grey",
        fontSize: 14,
    },
    commentText: {
        color: "black",
        fontSize: 16,
        marginTop: 4, // 댓글과 이름-날짜 사이 간격
    },
};

function Comment(props) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.imageContainer}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    alt="Profile"
                    style={styles.image}
                />
            </div>

            <div style={styles.contentContainer}>
                <div style={styles.infoContainer}>
                    <span style={styles.nameText}>{props.name}</span>
                    <span style={styles.dateText}>{props.date}</span>
                </div>
                <span style={styles.commentText}>{props.comment}</span>
            </div>
        </div>
    );
}

export default Comment;
