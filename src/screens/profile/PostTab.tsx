import {Stack} from '@react-native-material/core';
import {ScrollView, View} from 'react-native';
import {Post} from 'src/models/post';
import PostComponents from '../../components/Post';

interface PostTabProps {
  posts?: Post[];
}

function PostTab(props: PostTabProps) {
  const {posts} = props;

  return (
    <>
      {posts?.map((post) => (
        <PostComponents key={post.id} post={post} />
      ))}
    </>
  );
}

export default PostTab;
