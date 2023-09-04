import PostView from '@/components/PostView/post'

export default function Post({ params }: { params: { id: number } }) {
  return <PostView id={params.id}></PostView>
}
