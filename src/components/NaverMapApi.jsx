import React, { useState, useEffect } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

// 지도 컨테이너
const MapContainer = styled.div`
  position: relative;
  width: 1400px;
  height: 500px;
  margin: 20px auto;
`;

// 지도 마커 스타일
const markerContent = styled.div`
  width: 32px;
  height: 40px;
  flex-shrink: 0;
  fill: #000;

  .text{
    display: flex;
    width: 19px;
    height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    letter-spacing: -0.44px;
  }
`;

export const NaverMapApi = (props) => {
    return(
        <RenderAfterNavermapsLoaded
            ncpClientId={process.env.REACT_APP_API_vss8luxyuf}
            submodules={["geocoder"]}>

            <NaverMap
                logoControl= {false}
                mapDataControl= {false}
                scaleControl= {true}
                zoom={14}
                zoomControl= {true}
                zoomControlOptions= { position= 9 }
                tileDuration= {300}
                baseTileOpacity= {1}
                background= {white}
                tileSpare= {7}
            >
                <markerContent
                    position={{lat: props.Latitude, lng: props.Longtitude}}
                    title={props.roadAddress}
                    clickable={true}/>
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    );
};

export default NaverMapApi;