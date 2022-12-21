import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import HeaderTitle from "../../components/Header/HeaderTitle";
import Prev from "../../components/Header/Prev";
import { MainContainer } from "../../components/MainContainer";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/UserInfo";
import { useGetFollowList } from "../../hooks/useGetFollowList";
import IsFollowButton from "./IsFollowButton";

const FollowContainer = styled.ul`
  max-width: 358px;
  margin: 0 auto;
`;
const ProfileLink = styled.div`
  display: flex;
  align-items: center;
`;
export default function Follow() {
  const { followList, getFollowList } = useGetFollowList();
  const { accountname } = useParams();
  const path = useLocation();

  const followingUrl = `${process.env.REACT_APP_API_KEY}/profile/${accountname}/following`;
  const followerUrl = `${process.env.REACT_APP_API_KEY}/profile/${accountname}/follower`;
  useEffect(() => {
    if (path.pathname.includes("follower")) {
      getFollowList(followerUrl);
    } else {
      getFollowList(followingUrl);
    }
  }, []);
  return (
    <>
      <Header>
        <Prev />
        <HeaderTitle>follow</HeaderTitle>
      </Header>
      <MainContainer>
        <FollowContainer>
          {followList.map((follow) => {
            return (
              <ProfileLink>
                <Link to={`/profile/${follow.accountname}`}>
                  <UserInfo {...follow}></UserInfo>
                </Link>
                <IsFollowButton
                  isfollow={follow.isfollow}
                  userAccountName={follow.accountname}
                />
              </ProfileLink>
            );
          })}
        </FollowContainer>
      </MainContainer>
      <Navbar />
    </>
  );
}
