import {Stack} from '@react-native-material/core';
import {Post} from 'src/models/post';
import PostComponents from '../../components/Post';

interface PostTabProps {
  posts?: Post[];
}

function PostTab(props: PostTabProps) {
  const {posts} = props;

  return (
    <Stack
      style={{
        flex: 1,
        flexGrow: 1,
      }}>
      {posts?.map((post) => (
        <PostComponents key={post.id} post={post} />
      ))}
    </Stack>
  );
}

export default PostTab;
