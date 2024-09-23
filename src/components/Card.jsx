import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../assets/icons/trash_outline_icon.png';
import menuIcon from '../assets/icons/dot_menu_icon.png';

// Styled Components 설정
const CardContainer = styled.div`
  background: #fff;
  width: 620px;
  height: 510px;
  border-radius: 0.6em;
  margin: 13px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 
              0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 
              0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  transition: all ease 200ms;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 
                0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 
                0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 330px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 5px;
`;

const CardTitle = styled.h2`
  color: #222;
  margin: -0.2em 0 0 0;
  line-height: 1.4;
  font-size: 1.3em;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  transition: all ease-in 100ms;
`;

const CardTitleAndIcon = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardDescription = styled.p`
  color: #777;
`;

const CardIcon = styled.img`
  width: 1.3em;
  height: 1.3em;
  filter: invert(99%) sepia(0%) saturate(6%) hue-rotate(146deg) brightness(92%) contrast(92%);

  &:hover {
    filter: invert(95%) sepia(7%) saturate(4256%) hue-rotate(297deg) brightness(85%) contrast(132%);
  }
`;

const CardAuthor = styled.h5`
  font-family: NanumGothic;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px;
  margin: 0 20px;

  span {
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CardComment = styled.h5`
  font-family: NanumGothic;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
  margin: 10px 0 0 340px;

  svg{
    margin-right: 10px;
  }

  span {
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CardLikes = styled.h5`
  font-family: NanumGothic;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
  margin: 10px 0 0 10px;

  svg{
    margin-right: 10px;
  }

  span {
    text-align: center;
    font-family: NanumGothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

`;

const CardAddDate = styled.span`
  color: #bbb;
  font-weight: bold;
  // font-size: 1.25em;
  font-size: 1em;
`;

// Card 컴포넌트 정의
export default function Card({ img, title, icon = 'none', author, date, onClick }) {
  return (
    <CardContainer onClick={onClick}>
      <CardImage src={img} alt={title} />
      <CardBody>
        {icon === 'delete' && (
          <CardTitleAndIcon>
            <CardTitle>{title}</CardTitle>
            <CardIcon src={deleteIcon} alt="Delete" />
          </CardTitleAndIcon>
        )}
        {icon === 'menu' && (
          <CardTitleAndIcon>
            <CardTitle>{title}</CardTitle>
            <CardIcon src={menuIcon} alt="Menu" />
          </CardTitleAndIcon>
        )}
        {icon === 'none' && (
          <CardTitle>{title}</CardTitle>
        )}
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </CardDescription>
        <CardAuthor>{author}</CardAuthor>
        <CardAddDate>{date}</CardAddDate>
      </CardBody>
      <CardFooter>
        <CardAuthor><span>by</span> {author}</CardAuthor>
        <CardComment>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13.6689 8.22266C13.1501 8.22266 12.748 8.57227 12.748 9.00391C12.748 9.43555 13.1501 9.78516 13.6689 9.78516C14.1429 9.78516 14.5449 9.43555 14.5449 9.00391C14.5449 8.57227 14.1429 8.22266 13.6689 8.22266ZM7.37988 8.22266C6.86104 8.22266 6.45898 8.57227 6.45898 9.00391C6.45898 9.43555 6.86104 9.78516 7.37988 9.78516C7.85381 9.78516 8.25586 9.43555 8.25586 9.00391C8.25586 8.57227 7.85381 8.22266 7.37988 8.22266Z" fill="black"/>
            <path d="M19.2148 6.39324C18.2309 5.19476 16.8562 4.39396 15.3486 4.03259V4.03441C14.9988 3.68939 14.604 3.37161 14.1621 3.08834C10.8134 0.927436 6.11253 1.5866 3.668 4.5592C1.69805 6.97432 1.78192 10.2229 3.79074 12.5309L3.8071 14.9388C3.8071 14.9969 3.81733 15.055 3.83779 15.1095C3.9462 15.4164 4.31442 15.5852 4.65809 15.489L7.24786 14.7645C7.93314 14.9805 8.64093 15.104 9.34463 15.1385L9.3344 15.1458C11.1571 16.3243 13.5464 16.6784 15.7372 16.0356L18.3372 16.7874C18.4027 16.8055 18.4702 16.8164 18.5398 16.8164C18.9018 16.8164 19.1944 16.5567 19.1944 16.2353V13.802C20.9966 11.6302 21.0436 8.62859 19.2148 6.39324ZM7.53425 13.4752L7.28877 13.3844L5.26359 13.9473L5.24314 12.0588L5.07949 11.8954C3.34888 10.0214 3.23432 7.32116 4.85447 5.34003C6.82646 2.93943 10.6068 2.4092 13.3029 4.14155C16.0073 5.88661 16.6066 9.23691 14.653 11.623C13.0145 13.6186 10.0811 14.3559 7.53425 13.4752ZM17.8647 13.1665L17.701 13.3481L17.7215 15.2366L15.7168 14.6373L15.4713 14.7281C14.3257 15.1058 13.1045 15.1367 11.9733 14.8553L11.9692 14.8534C13.4809 14.4412 14.8515 13.6059 15.8395 12.4038C17.4024 10.4917 17.656 8.08928 16.7478 6.04096L16.7601 6.04822C17.2305 6.34785 17.6622 6.72192 18.0283 7.17407C19.5135 8.98269 19.4296 11.445 17.8647 13.1665Z" fill="black"/>
            <path d="M10.5244 8.22266C10.0056 8.22266 9.60352 8.57227 9.60352 9.00391C9.60352 9.43555 10.0056 9.78516 10.5244 9.78516C10.9983 9.78516 11.4004 9.43555 11.4004 9.00391C11.4004 8.57227 10.9983 8.22266 10.5244 8.22266Z" fill="black"/>
          </svg><span>{comment}</span></CardComment>
        <CardLikes>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
            <path d="M14.0843 0C12.3343 0 10.7926 0.875 9.91764 2.25C9.04264 0.875 7.50098 0 5.75098 0C3.00098 0 0.750977 2.25 0.750977 5C0.750977 9.95833 9.91764 15 9.91764 15C9.91764 15 19.0843 10 19.0843 5C19.0843 2.25 16.8343 0 14.0843 0Z" fill="#FC6449"/>
          </svg><span>{likes}</span></CardLikes>
      </CardFooter>
    </CardContainer>
  );
}
