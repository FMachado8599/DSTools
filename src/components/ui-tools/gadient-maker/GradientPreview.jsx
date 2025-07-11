import styles from "./gradient-maker.module.scss";

const GradientPreview = ({ gradient }) => {
  return (
    <div className={styles.preview} style={{ background: gradient }}>
    </div>
  );
};

export default GradientPreview;