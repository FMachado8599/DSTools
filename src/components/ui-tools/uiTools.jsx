import { ColorsProvider } from "@/context/ColorsContext.jsx";
import styles from "./uiTools.module.scss";
import AddComponentModal from "../add-component/AddComponentModal";
import DeleteIcon from "@/assets/component-svg/DeleteIcon";

import { componentMetadata } from "@/config/componentRegistry.js";
import { useLayoutManager } from "@/hooks/useLayoutManager.js";
import { breakpoints, cols, generateSafeLayouts } from "@/utils/layoutUtils";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const UITools = () => {
  const {
    editMode,
    showAddModal,
    renderedComponents,
    layouts,
    handleLayoutChange,
    handleRemove,
    handleToggleEdit,
    openAddModal,
    closeAddModal,
    addComponentAndCloseModal,
    hasLoadedLayout,
  } = useLayoutManager();

  if (!hasLoadedLayout) return <div>Cargando layout...</div>;

  const safeLayouts = generateSafeLayouts(layouts, renderedComponents);

  return (
    <ColorsProvider>
      <div>
        <div>
          <h1>Tools</h1>
          <button onClick={openAddModal}>Agregar componente</button>
          <button onClick={handleToggleEdit}>
            {editMode ? "Salir del modo edición" : "Editar layout"}
          </button>
        </div>
        <ResponsiveGridLayout
          className={`${styles.main_grid_container} layout`}
          layouts={safeLayouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={100}
          width={1200}
          isDraggable={editMode}
          isResizable={editMode}
          useCSSTransforms={false}
        >
          {renderedComponents.map((key, index) => {
            const Component = componentMetadata[key]?.component;
            if (!Component) return null;

            return (
              <div key={key} style={{ position: "relative" }}>
                {editMode && (
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(key);
                    }}
                    aria-label={`Eliminar ${key}`}
                    title={`Eliminar ${key}`}
                    className={`${styles.remove_button}`}
                  >
                    <DeleteIcon className={styles["icon-remove"]} />
                  </button>
                )}
                <Component />
              </div>
            );
          })}
        </ResponsiveGridLayout>
        <AddComponentModal
          isOpen={showAddModal}
          onClose={closeAddModal}
          onAdd={addComponentAndCloseModal}
          renderedComponents={renderedComponents}
        />
      </div>
    </ColorsProvider>
  );
};

export default UITools;
