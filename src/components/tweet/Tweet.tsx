import React, {useEffect, useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import {Post, ReactionType, ReactionTypeDTO, User} from "../../service";
import {StyledReactionsContainer} from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import {useMe} from "../../hooks/useMe";

interface TweetProps {
  post: Post;
}

const Tweet = ({post}: TweetProps) => {
  const [actualPost, setActualPost] = useState<Post>(post);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const service = useHttpRequestService();
  const navigate = useNavigate();
  const me = useMe();
  const [user, setUser] = useState<User>()
  const [reacted] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    console.log(post)
    handleGetUser().then(r => setUser(r))
    handleGetUserReactions().then()
  }, []);

  const handleGetUser = async () => {
    // return await service.me().catch(e => {
    //   console.log(e)
    //   return null
    // })
    return me.user
  }

  const getCountByType = (type: string): number => {
    return actualPost?.reactionsQty?.find((r) => r.type === type)?.count ?? 0;
  };

  const handleReaction = async (type: string) => {
    // const reacted = actualPost.reactionsQty.find(
    //     (r) => r.type === type && r.userId === user?.id
    // );
    // if (reacted) {
    //   await service.deleteReaction(reacted.id);
    // } else {
      await service.createReaction(actualPost.id, type);
    // }
    const newPost = await service.getPostById(post.id)
    setActualPost(newPost);
  };

  const hasReactedByType = async (type: string): Promise<void> => {
    // return actualPost.reactions.some(
    //     (r) => r.type === type && r.userId === user?.id
    // );
      const hasReacted = await service.hasReacted(actualPost.id, type)
      reacted.set(type, hasReacted)
  };

  const handleGetUserReactions = async () => {
    const reactions = await service.getUserReactionsByPost(actualPost.id)
    reactions.forEach((r: ReactionTypeDTO) => reacted.set(r.name, true))
  };

  if (!post.author) return null

  return (
      <StyledTweetContainer>
        <StyledContainer
            style={{width: "100%"}}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            maxHeight={"48px"}
        >
          <AuthorData
              id={post.author.id}
              name={post.author.name ?? "Name"}
              username={post.author.username}
              createdAt={post.createdAt}
              profilePicture={post.author.profilePicture}
          />
          {post.authorId === user?.id && (
              <>
                <DeletePostModal
                    show={showDeleteModal}
                    id={post.id}
                    onClose={() => {
                      setShowDeleteModal(false);
                    }}
                />
                <ThreeDots
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal);
                    }}
                />
              </>
          )}
        </StyledContainer>
        <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
          <p>{post.content}</p>
        </StyledContainer>
        {post.images && post.images!.length > 0 && (
            <StyledContainer padding={"0 0 0 10%"}>
              <ImageContainer images={post.images}/>
            </StyledContainer>
        )}
        <StyledReactionsContainer>
          <Reaction
              img={IconType.CHAT}
              count={actualPost?.comments?.length}
              reactionFunction={() =>
                  window.innerWidth > 600
                      ? setShowCommentModal(true)
                      : navigate(`/compose/comment/${post.id}`)
              }
              increment={0}
              reacted={false}
          />
          <Reaction
              img={IconType.RETWEET}
              count={getCountByType(ReactionType.RETWEET)}
              reactionFunction={() => handleReaction(ReactionType.RETWEET)}
              increment={1}
              reacted={!!reacted.get(ReactionType.RETWEET)}
          />
          <Reaction
              img={IconType.LIKE}
              count={getCountByType(ReactionType.LIKE)}
              reactionFunction={() => handleReaction(ReactionType.LIKE)}
              increment={1}
              reacted={!!reacted.get(ReactionType.LIKE)}
          />
        </StyledReactionsContainer>
        <CommentModal
            show={showCommentModal}
            post={post}
            onClose={() => setShowCommentModal(false)}
        />
      </StyledTweetContainer>
  );
};

export default Tweet;
