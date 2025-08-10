import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchPosts } from "./newsFeedSlice";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Spin, Alert } from "antd";
import { NewsCard } from "./NewsCard";

export const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const { posts, status, error, skip, hasMore } = useAppSelector(
    (state) => state.newsFeed
  );
  const handleLoadMore = useCallback(() => {
    if (hasMore && status !== "loading") {
      dispatch(fetchPosts(skip));
    }
  }, [dispatch, hasMore, skip, status]);

  const { setLastElement } = useInfiniteScroll(handleLoadMore);

  useEffect(() => {
    if (posts.length === 0 && status === "idle") {
      dispatch(fetchPosts(0));
    }
  }, [dispatch, posts.length, status]);

  return (
    <div style={{ padding: 24 }}>
      {posts.map((post, index) => {
        const isLastElement = index === posts.length - 1;
        return (
          <div key={post.id} ref={isLastElement ? setLastElement : undefined}>
            <NewsCard post={post} />
          </div>
        );
      })}

      {status === "loading" && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Spin size="large" />
        </div>
      )}

      {error && <Alert message={error} type="error" />}

      {!hasMore && posts.length > 0 && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          No more posts to load
        </div>
      )}
    </div>
  );
};
