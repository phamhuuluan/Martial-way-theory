import { serialize } from 'next-mdx-remote/serialize';

export async function serializeMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });
}
