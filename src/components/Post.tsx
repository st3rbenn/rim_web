import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Post} from 'src/models/post';
import {Avatar, Box, Stack} from '@react-native-material/core';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';

interface PostProps {
  post: Post;
}

function PostComponents(props: PostProps) {
  const user = useSelector((state: RootState) => state.user);
  const [createdAt, setCreatedAt] = useState<string>('');

  useEffect(() => {
    const actualDate = new Date();
    const postDate = new Date(post.createdAt);
    const diff = actualDate.getTime() - postDate.getTime();
    const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const diffMonth = Math.floor(diff / (1000 * 3600 * 24 * 30));
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
    if (diffYears > 0) {
      setCreatedAt(`${diffYears}Y`);
    } else if (diffMonth > 0) {
      setCreatedAt(`${diffMonth}m`);
    } else if (diffDays > 0) {
      setCreatedAt(`${diffDays}d`);
    } else if (diffHours > 0) {
      setCreatedAt(`${diffHours}h`);
    } else if (diffMinutes > 0) {
      setCreatedAt(`${diffMinutes}min`);
    } else if (diffSeconds > 0) {
      setCreatedAt(`${diffSeconds}sec`);
    }
  });
  const {post} = props;

  return (
    <Box style={styles.postContainer}>
      <Stack style={styles.userInfoContainer}>
        <Avatar
          size={40}
          image={{
            uri: user?.avatar ? user?.avatar : 'https://picsum.photos/200',
          }}
        />
        <Stack style={styles.userInfo}>
          <Stack style={styles.usernamePostedAt}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.postedAt}>{createdAt}</Text>
          </Stack>
          <Text style={styles.pseudo}>@{user?.pseudo}</Text>
        </Stack>
      </Stack>
      <Stack style={styles.messageContainer}>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
          }}>
          {post.content}
        </Text>
      </Stack>
    </Box>
  );
}

export default PostComponents;

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  messageContainer: {
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  pseudo: {
    fontSize: 12,
    color: '#ccc',
  },
  postedAt: {
    fontSize: 12,
    color: '#ccc',
  },
  usernamePostedAt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
