import Post from '@/components/Post'

export default async function PostPage({ params }: { params: { id: number } }) {
  return <Post id={params.id} />
}
