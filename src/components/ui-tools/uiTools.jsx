import { ColorsProvider } from "@/context/ColorsContext.jsx";
import styles from "./uiTools.module.scss";
import AddComponentModal from "../add-component/AddComponentModal";

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
    hasLoadedLayout
  } = useLayoutManager();

  console.log("Desde UITools:", { hasLoadedLayout, layouts, renderedComponents });

  if (!hasLoadedLayout) return <div>Cargando layout...</div>;

  const safeLayouts = generateSafeLayouts(layouts, renderedComponents);

console.log("hasLoadedLayout:", hasLoadedLayout);
console.log("layouts:", layouts);

  return (
    <ColorsProvider>
      <div>
        <h1>Tools</h1>
        <button onClick={openAddModal}>
          Agregar componente
        </button>
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
        useCSSTransforms={false} // opcional: mejora estabilidad
      >
        {renderedComponents.map((key, index) => {
          const Component = componentMetadata[key]?.component;
          if (!Component) return null;

          return (
            <div
              key={key}
              style={{ position: "relative" }}
            >
              {editMode && (
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    zIndex: 10,
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    zIndex: 1000,
                  }}
                  aria-label={`Eliminar ${key}`}
                  title={`Eliminar ${key}`}
                >
                  ×
                </button>
              )}
              <Component />
            </div>
          );
        })}
      </ResponsiveGridLayout>
      <AddComponentModal
        isOpen={openAddModal}
        onClose={closeAddModal}
        onAdd={addComponentAndCloseModal}
      />
    </ColorsProvider>
  );
};

export default UITools;

