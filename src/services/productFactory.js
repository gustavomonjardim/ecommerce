const productFactory = product => ({
  id: product.id,
  image: product.frontmatter.image,
  price: product.frontmatter.price,
  description: product.frontmatter.description,
  name: product.frontmatter.name,
  seller: product.frontmatter.seller,
  slug: product.fields.slug,
});

export { productFactory };
