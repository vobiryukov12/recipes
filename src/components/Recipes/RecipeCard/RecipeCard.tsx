import { Link } from 'react-router-dom'

import { Stars } from '@/components'
import { IRecipe } from '@/models'

import styles from './RecipesCard.module.scss'
import clockIcon from '@/assets/icons/clock.svg'

export function RecipeCard(props: IRecipe) {
  const {
    id,
    name,
    cookTimeMinutes,
    difficulty,
    cuisine,
    image,
    mealType,
    ingredients,
  } = props
  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeCard__left}>
        <h3 className={styles.recipeCard__title}>{name}</h3>
        <div className={styles.recipeCard__imgWrap}>
          <img className={styles.recipeCard__img} src={image} alt={name} />
        </div>
      </div>
      <div className={styles.recipeCard__right}>
        <p className={styles.recipeCard__description}>
          {ingredients.join(', ')}
        </p>
        <div className={styles.recipeCard__info}>
          <div className={styles.recipeCard__time}>
            <img src={clockIcon} alt="Clock Icon" />
            <span>{cookTimeMinutes} минут</span>
          </div>
          <div className={styles.recipeCard__complexity}>
            <span>Сложность:</span>
            <Stars difficulty={difficulty} />
          </div>
          <div>{cuisine}</div>
          <div>{mealType.join(', ')}</div>
        </div>
      </div>
      <Link to={`/recipe/${id}`} className={styles.recipeCard__link} />
    </div>
  )
}
