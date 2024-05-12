import styles from './Hero.module.scss'
import heroImg from '@/assets/food.jpg'

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__imgWrap}>
        <img className={styles.hero__img} src={heroImg} alt="Hero" />
      </div>
      <p className={styles.hero__text}>
        В нашей жизни, когда время становится все более ценным ресурсом, задача
        планирования приема пищи становится все более сложной.
        <br />
        <br />
        Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или
        ужин? Каким образом мы можем легко и быстро определиться с выбором блюда
        и не тратить много времени на принятие этого решения?
        <br />
        <br />
        Наш сервис поможет: выбирайте параметры - и вперед!
      </p>
    </div>
  )
}
