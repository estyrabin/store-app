import styles from "./Card.module.css";

type CardProps = {
  title: string;
  description: string;
  price: number | string;
  image: string;
  type: string;
  category?: string;
};

export default function Card({ title, description, price, image, type, category }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.price}>{typeof price === 'number' ? price + ' ₪' : price}</span>
        </div>
        
        <div className={styles.tags}>
            <span className={styles.tag}>{type}</span>
            <span className={styles.tag}>{category}</span>
          </div>
        
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}



