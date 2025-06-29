import ColorsContainer from "./colors-component/ColorsContainer.jsx"
import styles from './uiTools.module.scss'

const UITools = () => {

  return (
    <div className={`${styles.main_grid_container}`}>
      <ColorsContainer />
      <div>2</div>
      <div>3</div>
    </div>
  )
}

export default UITools