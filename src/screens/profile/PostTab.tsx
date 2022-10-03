import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Post} from 'src/models/post';
import {Stack, VStack} from '@react-native-material/core';
import PostComponents from '../../components/Post';

interface PostTabProps {
  posts?: Post[];
}

function PostTab(props: PostTabProps) {
  const {posts} = props;

  return (
    <VStack
      style={{
        minHeight: '100%',
      }}>
      {posts?.map((post) => (
        <PostComponents key={post.id} post={post} />
      ))}
    </VStack>
  );
}

export default PostTab;
