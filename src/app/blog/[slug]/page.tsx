import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
      <p>This blog feature is coming soon!</p>
    </div>
  );
}
