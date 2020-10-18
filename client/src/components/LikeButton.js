import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = () => {
    if (user) {
      if (liked) {
        return (
          <Button color="teal" onClick={likePost}>
            <Icon name="heart" />
          </Button>
        )
      } else {
        return (
          <Button color="teal" basic onClick={likePost}>
            <Icon name="heart" />
          </Button>
        )
      }
    } else {
      return (
        <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>
      )
    }
  }

  return (
    <Button as="div" labelPosition="right">
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton()}</MyPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;