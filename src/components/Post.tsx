import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Post} from 'src/models/post';
import {Avatar, Stack} from '@react-native-material/core';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';

interface PostProps {
  post: Post;
}

function PostComponents(props: PostProps) {
  const user = useSelector((state: RootState) => state.user);
  const [createdAt, setCreatedAt] = useState<string>('');
  const {post} = props;

  useEffect(() => {
    const actualDate = new Date();
    const postDate = new Date(post.createdAt);
    const actualHour = actualDate.getHours();
    const actualMinute = actualDate.getMinutes();
    const actualDay = actualDate.getDate();
    const actualMonth = actualDate.getMonth() + 1;
    const postHour = postDate.getHours();
    const postMinute = postDate.getMinutes();
    const postDay = postDate.getDate();
    const postMonth = postDate.getMonth() + 1;
    const diffHour = actualHour - postHour;
    const diffMinute = actualMinute - postMinute;
    const diffDay = actualDay - postDay;
    const diffMonth = actualMonth - postMonth;
    if (diffHour > 0) {
      setCreatedAt(`${diffHour}h`);
    } else if (diffMinute > 0) {
      setCreatedAt(`${diffMinute}m`);
    } else if (diffDay > 0) {
      setCreatedAt(`${diffDay}d`);
    } else if (diffMonth > 0) {
      setCreatedAt(`${diffMonth}m`);
    } else {
      setCreatedAt('maintenant');
    }
  }, [post]);

  return (
    <Stack style={styles.postContainer}>
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
    </Stack>
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
