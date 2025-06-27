import ColorPicker from "./colorPicker/colorPicker.jsx"
import styles from './uiTools.module.scss'

const UITools = () => {
  return (
    <div className={`${styles.main_grid_container}`}>
      <ColorPicker/>
      <div>2</div>
      <div>3</div>
    </div>
  )
}

export default UITools