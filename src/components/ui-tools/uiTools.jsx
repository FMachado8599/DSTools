import { ColorsProvider } from "@/context/ColorsContext.jsx";
import ColorsContainer from "./colors-component/ColorsContainer.jsx";
import ShadesGrid from "./shades-component/ShadesGrid.jsx";
import styles from "./uiTools.module.scss";

const UITools = () => {
  return (
    <ColorsProvider>
      <div className={`${styles.main_grid_container}`}>
        <ColorsContainer />
        <ShadesGrid />
      </div>
    </ColorsProvider>
  );
};

export default UITools;
