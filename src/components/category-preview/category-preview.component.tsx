import { FC } from 'react';

import ProductCard from '../product-card/product-card.component';

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from './category-preview.styles';

import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

// preview for each of the categories; will live on the shop page
const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => (
  <CategoryPreviewContainer>
    <h2>
      <Title to={title}>{title.toUpperCase()}</Title>
    </h2>
    <Preview>
      {products
        .filter((_, index) => index < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Preview>
  </CategoryPreviewContainer>
);

export default CategoryPreview;
