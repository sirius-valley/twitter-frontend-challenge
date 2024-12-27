import React, {useEffect, useState} from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/Loader";
import {useGetFeed} from "../../hooks/useGetFeed";
import {CursorPagination} from "../../service";
import Feed from "./Feed";
import {useToast} from "../toast/ToastContext";
import {ToastType} from "../toast/Toast";

// Estilo de los elementos para diferenciar el contenido
const Item = styled.div`
  padding: 20px;
  margin: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ContentFeed = () => {
  const { showToast } = useToast();

  const initialOptions: CursorPagination = {limit: 10}
  const { posts, isLoading, isError, fetchNextPage, hasNextPage, error } = useGetFeed(initialOptions);

  console.log('result', {
    posts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage
  })

  useEffect(() => {
    if (isError) {
      showToast("Could not fetch posts: " + error, ToastType.ALERT);
    }
  }, [isError]);
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loader/>}
      scrollableTarget="scroll-container"
    >
      <Feed posts={posts} loading={isLoading} />
    </InfiniteScroll>
  );
};

export default ContentFeed;
